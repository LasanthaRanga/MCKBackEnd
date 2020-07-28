const mycon = require('../util/conn');
var dateFormat = require('dateformat');

exports.startAtd = (req, res, next) => {
    // console.log(req.body);

    var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    try {
        mycon.execute("INSERT INTO atd ( idAssessment, atd_status, atd_status_int, start_date_time ) VALUES	( " + req.body.idAssess + ", 'Start New Application', 0, '" + day + "' )",
            (error, rows, fildData) => {
                if (!error) {
                    let idassess = rows.insertId;
                    console.error(rows.insertId);
                    req.body.customer.forEach(cus => {
                        console.log(cus);
                        mycon.execute("INSERT INTO `atd_customer` (  `nic`, `fullname`, `initname`, `adl1`, `adl2`, `adl3`, `mobile`, `tp`, `fullnamesinhala`, `initnamesinhala`, `idAtd`) " +
                            "  VALUES ( '" + cus.nic + "', '" + cus.fname + "', '" + cus.iname + "', '" + cus.adl1 + "', '" + cus.adl2 + "', '" + cus.adl3 + "', '" + cus.mobile + "', '" + cus.tp + "', '" + cus.sfname + "', '" + cus.siname + "', '" + idassess + "' )", (err, row, next) => {
                                if (!err) {
                                } else {
                                    console.log(err);
                                }
                            });
                    });
                    res.send({ atdid: rows.insertId });
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getNeedDock = (req, res, next) => {
    try {
        mycon.execute("SELECT application_catagory.application_name,doccat.Doccat_name,doccat.idDoccat " +
            " FROM needdoc INNER JOIN doccat ON needdoc.Doccat_idDoccat=doccat.idDoccat INNER JOIN application_catagory " +
            " ON needdoc.Application_Catagory_idApplication_Catagory=application_catagory.idApplication_Catagory " +
            " WHERE application_catagory.idApplication_Catagory = " + req.body.id,
            (error, rows, fildData) => {
                res.send(rows);
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getLocation = (req, res, next) => {
    try {
        mycon.execute("SELECT sl_side.side_id,sl_side.side_name,sl_side.sinhala FROM sl_side",
            (error, rows, fildData) => {
                res.send(rows);
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.saveData = (req, res, next) => {
    console.log(req.body);



    try {
        mycon.execute("UPDATE `atd` SET " +
            " `oppu_no`='" + req.body.oppuNo + "', " +
            " `pathtiru_no`='" + req.body.paththiruNo + "'," +
            " `oppu_nature` = '" + req.body.oppuNature + "'," +
            " `notharis_name` = '" + req.body.notharisName + "'," +
            " `pimbura_no` = '" + req.body.pimburaNo + "', " +
            " `minindoru_name` = '" + req.body.minindoruName + "'," +
            " `land_acres` = '" + req.body.landAcres + "'," +
            " `land_rudd` = '" + req.body.landRudd + "'," +
            " `land_parch` = '" + req.body.landParch + "'," +
            " `land_lotno` = '" + req.body.landLotno + "'," +
            " `land_value` = '" + req.body.landValue + "'," +
            " `handover_date` = '" + req.body.handoverDate + "'," +
            " `land_description` = '" + req.body.landDescription + "'," +
            " `land_description_text` = '" + req.body.landDescriptionText + "'," +
            " `atd_status` = '" + req.body.atdStatus + "'," +
            " `atd_status_int` = '" + +req.body.atdStatusInt + "'," +
            "  `user_id1` = '" + req.body.userId1 + "' WHERE`idAtd` = '" + req.body.atdid + "' ",
            (error, rows, fildData) => {
                if (!error) {
                    let ld = req.body.locationData;
                    ld.forEach(loc => {
                        console.log(loc);
                        mycon.execute("INSERT INTO `atd`.`atd_location`( `atd_id`, `side_no`, `side_name`, `side_info`) VALUES ('" + req.body.atdid + "', '" + loc.side.side_id + "', '" + loc.side.sinhala + "', '" + loc.data + "')",
                            (e, r, f) => {
                                if (!e) {
                                    console.log(r);
                                } else {
                                    console.log(e);
                                }
                            });
                    });
                    res.send(rows);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getAtdList = (req, res, next) => {
    try {
        mycon.execute("SELECT atd_customer.initname,ward.ward_name,street.street_name,assessment.assessment_no,atd.idAtd,atd.atd_status_int " +
            " FROM atd LEFT JOIN atd_customer ON atd_customer.idAtd=atd.idAtd " +
            " LEFT JOIN assessment ON assessment.idAssessment=atd.idAssessment " +
            " LEFT JOIN ward ON assessment.Ward_idWard=ward.idWard " +
            " LEFT JOIN street ON street.Ward_idWard=ward.idWard " +
            " AND assessment.Street_idStreet=street.idStreet " +
            " WHERE atd.atd_status_int= '" + req.body.status + "' GROUP BY atd.idAtd", (error, rows, fildData) => {
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

exports.getAtd = (req, res, next) => {
    try {
        mycon.execute("SELECT atd.idAtd,atd.atd_status_int,atd.idAssessment,atd.oppu_no,atd.pathtiru_no,atd.oppu_nature, " +
            " atd.notharis_name,atd.pimbura_no,atd.minindoru_name,atd.land_acres,atd.land_rudd,atd.land_parch,atd.land_lotno," +
            " atd.land_value,atd.handover_date,atd.land_description,atd.land_description_text,atd.atd_status,atd.start_date_time," +
            " atd.user_id1 FROM atd WHERE atd.idAtd= " + req.body.atdid, (error, rows, fildData) => {
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

exports.getAtdCustomer = (req, res, next) => {
    try {
        mycon.execute("SELECT atd_customer.idAtdCus,atd_customer.nic,atd_customer.fullname,atd_customer.initname," +
            " atd_customer.adl1,atd_customer.adl2,atd_customer.adl3,atd_customer.mobile,atd_customer.tp,atd_customer.fullnamesinhala," +
            " atd_customer.initnamesinhala,atd_customer.idAtd FROM atd_customer WHERE atd_customer.idAtd= " + req.body.atdid, (error, rows, fildData) => {
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

exports.saveRiData = (req, res, next) => {
    console.log(req.body);
    try {
        mycon.execute("UPDATE `atd` SET  `harforfull` = '" + req.body.full + "', `arlyrequested` = '" + req.body.arly + "', `user_idri` = '" + req.body.uid + "', ri_date = '" + req.body.date + "', des= '" + req.body.des + "',atd_status='RI Completed', atd_status_int= '2' WHERE `idAtd` = " + req.body.atdid, (error, rows, fildData) => {
            if (!error) {
                let ass = req.body.assess;
                ass.forEach(a => {
                    mycon.execute("INSERT INTO `atd_nearest`( `atdid`, `idAssessment`, `comment`, `status`) VALUES ( '" + req.body.atdid + "', '" + a.idAssessment + "', NULL, 1);", (e, r, f) => {
                        if (!e) {
                            console.log(r);
                        } else {
                            console.log(error);
                            // res.status(500).send(error);
                        }
                    });
                });
                res.status(200).send({ ok: 'ok' });
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



