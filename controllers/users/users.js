const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const User = require('../../models').User;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');
const { userData } = require('../../utils/functions/dataFormat');
const imageUrlProcess = require('../../utils/functions/imageUrl');
const { phnCustomize, getPagination, getPagingData, otpSending } = require('../../utils/functions/functions');
const random = require('../../utils/functions/otpGenerator');


exports.signUp = async (req, res) => {
    let { phnNo, password } = req.body;
    const otp = random.generateOTP();

    try {
        /* CUSTOMIZE_PHONE_NO */
        phnNo = phnCustomize(phnNo);
        if (phnNo === null) { return res.status(422).json({ message: { phnNo: _response.invalid } }) };

        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_USER */
        const existingUser = await User.findOne({ where: { phnNo: phnNo } });
        console.log(existingUser);

        /* CREATE */
        if (!existingUser) {

            otpSending(phnNo, otp);
            const user = await User.create({ phnNo, password: bcrypt.hashSync(password, 10), otp: otp });
            if (!user) { return res.status(424).json({ message: _response.failed }) };

            return res.status(200).json({
                message: _response.createAndVerify,
                phnNo: user.phnNo
            });

        } else if (existingUser.verified === false) {
            otpSending(phnNo, otp);
            return res.status(200).json({
                message: _response.createAndVerify,
                phnNo: existingUser.phnNo
            });
        } else { return res.status(406).json({ message: _response.alreadyRegistered }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.otpVerify = async (req, res) => {
    let { phnNo, otp } = req.body;
    let message;

    try {
        /* CUSTOMIZE_PHONE_NO */
        phnNo = phnCustomize(phnNo);
        if (phnNo === null) { return res.status(422).json({ message: { phnNo: _response.invalid } }) };

        const condition1 = {
            where: { phnNo: phnNo },
            attributes: { exclude: ['password'] },
        };
        /* OTP_VERIFIED */
        // const existingUser = await User.findOne(condition1);
        // if (!existingUser) {
        //     message = _response.unAuthorized;
        // } else if (existingUser.otp === null && existingUser.verified === true) {
        //     message = _response.alreadyVerified;
        // } else if (existingUser.otp !== null && existingUser.verified === false && existingUser.otp === otp) {
        //     const update = await existingUser.update({ otp: null, verified: true });
        //     if (!update) { return res.status(424).json({ message: _response.failed }) }
        //     return res.status(200).json({ message: _response.otpVerified });
        // } else if (existingUser.otp !== otp) {
        //     message = _response.wrongOTP;
        // }

        const existingUser = await User.findOne(condition1);
        if (!existingUser) {
            message = _response.unAuthorized;
        } else if (existingUser.otp === null && existingUser.verified === true) {
            message = _response.alreadyVerified;
        } else if (existingUser.otp !== null && existingUser.verified === false && existingUser.otp === otp) {
            await existingUser.update({ otp: null, verified: true });
            message = _response.otpVerified;
        } else if (existingUser.otp !== otp) {
            message = _response.wrongOTP;
        }

        return res.status(200).json({ message });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.otpReSend = async (req, res) => {
    let { phnNo } = req.body;
    const otp = random.generateOTP();

    try {
        /* CUSTOMIZE_PHONE_NO */
        phnNo = phnCustomize(phnNo);
        if (phnNo === null) { return res.status(422).json({ message: { phnNo: _response.invalid } }) };

        const condition = {
            where: { phnNo: phnNo },
            attributes: { exclude: ['password'] },
        };

        /* OTP_RESEND */
        const existingUser = await User.findOne(condition);

        otpSending(phnNo, otp);
        const otpResend = await existingUser.update({ otp: otp });
        if (!otpResend) { return res.status(424).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.createAndVerify });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.signIn = async (req, res) => {
    let { phnNo, password } = req.body;

    try {
        /* CUSTOMIZE_PHONE_NO */
        phnNo = phnCustomize(phnNo);
        if (phnNo === null) { return res.status(400).json({ message: _response.invalid }) };

        /* EXISTING_USER */
        const existingUser = await User.findOne({ where: { phnNo: phnNo } });
        if (!existingUser) { return res.status(401).json({ message: _response.unAuthorized }) };

        /* LOGN_WITH_JWT */
        if (existingUser.verified === true) {

            const userInfo = userData(existingUser);
            if (bcrypt.compareSync(password, existingUser.password)) {
                const token = jwt.sign(userInfo, process.env.SECRET_KEY);
                return res.status(200).json({
                    message: _response.loginSucess,
                    token: "Bearer " + token,
                });
            } else { return res.status(406).json({ message: _response.passWrong }) };

        } else { return res.status(401).json({ message: _response.createAndVerify }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.passChnage = async (req, res) => {
    let { phnNo, oldPassword, newPassword } = req.body;

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* CUSTOMIZE_PHONE_NO */
        phnNo = phnCustomize(phnNo);
        if (phnNo === null) { return res.status(400).json({ message: _response.invalid }) };

        /* OLD_&_NEW_PASSWORD_CHECK*/
        if (oldPassword === newPassword) {
            return res.status(406).json({ message: _response.samePass });
        };

        /* EXISTING_USER */
        const existingUser = await User.findOne({ where: { phnNo: phnNo } });
        if (!existingUser) { return res.status(401).json({ message: _response.unAuthorized }) };

        /* PASS_MATCHING_&_CHANGE */
        if (bcrypt.compareSync(oldPassword, existingUser.password)) {
            const user = await User.update(
                { password: bcrypt.hashSync(newPassword, 10) },
                { where: { id: existingUser.id } },
            );
            if (!user) { return res.status(424).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.update });
        } else { return res.status(406).json({ message: _response.passWrong }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.profileImage = async (req, res) => {
    const id = req.user.id;
    let { profile } = req.body;
    const imagePath = 'upload/images' + '/' + req.file.filename;
    const imageUrl = imageUrlProcess.imageUrl(req, imagePath);
    const condition = { where: { id: id } };

    try {
        /* EXISTING_USER */
        const existingUser = await User.findOne(condition);

        /* UPDATE */
        if (existingUser) {
            const profileUrl = await existingUser.update({ profileImage: imagePath });
            if (!profileUrl) { return res.status(424).json({ message: _response.failed }) };
            return res.status(200).json({ imageUrl })
        } else { return res.status(404).json({ message: _response.userEmpty }) }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };

};

exports.userList = async (req, res) => {

    let { page, size } = req.query;
    if (page === undefined) { page = 1 };
    const { limit, offset } = getPagination(page, size);
    const condition = {
        limit: limit,
        offset: offset,
        attributes: { exclude: ['password'] },
    };

    try {
        /* FIND_&_PAGINATION */
        const data = await User.findAndCountAll(condition);
        const user_list = getPagingData(data, page, limit);

        /* LIST */
        if (user_list.records.length !== 0) {
            return res.status(200).json({ user_list });
        } else { return res.status(404).json({ message: _response.userEmpty }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };

};

exports.activeUserList = async (req, res) => {

    let { page, size } = req.query;
    if (page === undefined) { page = 1 };
    const { limit, offset } = getPagination(page, size);
    const condition = {
        limit: limit,
        offset: offset,
        where: {
            [Op.and]: [
                { verified: true },
                { status: true },
            ],
        },
        attributes: { exclude: ['password'] },
    };

    try {
        /* FIND_&_PAGINATION */
        const data = await User.findAndCountAll(condition);
        const userList = getPagingData(data, page, limit);

        /* LIST */
        if (userList.records.length !== 0) {
            return res.status(200).json({ userList });
        } else { return res.status(404).json({ message: _response.userEmpty }); }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    }

};

exports.blockedUserList = async (req, res) => {

    let { page, size } = req.query;
    if (page === undefined) { page = 1 };
    const { limit, offset } = getPagination(page, size);
    const condition = {
        limit: limit,
        offset: offset,
        where: {
            [Op.and]: [
                { verified: true },
                { status: false },
            ],
        },
        attributes: { exclude: ['password'] },
    };

    try {
        /* FIND_&_PAGINATION */
        const data = await User.findAndCountAll(condition);
        const userList = getPagingData(data, page, limit);

        /* LIST */
        if (userList.records.length !== 0) {
            return res.status(200).json({ userList });
        } else { return res.status(404).json({ message: _response.userEmpty }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };

};

exports.unVerifiedUserList = async (req, res) => {

    let { page, size } = req.query;
    if (page === undefined) { page = 1 };
    const { limit, offset } = getPagination(page, size);
    const condition = {
        limit: limit,
        offset: offset,
        where: { verified: false },
        attributes: { exclude: ['password'] },
    };

    try {
        /* FIND_&_PAGINATION */
        const data = await User.findAndCountAll(condition);
        const userList = getPagingData(data, page, limit);

        /* LIST */
        if (userList.records.length !== 0) {
            return res.status(200).json({ userList });
        } else { return res.status(404).json({ message: _response.userEmpty }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };

};

exports.userDetails = async (req, res) => {

    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* EXISTING_USER */
        const user = await User.findOne(condition);

        if (user) {
            return res.status(200).json({ user });
        } else { return res.status(404).json({ message: _response.userEmpty }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.statusChnage = async (req, res) => {

    const { status } = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_USER */
        const user = await User.findOne(condition);
        if (!user) { return res.status(404).json({ message: _response.notFound }) };

        /* UPDATE */
        if (!user.status === status) {
            const updateUser = await user.update({ status });
            if (!updateUser) { return res.status(424).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.update });
        } else { return res.status(400).json({ message: _response.statusUpdated }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};