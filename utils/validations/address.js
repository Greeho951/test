const { check } = require('express-validator');
const { _response } = require('../../utils/functions/response');

module.exports = {

    validCountry: [
        check('country')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),
    ],

    validDivision1: [
        check('division.*')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('countryId')
            .not()
            .isEmpty()
            .withMessage(_response.ref)
            .isInt()
            .withMessage(_response.intFormat),
    ],

    validDivision2: [

        check('division')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('countryId')
            .not()
            .isEmpty()
            .withMessage(_response.ref)
            .isInt()
            .withMessage(_response.intFormat),
    ],

    validDistrict1: [
        check('district.*')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('divisionId')
            .not()
            .isEmpty()
            .withMessage(_response.ref)
            .isInt()
            .withMessage(_response.intFormat),
    ],

    validDistrict2: [
        check('district')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('divisionId')
            .not()
            .isEmpty()
            .withMessage(_response.ref)
            .isInt()
            .withMessage(_response.intFormat),
    ],

    validThana1: [
        check('thana.*')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('districtId')
            .not()
            .isEmpty()
            .withMessage(_response.ref)
            .isInt()
            .withMessage(_response.intFormat),
    ],

    validThana2: [
        check('thana')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('districtId')
            .not()
            .isEmpty()
            .withMessage(_response.ref)
            .isInt()
            .withMessage(_response.intFormat),
    ],


    validArea1: [
        check('area.*')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('thanaId')
            .not()
            .isEmpty()
            .withMessage(_response.ref)
            .isInt()
            .withMessage(_response.intFormat),
    ],

    validArea2: [
        check('area')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('thanaId')
            .not()
            .isEmpty()
            .withMessage(_response.ref)
            .isInt()
            .withMessage(_response.intFormat),
    ],

    validVillage: [

        check('areaId')
            .not()
            .isEmpty()
            .withMessage('Area refference required')
            .isInt()
            .withMessage('Must be integer format'),
    ],

    validVillage1: [
        check('block.*')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isLength({ min: 1 })
            .withMessage(_response.minLength),

        check('section.*')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isLength({ min: 1 })
            .withMessage(_response.minLength),

        check('sector.*')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isLength({ min: 1 })
            .withMessage(_response.minLength),

        check('thanaId')
            .not()
            .isEmpty()
            .withMessage(_response.ref)
            .isInt()
            .withMessage(_response.intFormat),
    ],

    validVillage2: [
        check('area')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 1 })
            .withMessage(_response.minLength),

        check('thanaId')
            .not()
            .isEmpty()
            .withMessage(_response.ref)
            .isInt()
            .withMessage(_response.intFormat),
    ],

    validAddress: [
        check('country')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('division')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('district')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('thana')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('area')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .trim()
            .isLength({ min: 3 })
            .withMessage(_response.length),

        check('propertyId')
            .not()
            .isEmpty()
            .withMessage(_response.ref)
            .isInt()
            .withMessage(_response.intFormat),
    ],

}