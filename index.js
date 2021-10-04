// Project Name:Greeho.com
// Developer Name:Md Tajal Islam
// Start Date:23/05/2021
// End Date:-------

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~project setup~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const env = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const app = express()
const cors = require('cors')


//app set
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//app use
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/profile', express.static('upload/images'));


// customize routers
const indexRouter = require('./routes/home/index');
const user = require('./routes/users/users');

/* SERVICE */
const category = require('./routes/services/categories/category');
//service
const service = require('./routes/services/services/service');
const cart = require('./routes/order/cart');
// const offer_types = require('./routes/services/offers/offer_types');
// const offer = require('./routes/services/offers/offer');
const subCategory = require('./routes/services/categories/subCategory');
const address = require('./routes/address/address');
const country = require('./routes/address/country');
const division = require('./routes/address/division');
const district = require('./routes/address/district');
const thana = require('./routes/address/thana');
const area = require('./routes/address/area');
const village = require('./routes/address/village');
const role = require('./routes/roles/roles');
//complain
const complain = require('./routes/complain/complain');
const howToOrder = require('./routes/order/howToOrder');
const about = require('./routes/About/about');
const contact = require('./routes/contact/contact');
//properties
const contactInfo = require('./routes/properties/contactInfo/contactInfo');
const property = require('./routes/properties/property/property');
const badge = require('./routes/properties/badge/badge');
const equipment = require('./routes/properties/unitInfo/equipment');
const liftAC = require('./routes/properties/liftAC/liftac');
const parking = require('./routes/properties/parking/parking');
//unit
const unitInfo = require('./routes/properties/unitInfo/unitInfo');
const furnised = require('./routes/properties/unitInfo/furnished');
const utilities = require('./routes/properties/buildingInfo/utilities');
const securities = require('./routes/properties/buildingInfo/securities');
const registration = require('./routes/properties/buildingInfo/registration');
const facilities = require('./routes/properties/buildingInfo/facilities');
const buildingInfo = require('./routes/properties/buildingInfo/buildinginfo');


// end-point paths
app.use('/', indexRouter);
app.use('/api', user);
// app.use('/service', offer_types);
// app.use('/service', offer);

/* SERVICE */
app.use('/api', category);
app.use('/api', subCategory);
app.use('/api', service);
app.use('/api', cart);
app.use('/api', about);
app.use('/api', contact);

app.use('/api', role);
app.use('/api', country);
app.use('/api', division);
app.use('/api', district);
app.use('/api', thana);
app.use('/api', area);
app.use('/api', address);
app.use('/api', village);

//complain
app.use('/api', complain);
app.use('/api', howToOrder);
//properties
app.use('/api', property);
app.use('/api', badge);
app.use('/api', contactInfo);
/* UNIT_INFO */
app.use('/api', equipment);
app.use('/api', furnised);
app.use('/api', liftAC);
app.use('/api', parking);
app.use('/api', unitInfo);
app.use('/property', utilities);
app.use('/property', securities);
app.use('/property', registration);
app.use('/api', facilities);
app.use('/api', buildingInfo);

// port
app.listen(port, () => { console.log(`App listening at http://localhost:${port}`) });
