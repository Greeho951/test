const { check } = require('express-validator')

module.exports = {

    validation: [

        check('categoryName')
            .not()
            .isEmpty()
            .withMessage('Password required')
            .trim()
            .isString()
            .withMessage('Password Must be string')
            .isLength({ min: 6 })
            .withMessage('Password minimum 6 characters'),
    ]

}