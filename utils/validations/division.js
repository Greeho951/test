const { check } = require('express-validator')

module.exports = {

    validation: [
        check('division')
        .not()
        .isEmpty()
        .withMessage('division name required')
        .trim()
        .isString()
        .withMessage('division name Must be string')
        .isLength({ min: 3 })
        .withMessage('division name minimum 3 characters'),
    ]

}