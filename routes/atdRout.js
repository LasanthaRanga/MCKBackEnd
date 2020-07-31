const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const atd = require('../controller/atd');

router.post("/startAtdMain", atd.startAtdMain);
router.post("/startAtd", atd.startAtd);
router.post("/getNeedDock", atd.getNeedDock);
router.post("/getLocation", atd.getLocation);
router.post("/saveData", atd.saveData);
router.post("/getAtdList", atd.getAtdList);
router.post("/getAtd", atd.getAtd);
router.post("/getAtdCustomer", atd.getAtdCustomer);
router.post("/saveRiData", atd.saveRiData);
router.post("/setApprove", atd.setApprove);
router.post("/getSide", atd.getSide);
router.post("/getNearestAss", atd.getNearestAss);
router.post("/getApproval", atd.getApproval);
router.post("/getStatus", atd.getStatus);

module.exports = router;
