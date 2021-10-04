const db = require('../../models/index');
const Service = require('../../models/').Service;
const Cart = require('../../models/').Cart;
const Role = require('../../models').Role;
const User = require('../../models').User;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');
const { getPagination, getPagingData } = require('../../utils/functions/functions');


exports.add = async (req, res) => {

    const { serviceId, category, headline, overview, unit, price, subTotal, vat, total } = req.body;
    const condition = { where: { userId: req.user.id } };

    try {
        /* EXISTING_SERVICE */
        const existingCart = await Cart.findOne(condition);

        /* CREATE */
        if (!existingCart && unit > 0) {
            /* BLOCK_1 */
            console.log('BLOCK_1 => NotExisting');
            let carts = {};
            let products = [];
            products.push({ serviceId, category, headline, overview, unit, price, subTotal, vat, total });
            carts.products = products;
            let cart_str_obj = JSON.stringify(carts);
            const cart = await Cart.create({ userId: req.user.id, services: cart_str_obj });
            if (!cart) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ cart });
        }
        else if (existingCart) {

            const cart_object = JSON.parse(existingCart.services);
            let products = cart_object.products;

            // Empty card
            if (products.length === 0 && unit > 0) {
                /* BLOCK_2 */
                console.log('BLOCK_2 => Existing but Empty');
                let carts = {};
                products.push({ serviceId, category, headline, overview, unit, price, subTotal, vat, total });
                carts.products = products;
                let cart_str_obj = JSON.stringify(carts);
                const cart = await existingCart.update({ services: cart_str_obj });
                if (!cart) { return res.status(200).json({ message: _response.failed }) };
                return res.status(200).json({ cart });
            }

            for (i = 0; i < products.length; i++) {

                if (products[i].serviceId === serviceId && unit < 1) {
                    console.log('BLOCK_3 ExistingServiceId but InputUnit===0');
                    products.splice(i, 1);
                    let cart_string = JSON.stringify(cart_object);
                    const ok = await existingCart.update({ services: cart_string });
                    return res.status(200).json({ message: ok });
                } else if (products[i].serviceId === serviceId && unit > 0) {
                    console.log('BLOCK_4 ExistingServiceId but InputUnit > 0');
                    let carts = {};
                    products.splice(i, 1);
                    products.push({ serviceId, category, headline, overview, unit, price, subTotal, vat, total });
                    carts.products = products;
                    let cart_str_obj = JSON.stringify(carts);
                    const cart = await existingCart.update({ services: cart_str_obj });
                    if (!cart) { return res.status(200).json({ message: _response.failed }) };
                    return res.status(200).json({ cart });
                }else if (products[i].serviceId !== serviceId && unit > 0) {
                    // fruits.includes("Banana")
                    // fruits.indexOf("Mango") !== -1
                    console.log( '72',products[i].serviceId,serviceId);
                    console.log('73',products.includes(serviceId));
                    console.log('BLOCK_5 NewServiceId And InputUnit > 0');
                    console.log(products[i].serviceId);
                    console.log(serviceId);

                    let carts = {};
                    products.push({ serviceId, category, headline, overview, unit, price, subTotal, vat, total });
                    carts.products = products;
                    let cart_str_obj = JSON.stringify(carts);
                    const cart = await existingCart.update({ services: cart_str_obj });
                    const list = JSON.parse(cart.services)
                    if (!cart) { return res.status(200).json({ message: _response.failed }) };
                    return res.status(200).json({ list });

                    //here

                    // carts.products = products;
                    // let cart_str_obj = JSON.stringify(carts);
                    // console.log(cart_str_obj);
                    // carts.products = products;
                    // let cart_str_obj = JSON.stringify(carts)
                    // const cart = await existingCart.update({ services: cart_str_obj });
                    // if (!cart) { return res.status(200).json({ message: _response.failed }) };
                    // return res.status(200).json({ cart });
                }
            }
        }
        else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

exports.getDetails = async (req, res) => {
    const id = 1;
    const condition = { where: { id: 1 } };

    try {
        const cart = await Cart.findOne(condition);
        const carts = JSON.parse(cart.services)

        if (carts) {
            return res.status(200).json({ carts });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) };
};


// if (services[i].serviceId === serviceId) {
//     console.log('BLOCK_3 => Existing:services[i].serviceId === serviceId ');
// } else if (services[i].serviceId !== serviceId) {
//     console.log('BLOCK_4 => Existing:services[i].serviceId !== serviceId ');
//     services.push({ serviceId, category, headline, overview, unit, price, subTotal, vat, total });
//     carts.services = services;
//     let cartInString = JSON.stringify(carts);
//     const servieUpdate = await existingCart.update({ services: cartInString });
//     const cart = JSON.parse(servieUpdate.services);
//     if (!cart) { return res.status(200).json({ message: _response.failed }) };
//     return res.status(200).json({ cart });
// }




// else {
//     console.log('BLOCK_4 => Existing:services[i].serviceId === serviceId');
//     services.push({ serviceId, category, headline, overview, unit, price, subTotal, vat, total });
//     carts.services = services;
//     let cartInString = JSON.stringify(carts);
//     const servieUpdate = await existingCart.update({ services: cartInString });
//     const cart = JSON.parse(servieUpdate.services);
//     if (!cart) { return res.status(200).json({ message: _response.failed }) };
//     return res.status(200).json({ cart });
// }