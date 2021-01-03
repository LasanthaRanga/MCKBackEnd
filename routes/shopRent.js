var express = require('express');
var router = express.Router();
const shopRent = require('../controller/shop_rent_controller');
/* GET home page. */

router.post("/getAllShop", shopRent.getAllShop);
router.post("/getAlloffice", shopRent.getAlloffice);
router.post("/getAllBillding", shopRent.getAllBillding);
router.post("/getAllfloor", shopRent.getAllfloor);
router.post("/getShops", shopRent.getShops);
router.post("/getShopInfo", shopRent.getShopInfo);
router.post("/getPayInfo", shopRent.getPayInfo);



module.exports = router;
