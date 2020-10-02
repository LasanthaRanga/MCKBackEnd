var express = require('express');
var router = express.Router();
const shopRent = require('../controller/shop_rent_controller');
/* GET home page. */

router.post("/getAllShop", shopRent.getAllShop);



module.exports = router;
