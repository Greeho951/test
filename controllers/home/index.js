module.exports = {
    home: (req, res) => {
        res.render('index')
    },
    subCategory: (req, res) => {
        res.render('subCategory')
    },
    category: (req, res) => {
        res.render('category')
    },
    cart: (req, res) => {
        res.render('cart')
    },
    // lift-ac.ejs
    address: (req, res) => {
        res.render('address')
    },
    unitInfo: (req, res) => {
        res.render('lift-ac')
    },
    property: (req, res) => {
        res.render('property')
    },
};