var express = require('express');
var router = express.Router();
const mobilePay = require('../controller/mobile_pay');
/* GET home page. */

router.post("/getPayment", mobilePay.getPayment);
router.post("/getBank", mobilePay.getBank);
router.post("/getMobileEmail", mobilePay.getMobileEmail);
router.post("/getMyBill", mobilePay.getMyBill);
router.post("/getAssBill", mobilePay.getAssBill);
router.post("/getAssBillToTot", mobilePay.getAssBillToTot);
router.post("/cancleAssBill", mobilePay.cancleAssBill);
router.post("/getReciptData", mobilePay.getReciptData);


module.exports = router;
