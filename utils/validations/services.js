const { check } = require('express-validator')

module.exports = {

    validService: [

        check('categoryId')
            .not()
            .isEmpty()
            .withMessage('categoryId required')
            .trim()
            .isInt()
            .withMessage('Category Must be refference ID'),

        check('subCategoryId')
            .not()
            .isEmpty()
            .withMessage('Sub-categoryId required')
            .trim()
            .isInt()
            .withMessage('subCategory Must be refference ID'),



        check('headline')
            .not()
            .isEmpty()
            .withMessage('Service headline required')
            .trim()
            .isString()
            .withMessage('Service headline Must be string')
            .isLength({ min: 3 })
            .withMessage('Service headline minimum 3 characters'),

        check('overview')
            .not()
            .isEmpty()
            .withMessage('Service title name required')
            .trim()
            .isString()
            .withMessage('Service title name Must be string')
            .isLength({ min: 9 })
            .withMessage('Service title name minimum 9 characters'),

        check('safetyEnsured')
            .not()
            .isEmpty()
            .withMessage('Safety ensured required')
            .isArray()
            .withMessage('Safety ensured Must be Array types'),

        check('expectation')
            .not()
            .isEmpty()
            .withMessage('Expectation ensured required')
            .isArray()
            .withMessage('Expectation Must be Array types'),

        check('notExpectation')
            .not()
            .isEmpty()
            .withMessage('Not expectation ensured required')
            .isArray()
            .withMessage('Not expectation Must be Array types'),

        check('quantity')
            .not()
            .isEmpty()
            .withMessage('Service quantity required')
            .trim()
            .isInt()
            .withMessage('Service quantity Must be integer'),

        check('price')
            .not()
            .isEmpty()
            .withMessage('Service price required')
            .trim()
            .isInt()
            .withMessage('Service price name Must be integer')
            .isLength({ min: 2 })
            .withMessage('Service title name minimum 2 characters'),

        check('availability')
            .not()
            .isEmpty()
            .withMessage('Service availability required')
            .trim()
            .isString()
            .withMessage('Service availability Must be string')
            .isLength({ min: 3 })
            .withMessage('Service availability minimum 3 characters'),
    ],

    validSubCategory: [

        check('title')
            .not()
            .isEmpty()
            .withMessage('Title required')
            .trim()
            .isString()
            .withMessage('Title Must be string')
            .isLength({ min: 6 })
            .withMessage('Title minimum 6 characters'),
    ],

    validStatus: [
        check('status')
            .not()
            .isEmpty()
            .withMessage('Status required')
            .isBoolean()
            .withMessage('Title Must be true or false'),
    ],

    validCategory: [
        check('categoryName')
            .not()
            .isEmpty()
            .withMessage('Category name required')
            .trim()
            .isString()
            .withMessage('Category Must be string')
            .isLength({ min: 6 })
            .withMessage('Category minimum 6 characters'),
    ],

    validCart: [

        check('userId')
        .not()
        .isEmpty()
        .withMessage('userId required'),
        
        check('serviceId')
            .not()
            .isEmpty()
            .withMessage('serviceId required')
            .trim()
            .isInt()
            .withMessage('serviceId Must be refference ID'),

        check('category')
            .not()
            .isEmpty()
            .withMessage('Category required')
            .trim()
            .isString()
            .withMessage('Category Must be string')
            .isLength({ min: 3 })
            .withMessage('Category minimum 3 characters'),

        check('headline')
            .not()
            .isEmpty()
            .withMessage('Service headline required')
            .trim()
            .isString()
            .withMessage('Service headline Must be string')
            .isLength({ min: 3 })
            .withMessage('Service headline minimum 3 characters'),

        check('overview')
            .not()
            .isEmpty()
            .withMessage('Service title name required')
            .trim()
            .isString()
            .withMessage('Service title name Must be string')
            .isLength({ min: 9 })
            .withMessage('Service title name minimum 9 characters'),

        check('price')
            .not()
            .isEmpty()
            .withMessage('price required'),

        check('subTotal')
            .not()
            .isEmpty()
            .withMessage('subTotal required'),

        check('total')
            .not()
            .isEmpty()
            .withMessage('total required'),

    ],

}