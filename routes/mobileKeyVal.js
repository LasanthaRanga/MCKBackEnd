const express = require('express');
const router = express.Router();
const mycon = require('../util/conn');
const checkAuth = require('../middleware/check-auth');
const userController = require('../controller/user');


router.post("/", (req, res, next) => {
    try {
        mycon.execute("SELECT mobile_value.`value` FROM mobile_value WHERE mobile_value.`key` = '" + req.body.key + "'", (er, ro, fd) => {
            if (!er) {
                res.send(ro);
            } else {
                res.send(er);
            }
        })
    } catch (error) {
        res.send(error);
    }
});



module.exports = router;