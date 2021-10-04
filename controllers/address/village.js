const { Op } = require("sequelize");
const Area = require('../../models').Area;
const Village = require('../../models').Village;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');


exports.createVillage = async (req, res) => {
    let { block, section, sector, areaId } = req.body;
    let message, withErrors, createVillage, villages, alreadyCreated = [];

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const value = (error) => error.value;
        if (!errors.isEmpty()) { message = errors.formatWith(value).mapped() };
        message ? withErrors = Object.values(message) : withErrors = null;

        /* ARRAY_FILTER */
        if (withErrors) {
            block = block.filter(function (elements) {
                return !withErrors.includes(elements);
            });
            section = section.filter(function (elements) {
                return !withErrors.includes(elements);
            });
            sector = sector.filter(function (elements) {
                return !withErrors.includes(elements);
            });
        };

        const blockLength = block.length;
        const sectionLength = section.length;
        const sectorLength = sector.length;
        const maxOfNums = Math.max(blockLength, sectionLength, sectorLength);

        for (i = 0; i < maxOfNums; i++) {

            // let query;
            // if (block[i] && section[i] && sector[i]) {
            //     query = {
            //         where: {
            //             [Op.and]: [
            //                 { areaId: areaId },
            //                 {
            //                     [Op.or]: [
            //                         { block: block[i] },
            //                         { section: section[i] },
            //                         { sector: sector[i] },
            //                     ]
            //                 }
            //             ]
            //         }
            //     };
            // } else if (block[i] && section[i] && !sector[i]) {
            //     query = {
            //         where: {
            //             [Op.and]: [
            //                 { areaId: areaId },
            //                 {
            //                     [Op.or]: [
            //                         { block: block[i] },
            //                         { section: section[i] }
            //                     ]
            //                 }
            //             ]
            //         }
            //     };
            // } else if (section[i] && sector[i] && !block[i]) {
            //     query = {
            //         where: {
            //             [Op.and]: [
            //                 { areaId: areaId },
            //                 {
            //                     [Op.or]: [
            //                         { section: section[i] },
            //                         { sector: sector[i] },
            //                     ]
            //                 }
            //             ]
            //         }
            //     };
            // } else if (block[i] && !section[i] && !sector[i]) {
            //     query = {
            //         where: {
            //             [Op.and]: [
            //                 { areaId: areaId },
            //                 { block: block[i] },
            //             ]
            //         }
            //     };
            // }else if (!block[i] && section[i] && !sector[i]) {
            //     query = {
            //         where: {
            //             [Op.and]: [
            //                 { areaId: areaId },
            //                 { section: section[i] },
            //             ]
            //         }
            //     };
            // }else if (!block[i] && !section[i] && sector[i]) {
            //     query = {
            //         where: {
            //             [Op.and]: [
            //                 { areaId: areaId },
            //                 { sector: sector[i] },
            //             ]
            //         }
            //     };
            // }
            /* EXISTING_BLOCK*/
            // const existingVillage = await Village.findOne(query);
            // console.log(!existingVillage);

            /* CREATE */
            createVillage = await Village.create({ block: block[i], section: section[i], sector: sector[i], areaId });
            // if (!existingVillage) {
            //     createVillage = await Village.create({ block: block[i], section: section[i], sector: sector[i], areaId });
            // };
            // else if (existingVillage) {
            //     if (block[i]) {
            //         alreadyCreated.push(block[i]);
            //     } else if (section[i]) {
            //         alreadyCreated.push(section[i]);
            //     } else if (sector[i]) {
            //         alreadyCreated.push(sector[i]);
            //     }
            // };
        };

        /* RESPONCE */
        if (createVillage) {
            return res.status(200).json({ message: _response.success });
        } else {
            return res.status(406).json({ message: _response.duplicateValue });
        };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.update = async (req, res) => {
    let { block, section, sector, areaId } = req.body;
    block ? block : block = null;
    section ? section :section = null;
    sector ? sector :sector = null;
    console.log(block , section, sector);
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* UPDATE */
        const updateArea = await Village.update({ block, section, sector, areaId }, condition);
        if (updateArea[0] === 0) { return res.status(424).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const removeArea = await Village.destroy(condition);
        if (removeArea === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (removeArea === 0) {
            return res.status(404).json({ message: _response.emptyList });
        };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.getVillages = async (req, res) => {
    const area = req.query.area;
    let where = [];
    area ? where.push({ area: { [Op.like]: '%' + area + '%' } }) : !area;
    const query = { include: [{ model: Area, where: where, attributes: [] }] };

    try {
        /* FIND_&_RESPONCE */
        const village = await Village.findAll(query);
        if (village.length === 0) { return res.status(404).json({ message: _response.emptyList }) };
        return res.status(200).json({ village });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.createBlock2 = async (req, res) => {
    const { block, areaId } = req.body;

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        let blocks = [];
        let createBlock;
        for (i = 0; i < block.length; i++) {

            const query = {
                where: {
                    [Op.and]: [
                        { block: block[i] },
                        { areaId: areaId }
                    ]
                }
            };

            /* EXISTING_AREA*/
            const existingBlock = await Village.findOne(query);

            /* CREATE */
            if (!existingBlock) {
                createBlock = await Village.create({ block: block[i], areaId });
                blocks.push(createBlock);
            };
        }
        if (blocks.length > 0) {
            return res.status(200).json({ blocks: blocks });
        } else { return res.status(406).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

exports.createSection = async (req, res) => {
    const { section, areaId } = req.body;

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        let sections = [];
        let createSection;
        for (i = 0; i < section.length; i++) {

            const query = {
                where: {
                    [Op.and]: [
                        { section: section[i] },
                        { areaId: areaId }
                    ]
                }
            };

            /* EXISTING_AREA*/
            const existingSection = await Village.findOne(query);

            /* CREATE */
            if (!existingSection) {
                createSection = await Village.create({ section: section[i], areaId });
                sections.push(createSection);
            };
        }
        if (sections.length > 0) {
            return res.status(200).json({ sections: sections });
        } else { return res.status(406).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

exports.createSector = async (req, res) => {
    const { sector, areaId } = req.body;

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        let sectors = [];
        let createSector;
        for (i = 0; i < sector.length; i++) {

            const query = {
                where: {
                    [Op.and]: [
                        { sector: sector[i] },
                        { areaId: areaId }
                    ]
                }
            };

            /* EXISTING_AREA*/
            const existingSector = await Village.findOne(query);

            /* CREATE */
            if (!existingSector) {
                createSector = await Village.create({ sector: sector[i], areaId });
                sectors.push(createSector);
            };
        }
        if (sectors.length > 0) {
            return res.status(200).json({ sectors: sectors });
        } else { return res.status(406).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

