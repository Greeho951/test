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

    ValidSignUp: [

        check('password')
            .not()
            .isEmpty()
            .withMessage('Password required')
            .isString()
            .withMessage('Password Must be string')
            .isLength({ min: 6 })
            .withMessage('Password minimum 6 characters'),

        check('phnNo')
            .not()
            .isEmpty()
            .withMessage('Phone number required')
            .isString()
            .withMessage('Phone number Must be string')
            .isLength({ min: 9 })
            .withMessage('Phone number minimum 9 characters'),
    ],

    validPassword: [

        check('oldPassword')
            .not()
            .isEmpty()
            .withMessage('Old password required')
            .isString()
            .withMessage('Old password Must be string')
            .isLength({ min: 6 })
            .withMessage('Old password minimum 6 characters'),

        check('newPassword')
            .not()
            .isEmpty()
            .withMessage('New password required')
            .isString()
            .withMessage('New password Must be string')
            .isLength({ min: 6 })
            .withMessage('New password minimum 6 characters'),

        check('phnNo')
            .not()
            .isEmpty()
            .withMessage('Phone number required')
            .isString()
            .withMessage('Phone number Must be string')
            .isLength({ min: 9 })
            .withMessage('Phone number minimum 9 characters'),
    ]

}