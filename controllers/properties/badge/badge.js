const { Op } = require("sequelize");
const Badge = require('../../../models').Badge;
const { validationResult } = require('express-validator');
const { _response } = require('../../../utils/functions/response');
const { getPagination, getPagingData } = require('../../../utils/functions/functions');


exports.add = async (req, res) => {
    const {
        bachelorFriendly,
        brandNew,
        expatFriendly,
        femaleHostel,
        petFriendly,
        rentedOut,
        sold,
        premium,
        coLiving,
    } = req.body;

    const condition = {
        where: {
            [Op.and]: [
                { bachelorFriendly: bachelorFriendly ? bachelorFriendly : null },
                { brandNew: brandNew ? brandNew : null },
                { expatFriendly: expatFriendly ? expatFriendly : null },
                { femaleHostel: femaleHostel ? femaleHostel : null },
                { petFriendly: petFriendly ? petFriendly : null },
                { rentedOut: rentedOut ? rentedOut : null },
                { sold: sold ? sold : null },
                { premium: premium ? premium : null },
                { coLiving: coLiving ? coLiving : null },
            ]
        }
    };

    try {
        /* EXISTING_SERVICE_TITLE */
        const existingBadge = await Badge.findOne(condition);
        console.log(existingBadge);


        /* CREATE */
        if (!existingBadge) {
            const createBadge = await Badge.create({
                bachelorFriendly: bachelorFriendly ? bachelorFriendly : null,
                brandNew: brandNew ? brandNew : null,
                expatFriendly: expatFriendly ? expatFriendly : null,
                femaleHostel: femaleHostel ? femaleHostel : null,
                petFriendly: petFriendly ? petFriendly : null,
                rentedOut: rentedOut ? rentedOut : null,
                sold: sold ? sold : null,
                premium: premium ? premium : null,
                coLiving: coLiving ? coLiving : null,
            });

            if (!createBadge) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ badge: createBadge });
        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

