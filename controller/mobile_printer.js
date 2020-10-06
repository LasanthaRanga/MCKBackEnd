const mycon = require('../util/conn');
var dateFormat = require('dateformat');
const conn = require('../util/conn');



exports.getAllPrinter = (req, res, next) => {
    try {
        conn.execute('SELECT mobile_printers.idDivice,mobile_printers.userid,mobile_printers.macAddress,mobile_printers.`name`,mobile_printers.`status` FROM mobile_printers', (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
                res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.assignPrinter = (req, res, next) => {

    var uid = req.body.uid;
    var mac = req.body.mac;
    var name = req.body.name;

    try {
        conn.execute('SELECT mobile_printers.idDivice,mobile_printers.userid,mobile_printers.macAddress,mobile_printers.`name`,mobile_printers.`status` FROM mobile_printers WHERE mobile_printers.userid = ' + uid, (error, rows, fildData) => {
            if (!error) {
                if (rows[0]) {
                    //update
                    var id = rows[0].idDivice;
                    console.log(id);
                    conn.execute("UPDATE `mobile_printers` SET `userid`='" + uid + "',`macAddress`='" + mac + "',`name`='" + name + "',`status`='1' WHERE `idDivice`=" + id, (er, ro, fd) => {
                        res.send(ro);
                    });
                } else {
                    conn.execute("INSERT INTO `mobile_printers`( `userid`, `macAddress`, `name`, `status`) VALUES ('" + uid + "', '" + mac + "', '" + name + "', '1')", (er, ro, fd) => {
                        res.send(ro);
                    });
                }
            } else {
                console.log(error);
                res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getMyPrinter = (req, res, next) => {
    var uid = req.body.uid;
    try {
        conn.execute('SELECT mobile_printers.idDivice,mobile_printers.userid,mobile_printers.macAddress,mobile_printers.`name`,mobile_printers.`status` FROM mobile_printers WHERE mobile_printers.userid = ' + uid, (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
                res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}