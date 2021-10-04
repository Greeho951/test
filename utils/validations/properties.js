const { check } = require('express-validator');
const { _response } = require('../../utils/functions/response');

module.exports = {

    validProperty: [
        check('buildingName')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('ownerName')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length)

    ],

    validContacts: [
        check('contactName')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('contactDesignation')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('contactNumber')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 9 })
            .withMessage(_response.maxLength),

    ],

    validLiftAC: [

        check('total')
            .not()
            .isEmpty()
            .withMessage('Required')
            .isInt()
            .withMessage('Must be integer'),

        check('brand')
            .not()
            .isEmpty()
            .withMessage('Brand name required')
            .trim()
            .isString()
            .withMessage('Brand name Must be string')
            .isLength({ min: 3 })
            .withMessage('Brand name minimum 3 characters'),

    ],

    validParking: [

        check('capacity')
            .not()
            .isEmpty()
            .withMessage('Required')
            .isInt()
            .withMessage('Must be integer'),

        check('type')
            .not()
            .isEmpty()
            .withMessage('Parking type required')
            .trim()
            .isString()
            .withMessage('Parking type Must be string')
            .isLength({ min: 3 })
            .withMessage('Brand name minimum 3 characters'),

    ]

}