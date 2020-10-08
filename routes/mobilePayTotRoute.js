var express = require('express');
var router = express.Router();
const mobilePayTot = require('../controller/mobile_pay_tot');
/* GET home page. */

router.post("/makeAssess", mobilePayTot.makeAssess);
router.post("/totalBillByDate", mobilePayTot.totalBillByDate);


module.exports = router;