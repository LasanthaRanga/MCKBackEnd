const mycon = require('../util/conn');
var dateFormat = require('dateformat');
const conn = require('../util/conn');



exports.startAtdMain = (req, res, next) => {
    var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    try {
        mycon.execute("INSERT INTO `atd_main`( `status`, `status_text`, `other_text`, `other_int`) " +
            "VALUES ( 0, 'Start', NULL, NULL)",
            (error, rows, fildData) => {
                if (!error) {
                    let main = rows.insertId;
                    let array = req.body.array;
                    array.forEach(as => {
                        let assid = as.idAssessment;
                        mycon.execute("INSERT INTO `atd` (`idAssessment`, `atd_status`, `atd_status_int`, `main_id`,`start_date_time`) " +
                            " VALUES ( '" + assid + "', 'Start', 0, '" + main + "', '" + day + "');", (e, r, f) => {
                                if (!e) {
                                    console.log(r);
                                } else {
                                    console.log(e);
                                }
                            });
                    });
                    res.send({ idatdmain: main });
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.addAtdCustomer = (req, res, next) => {
    try {
        req.body.customer.forEach(cus => {
            console.log(cus);
            mycon.execute("INSERT INTO `atd_customer` (  `nic`, `fullname`, `initname`, `adl1`, `adl2`, `adl3`, `mobile`, `tp`, `fullnamesinhala`, `initnamesinhala`, `main_id`) " +
                "  VALUES ( '" + cus.nic + "', '" + cus.fname + "', '" + cus.iname + "', '" + cus.adl1 + "', '" + cus.adl2 + "', '" + cus.adl3 + "', '" + cus.mobile + "', '" + cus.tp + "', '" + cus.sfname + "', '" + cus.siname + "', '" + req.body.atdmainid + "' )", (err, row, next) => {
                    if (!err) {
                    } else {
                        console.log(err);
                    }
                });
        }
        );
        res.send({ idatdmain: atdmainid })


    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getAtdsBymainId = (req, res, next) => {
    try {
        mycon.execute("SELECT atd.idAtd,atd.idAssessment,atd.oppu_no,atd.pathtiru_no,atd.oppu_nature,atd.notharis_name,atd.pimbura_no,atd.minindoru_name,atd.land_acres,atd.land_rudd,atd.land_parch,atd.land_lotno,atd.land_value,atd.handover_date,atd.land_description,atd.land_description_text,atd.atd_status,atd.atd_status_int,atd.start_date_time,atd.user_id1,atd.harforfull,atd.arlyrequested,atd.user_idri,atd.ri_date,atd.des,atd.main_id,atd_main.idatdmain,atd_main.`status`,atd_main.status_text,atd_main.other_text,atd_main.other_int,assessment.assessment_no,ward.ward_name,street.street_name,ass_nature.ass_nature_name,ass_discription.ass_discription FROM atd_main INNER JOIN atd ON atd.main_id=atd_main.idatdmain INNER JOIN assessment ON assessment.idAssessment=atd.idAssessment INNER JOIN ward ON assessment.Ward_idWard=ward.idWard INNER JOIN street ON street.Ward_idWard=ward.idWard AND assessment.Street_idStreet=street.idStreet INNER JOIN ass_nature ON assessment.ass_nature_idass_nature=ass_nature.idass_nature INNER JOIN ass_discription ON assessment.ass_discription_idass_discription=ass_discription.idass_discription WHERE atd_main.idatdmain =" + req.body.atdmainid,
            (err, row, next) => {
                if (!err) {
                    res.send(row);
                } else {
                    console.log(err);
                }
            });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}






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
        mycon.execute("SELECT ward.ward_name,street.street_name,assessment.assessment_no,atd.idAtd,atd.atd_status_int," +
            " atd_customer.initname,atd_main.idatdmain FROM atd LEFT JOIN assessment ON assessment.idAssessment=atd.idAssessment " +
            " LEFT JOIN ward ON assessment.Ward_idWard=ward.idWard LEFT JOIN street ON street.Ward_idWard=ward.idWard AND " +
            " assessment.Street_idStreet=street.idStreet INNER JOIN atd_main ON atd_main.idatdmain=atd.main_id INNER JOIN atd_customer " +
            " ON atd_customer.main_id=atd_main.idatdmain WHERE atd.atd_status_int = '" + req.body.status + "' GROUP BY atd_main.idatdmain "
            , (error, rows, fildData) => {
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
        mycon.execute("SELECT atd.idAtd,atd.idAssessment,atd.oppu_no,atd.pathtiru_no,atd.oppu_nature,atd.notharis_name, " +
            "  atd.pimbura_no,atd.minindoru_name,atd.land_acres,atd.land_rudd,atd.land_parch,atd.land_lotno,atd.land_value, " +
            "  atd.handover_date,atd.land_description,atd.land_description_text,atd.atd_status,atd.atd_status_int,atd.start_date_time, " +
            "   atd.user_id1,atd.harforfull,atd.arlyrequested,atd.user_idri,atd.ri_date,atd.des,atd.main_id FROM atd WHERE idatd = " + req.body.atdid, (error, rows, fildData) => {
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


exports.getAtds = (req, res, next) => {
    try {
        mycon.execute("SELECT atd.idAtd,atd.idAssessment,atd.oppu_no,atd.pathtiru_no,atd.oppu_nature,atd.notharis_name," +
            " atd.pimbura_no,atd.minindoru_name,atd.land_acres,atd.land_rudd,atd.land_parch,atd.land_lotno,atd.land_value," +
            " atd.handover_date,atd.land_description,atd.land_description_text,atd.atd_status,atd.atd_status_int," +
            " atd.start_date_time,atd.user_id1,atd.harforfull,atd.arlyrequested,atd.user_idri,atd.ri_date,atd.des,atd.main_id," +
            " atd_main.idatdmain,atd_main.`status`,atd_main.status_text,atd_main.other_text,atd_main.other_int FROM atd_main " +
            " INNER JOIN atd ON atd.main_id=atd_main.idatdmain WHERE atd.main_id = " + req.body.idatdmain, (error, rows, fildData) => {
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
        mycon.execute("SELECT atd_customer.idAtdCus,atd_customer.nic,atd_customer.fullname,atd_customer.initname,atd_customer.adl1," +
            " atd_customer.adl2,atd_customer.adl3,atd_customer.mobile,atd_customer.tp,atd_customer.fullnamesinhala," +
            " atd_customer.initnamesinhala,atd_customer.main_id FROM atd_customer WHERE atd_customer.main_id= " + req.body.idatdmain, (error, rows, fildData) => {
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

exports.setApprove = (req, res, next) => {
    console.log(req.body);
    var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    try {
        mycon.execute("UPDATE `atd_main` SET `status`='" + req.body.st + "',`status_text`='" + req.body.status + "' WHERE `idatdmain`=" + req.body.idatdmain, (er, rw, fd) => {
            if (er) {
                console.log(er);
            }
        });
        mycon.execute("INSERT INTO  `atd_approve`(  `comment`, `status_int`, `status_string`, `user_id`, `dt`, main_id) " +
            "  VALUES (  '" + req.body.comment + "', '" + req.body.statusInt + "', '" + req.body.statusString + "', '" + req.body.uid + "', '" + day + "','" + req.body.idatdmain + "')", (error, rows, fildData) => {
                if (!error) {
                    mycon.execute("UPDATE `atd` SET `atd_status`='" + req.body.status + "',`atd_status_int`= '" + req.body.st + "' WHERE `main_id`= " + req.body.idatdmain, (er, ro, fi) => {
                        if (!er) {
                            //console.log(ro);
                            res.send({ ok: 'ok' });
                        } else {
                            console.log(error);
                        }
                    });
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


exports.getSide = (req, res, next) => {
    try {
        mycon.execute("SELECT atd_location.side_name, atd_location.side_info FROM atd_location WHERE atd_location.atd_id = " + req.body.atdid, (error, rows, fildData) => {
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


exports.getNearestAss = (req, res, next) => {
    try {
        mycon.execute("SELECT atd_nearest.idnearest,atd_nearest.atdid,atd_nearest.idAssessment,ward.ward_name,street.street_name, " +
            " ass_nature.ass_nature_name,ass_discription.ass_discription,assessment.assessment_no,customer.cus_name " +
            "  FROM atd_nearest INNER JOIN assessment ON assessment.idAssessment=atd_nearest.idAssessment " +
            "  INNER JOIN ward ON assessment.Ward_idWard=ward.idWard " +
            "  INNER JOIN street ON street.Ward_idWard=ward.idWard AND assessment.Street_idStreet=street.idStreet " +
            "  INNER JOIN ass_nature ON assessment.ass_nature_idass_nature=ass_nature.idass_nature " +
            "  INNER JOIN ass_discription ON assessment.ass_discription_idass_discription=ass_discription.idass_discription " +
            "  INNER JOIN customer ON assessment.Customer_idCustomer=customer.idCustomer WHERE atd_nearest.atdid= " + req.body.atdid, (error, rows, fildData) => {
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

exports.getNearestAss = (req, res, next) => {
    try {
        mycon.execute("SELECT atd_nearest.idnearest,atd_nearest.atdid,atd_nearest.idAssessment,ward.ward_name,street.street_name, " +
            " ass_nature.ass_nature_name,ass_discription.ass_discription,assessment.assessment_no,customer.cus_name " +
            "  FROM atd_nearest INNER JOIN assessment ON assessment.idAssessment=atd_nearest.idAssessment " +
            "  INNER JOIN ward ON assessment.Ward_idWard=ward.idWard " +
            "  INNER JOIN street ON street.Ward_idWard=ward.idWard AND assessment.Street_idStreet=street.idStreet " +
            "  INNER JOIN ass_nature ON assessment.ass_nature_idass_nature=ass_nature.idass_nature " +
            "  INNER JOIN ass_discription ON assessment.ass_discription_idass_discription=ass_discription.idass_discription " +
            "  INNER JOIN customer ON assessment.Customer_idCustomer=customer.idCustomer WHERE atd_nearest.atdid= " + req.body.atdid, (error, rows, fildData) => {
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


exports.getApproval = (req, res, next) => {
    try {
        mycon.execute("SELECT atd_approve.`comment`,`user`.user_full_name,approval_cat.approval_name,atd_approve.dt,atd.idAtd,atd_approve.idApprove, " +
            "  atd_approve.status_string,atd_approve.status_int,atd_approve.user_id,atd_approve.main_id FROM atd_approve INNER JOIN atd ON atd_approve.main_id=atd.main_id " +
            "  LEFT JOIN `user` ON `user`.idUser=atd_approve.user_id LEFT JOIN user_has_approval_cat ON user_has_approval_cat.User_idUser=`user`.idUser " +
            "  LEFT JOIN approval_cat ON user_has_approval_cat.Approval_cat_idApproval_cat=approval_cat.idApproval_cat WHERE atd_approve.main_id = '" + req.body.idatdmain + "' GROUP BY atd_approve.idApprove " +
            "  ORDER BY atd_approve.idApprove ASC"
            , (error, rows, fildData) => {
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

exports.getStatus = (req, res, next) => {
    try {
        mycon.execute("SELECT atd_status.idstatus,atd_status.english,atd_status.sinhala,atd_status.status_number FROM atd_status"
            , (error, rows, fildData) => {
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

exports.getLaterStaticsData = (req, res, next) => {
    array = [];
    try {
        mycon.execute("SELECT atd_later.id,atd_later.`value` FROM atd_later WHERE atd_later.later_type=" + req.body.type
            , (error, rows, fildData) => {
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

exports.setValuation = (req, res, next) => {
    try {

        mycon.execute("UPDATE `atd_main` SET `status`='" + req.body.statusInt + "',`status_text`='" + req.body.statusString + "' WHERE `idatdmain`=" + req.body.idatdmain, (er, rw, fd) => {
            if (er) {
                console.log(er);
            }
        });

        mycon.execute("INSERT INTO  `atd_approve`(  `comment`, `status_int`, `status_string`, `user_id`, `dt`, main_id) " +
            "  VALUES (  '" + req.body.comment + "', '1', '" + req.body.statusString + "', '" + req.body.uid + "', '" + req.body.date + "','" + req.body.idatdmain + "')", (error, rows, fildData) => {
                if (!error) {

                } else {
                    console.log(error);
                    res.status(500).send(error);
                }
            });

        mycon.execute("UPDATE `atd` SET `atd_status`='" + req.body.statusString + "',`atd_status_int`='" + req.body.statusInt + "',`valuation_no`='" + req.body.number + "',`valuation_date`='" + req.body.date + "' WHERE `idAtd`=" + req.body.idAtd
            , (error, rows, fildData) => {
                if (!error) {

                } else {
                    console.log(error);
                    res.status(500).send(error);
                }
            });

        res.send({ ok: 'OK Done' });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}



exports.updateSystem = (req, res, next) => {
    let mid = req.body.mainId;
    var day = dateFormat(new Date(), "yyyy-mm-dd");
    console.log("updating");
    try {
        mycon.execute("SELECT atd.idAssessment,atd.idAtd FROM atd_main INNER JOIN atd ON atd.main_id=atd_main.idatdmain WHERE atd.main_id= " + mid
            , (error, rows, fildData) => {
                console.log("atds");
                if (!error) {
                    rows.forEach(atd => {
                        let idAss = atd.idAssessment;
                        console.log("atd" + idAss);
                        mycon.execute("UPDATE  `cushasassess` SET `status` = 0 WHERE `assessment_id` = " + idAss, (ee, rr, ff) => {
                            console.log("Updated" + idAss);
                            if (ee) {
                               
                                console.log(error);
                                res.status(500).send(error);
                            }
                        });
                        mycon.execute("SELECT atd_customer.idAtdCus,atd_customer.nic,atd_customer.fullname,atd_customer.initname,atd_customer.adl1,atd_customer.adl2,atd_customer.adl3,atd_customer.mobile,atd_customer.tp,atd_customer.fullnamesinhala,atd_customer.initnamesinhala,atd_customer.main_id FROM atd_main INNER JOIN atd_customer ON atd_customer.main_id=atd_main.idatdmain WHERE atd_customer.main_id=" + mid
                            , (erro, row, fildDat) => {
                                console.log("customers");
                                if (!erro) {
                                    row.forEach(cus => {
                                        mycon.execute(
                                            "INSERT INTO `customer` (`cus_name`,`cus_person_title`,`cus_nic`,`cus_mobile`,`cus_tel`,\n" +
                                            "`cus_address_l1`,`cus_address_l2`,`cus_address_l3`,\n" +
                                            "`cus_sity`,`cus_status`,`cus_syn`,`cus_reg_date`,`cus_update_date`,\n" +
                                            "`cus_name_sinhala`,`cus_address_l1_sinhala`,`cus_address_l2_sinhala`,`cus_address_l3_sinhala`,`cus_cat_id`) \n" +
                                            "VALUES ('" + cus.initname + "',NULL,'" + cus.nic + "','" + cus.mobile + "','" + cus.tp + "',\n" +
                                            "'" + cus.adl1 + "','" + cus.adl2 + "','" + cus.adl3 + "',\n" +
                                            "'',1,0,'" + day + "','" + day + "',\n" +
                                            "'" + cus.initnamesinhala + "','','','',NULL)"
                                            , (er, ro, fi) => {
                                                if (!er) {
                                                    let cusid = ro.insertId;
                                                    console.log("cusids" + cusid);
                                                    mycon.execute("INSERT INTO `cushasassess`( `assessment_id`, `customer_id`, `status`, `date`) " +
                                                        "VALUES ( '" + idAss + "', '" + cusid + "', 1, '" + day + "')", (ee, rr, ff) => {
                                                            if (!ee) {
                                                                console.log("cus has ass" + cusid);
                                                            } else {
                                                                console.log(error);
                                                                res.status(500).send(error);
                                                            }
                                                        });
                                                } else {
                                                    console.log(error);
                                                    res.status(500).send(error);
                                                }
                                            });
                                    });
                                } else {
                                    console.log(error);
                                    res.status(500).send(error);
                                }
                            });
                    });
                } else {
                    console.log(error);
                    res.status(500).send(error);
                }
            });


        res.send({ OK: "OK" });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


