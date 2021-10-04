const { check } = require('express-validator')

module.exports = {

    validStatus: [
        check('status')
            .not()
            .isEmpty()
            .withMessage('Status required')
            .isBoolean()
            .withMessage('Title Must be true or false'),
    ],

    validRole: [
        check('roleName')
            .not()
            .isEmpty()
            .withMessage('Role name required')
            .isString()
            .withMessage('Role name Must be string')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Minimum length 3 characters'),

        check('permission')
            .not()
            .isEmpty()
            .withMessage('Permission required')
            .isArray()
            .withMessage('Permission Must be ARRAY format'),
    ],

    validReview: [
        check('title')
            .not()
            .isEmpty()
            .withMessage('Title required')
            .isString()
            .withMessage('Title Must be string')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Title must be minimum 3 characters'),
    ],

    validRatting: [
        check('ratting')
            .trim()
            .isFloat()
            .withMessage('div name Must be string')
            .isLength({ min: 3 })
            .withMessage('division name minimum 3 characters'),
    ],

    validHowToOrder: [
        check('title')
            .not()
            .isEmpty()
            .withMessage('Title required')
            .isString()
            .withMessage('Title Must be string')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Title must be minimum 3 characters'),

        check('steps')
            .not()
            .isEmpty()
            .withMessage('Steps required')
            .isArray()
            .withMessage('Steps Must be ARRAY format'),
    ],

    validAbout: [

        check('ourJourney')
            .not()
            .isEmpty()
            .withMessage('Journey details required')
            .isString()
            .withMessage('Journey Must be string')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Journey must be minimum 3 characters'),

        check('whyGreeho')
            .not()
            .isEmpty()
            .withMessage('Greeho details required')
            .isString()
            .withMessage('Greeho details Must be string')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Greeho details must be minimum 3 characters'),

        check('ourMission')
            .not()
            .isEmpty()
            .withMessage('Mission required')
            .isString()
            .withMessage('Mission Must be string')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Mission must be minimum 3 characters'),

        check('transparency')
            .not()
            .isEmpty()
            .withMessage('Transparency required')
            .isString()
            .withMessage('Transparency Must be string')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Transparency must be minimum 3 characters'),

        check('quality')
            .not()
            .isEmpty()
            .withMessage('Quality required')
            .isString()
            .withMessage('Quality Must be string')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Quality must be minimum 3 characters'),

        check('accuracy')
            .not()
            .isEmpty()
            .withMessage('Accuracy required')
            .isString()
            .withMessage('Accuracy Must be string')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Accuracy must be minimum 3 characters'),

    ],

    validContact: [

        check('name')
            .not()
            .isEmpty()
            .withMessage('Name required')
            .isString()
            .withMessage('Name Must be string')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Name must be minimum 3 characters'),

        check('email')
            .not()
            .isEmpty()
            .withMessage('Email required')
            .isEmail()
            .withMessage('Must be Email types'),

        // check('phone')
        //     .not()
        //     .isEmpty()
        //     .withMessage('Phone number m required')
        //     .isLength({ min: 9 })
        //     .withMessage('Phone number must be minimum 9 characters'),

        check('message')
            .not()
            .isEmpty()
            .withMessage('Message required')
            .isString()
            .withMessage('Message Must be string')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Message must be minimum 3 characters'),

    ],
}