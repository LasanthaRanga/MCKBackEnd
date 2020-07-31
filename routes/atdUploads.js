const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const mycon = require('../util/conn');
var fs = require('fs');
var dateFormat = require('dateformat');
let path = '';
const multer = require('multer');
var appRoot = require('app-root-path');

const uppath = "./uploads/";
const downpath = "https://www.coopshop.lk/uploads/profile/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uppath);
    },
    filename: function (req, file, cb) {
        let date = dateFormat(new Date(), 'yyyyMMddHHmmss_', 'en-US', '+0530');
        path = date + file.originalname;
        cb(null, path);
    }
}
);

const upload = multer(
    { storage: storage }
);

router.post("/upload", upload.single('attach'), (req, res, next) => {
    try {
        console.log(req.file.path + "  --> Path ");
        let pp = path;
        mycon.execute("INSERT INTO `doc_up`( `appcat`, `doctype`, `realpath`, `url`, `appid`, `other_int`, `other_string`) " +
            " VALUES ( '16', '" + req.body.catid + "', '" + pp + "', '', '" + req.body.atdid + "', '1', '" + req.body.catName + "');", (error, rows, next) => {
                if (!error) {
                    res.send({ imgpath: pp });
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log("-----")
        console.log(error);
    }
});

router.post('/getUploadList', (req, res, nex) => {
    try {
        mycon.execute("SELECT doc_up.idDocUpload,doc_up.doctype,doc_up.realpath,doc_up.url,doc_up.appid,doc_up.other_int,doc_up.other_string FROM doc_up WHERE doc_up.appid= '" + req.body.atdid + "' AND doc_up.appcat= 16 ORDER BY doc_up.doctype ASC ", (error, rows, next) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
});


router.get('/:path', (req, res, nex) => {
//    console.log("hit");
    var path = req.params.path;
  //  console.log(appRoot);
    res.sendFile(appRoot + '/uploads/' + path);
});



module.exports = router;