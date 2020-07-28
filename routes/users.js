const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const userController = require('../controller/user');


router.post("/getAll", checkAuth, userController.getAllusers);

router.post("/login", userController.login);

module.exports = router;
