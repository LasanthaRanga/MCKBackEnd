var express = require('express');
var router = express.Router();
const printer = require('../controller/mobile_printer');
/* GET home page. */

router.post("/getAllPrinter", printer.getAllPrinter);
router.post("/assignPrinter", printer.assignPrinter);
router.post("/getMyPrinter", printer.getMyPrinter);


module.exports = router;
