var express = require('express');
var router = express.Router();
const shopRent = require('../controller/shop_rent_controller');
/* GET home page. */

router.post("/getAllShop", shopRent.getAllShop);
router.post("/getAlloffice", shopRent.getAlloffice);
router.post("/getAllBillding", shopRent.getAllBillding);
router.post("/getAllfloor", shopRent.getAllfloor);



module.exports = router;
