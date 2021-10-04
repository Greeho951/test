const { Op } = require("sequelize");
const Cart = require('../../models/').Cart;
const User = require('../../models/').User;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');
const { getPagination, getPagingData } = require('../../utils/functions/functions');


exports.add = async (req, res) => {

    let carts = {};
    let services = [];
    const { serviceId, category, headline, overview, unit, price, subTotal, vat, total } = req.body;
    const condition = {
        where: {
            [Op.and]: [
                { userId: req.user.id },
                { conform: false },
            ]
        }
    };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_CART */
        const existingCart = await Cart.findOne(condition);
        if (!existingCart) {

            /* CREATE */
            services.push({ serviceId, category, headline, overview, unit, price, subTotal, vat, total });
            carts.services = services;
            let cartInString = JSON.stringify(carts);
            const servieAdd = await Cart.create({ userId: req.user.id, services: cartInString });
            const cart = JSON.parse(servieAdd.services);
            if (!cart) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ cart });

        } else if (existingCart) {

            const cartObject = JSON.parse(existingCart.services);
            let services = cartObject.services;

            if (services.length < 1) {

                /* UPDATE */
                services.push({ serviceId, category, headline, overview, unit, price, subTotal, vat, total });
                carts.services = services;
                let cartInString = JSON.stringify(carts);
                const servieUpdate = await existingCart.update({ services: cartInString });
                const cart = JSON.parse(servieUpdate.services);
                if (!cart) { return res.status(200).json({ message: _response.failed }) };
                return res.status(200).json({ cart });

            } else if (services.length > 0) {

                for (i = 0; i < services.length; i++) {

                    const found = services.some(service => service.serviceId === serviceId);

                    if (services[i].serviceId === serviceId && unit > 0) {

                        /* REMOVE_&_UPDATE */
                        services.splice(i, 1);
                        services.push({ serviceId, category, headline, overview, unit, price, subTotal, vat, total });
                        carts.services = services;
                        let cartInString = JSON.stringify(carts);
                        const servieUpdate = await existingCart.update({ services: cartInString });
                        const cart = JSON.parse(servieUpdate.services);
                        if (!cart) { return res.status(200).json({ message: _response.failed }) };
                        return res.status(200).json({ cart });

                    } else if (services[i].serviceId === serviceId && unit < 1) {

                        /* REMOVE */
                        services.splice(i, 1);
                        carts.services = services;
                        let cartInString = JSON.stringify(carts);
                        const servieUpdate = await existingCart.update({ services: cartInString });
                        const cart = JSON.parse(servieUpdate.services);
                        if (!cart) { return res.status(200).json({ message: _response.failed }) };
                        return res.status(200).json({ cart });
                    }
                    else if (!found) {

                        /* UPDATE */
                        services.push({ serviceId, category, headline, overview, unit, price, subTotal, vat, total });
                        carts.services = services;
                        let cartInString = JSON.stringify(carts);
                        const servieUpdate = await existingCart.update({ services: cartInString });
                        const cart = JSON.parse(servieUpdate.services);
                        if (!cart) { return res.status(200).json({ message: _response.failed }) };
                        return res.status(200).json({ cart });

                    }

                }
            }
        }
    } catch (error) { console.log(error) };
};

exports.getMyCart = async (req, res) => {

    const condition = {
        where: {
            [Op.and]: [
                { userId: req.user.id },
                { conform: false },
            ]
        }
    };

    try {
        /* EXISTING_CART */
        const cart = await Cart.findOne(condition);
        if (!cart) { return res.status(404).json({ message: _response.emptyList }) };
        const carts = JSON.parse(cart.services);

        /* RESPONCE */
        if (carts) {
            return res.status(200).json({ carts });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) };
};

exports.removeMyCart = async (req, res) => {

    const condition = {
        where: {
            [Op.and]: [
                { userId: req.user.id },
                { conform: false },
            ]
        }
    };

    try {
        /* DELETE */
        const cart = await Cart.destroy(condition);

        /* RESPONCE */
        if (cart === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (cart === 0) {
            return res.status(404).json({ message: _response.emptyList });
        } else { return res.status(500).json({ message: _response.error }) };

    } catch (error) { console.log(error) };
};

exports.getCartList = async (req, res) => {

    let { page, size } = req.query;
    if (page === undefined) { page = 1 };
    const { limit, offset } = getPagination(page, size);

    const query = {
        limit: limit,
        offset: offset,
        where: { conform: false },
        include: { model: User },

    };

    try {
        /* EXISTING_CART */
        const data = await Cart.findAndCountAll(query);
        const list = getPagingData(data, page, limit);

        /* LIST */
        if (list.records.length !== 0) {
            return res.status(200).json({ list });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) };
};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const condition = {
        where: { id: id },
        include: { model: User },
    };

    try {
        /* EXISTING_CART */
        const cart = await Cart.findOne(condition);
        console.log(cart);
        if (!cart) { return res.status(404).json({ message: _response.emptyList }) };

        /* RESPONCE */
        if (cart) {
            return res.status(200).json({
                id: cart.id,
                payment: cart.payment,
                conform: cart.conform,
                services: JSON.parse(cart.services),
                user: cart.User
            });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) };
};

exports.conformation = async (req, res) => {
    const { conform } = req.body;
    const id = req.params.id;

    const condition = {
        where: {
            [Op.and]: [
                { id: id },
                { conform: false },
            ]
        }
    };

    try {
        /* EXISTING_CART */
        const cart = await Cart.findOne(condition);

        /* UPDATE */
        if (!cart) {
            return res.status(404).json({ message: _response.conformation });
        } else if (cart.conform === false) {
            const updateCart = await cart.update({ conform });
            return res.status(200).json({ message: _response.update });
        } else if (conform === false) {
            return res.status(200).json({ message: _response.orderCancel });
        };
    } catch (error) { console.log(error) };
};