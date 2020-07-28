const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const assessController = require('../controller/assess_data_controller');


router.post("/getArrears", assessController.getArrears);
router.post("/getDetails", assessController.getDetails);
router.post("/getWardList", assessController.getWardList);
router.post("/getStreetList", assessController.getStreetList);
router.post("/searchAssessment", assessController.searchAssessment);

module.exports = router;
