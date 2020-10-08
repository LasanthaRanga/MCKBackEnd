const mycon = require('../util/conn');
var dateFormat = require('dateformat');
const conn = require('../util/conn');



exports.getPayment = (req, res, next) => {
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        var year = dateFormat(new Date(), "yyyy");

        let mob = req.body;
        let oder = 0;
        let text = '';
        mycon.execute("SELECT mobile_pay.oder FROM mobile_pay WHERE YEAR (mobile_pay.collect_time)='" + year + "' AND mobile_pay.user_id='" + mob.user_id + "' ORDER BY mobile_pay.idMobilePay DESC LIMIT 1", (error, rows, filedata) => {
            if (!error) {
                if (rows[0]) {
                    let od = rows[0].oder;
                    oder = od + 1;
                } else {
                    oder = oder + 1;
                }
                mycon.execute("SELECT mobile_recipt_create.recipt_text FROM mobile_recipt_create WHERE mobile_recipt_create.app_cat='" + mob.app_cat + "'", (er, ro, ne) => {
                    if (!er) {
                        text = ro[0].recipt_text+mob.user_id+' :';
                        text += oder;
                        mycon.execute("INSERT INTO `mobile_pay` (`app_cat`,`app_id`,`user_id`,`collect_time`,`amount`,`pay_type`,`cheque_no`,`bank_id`,`mobile_recipt_no`,`oder`,`cus_email`,`cus_mobile`,`status`,`status_time`) " +
                            " VALUES ('" + mob.app_cat + "','" + mob.app_id + "','" + mob.user_id + "','" + day + "','" + mob.amount + "','" + mob.pay_type + "','" + mob.cheque_no + "','" + mob.bank_id + "','" + text + "','" + oder + "','" + mob.cus_email + "','" + mob.cus_mobile + "',0,'" + day + "');",
                            (err, row, next) => {
                                if (!err) {
                                    res.send(row);
                                } else {
                                    console.log(err);
                                }
                            }
                        );
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getReciptData = (req, res, next) => {
    var id = req.body.id;
    try {
        mycon.execute("SELECT `user`.user_username,assessment.assessment_no,mobile_pay.idMobilePay,mobile_pay.app_cat,mobile_pay.app_id,mobile_pay.user_id,mobile_pay.collect_time,mobile_pay.amount,mobile_pay.pay_type,mobile_pay.cheque_no,mobile_pay.bank_id,mobile_pay.oder,mobile_pay.mobile_recipt_no,mobile_pay.cus_id,mobile_pay.cus_email,mobile_pay.cus_mobile,mobile_pay.`status`,mobile_pay.status_time,mobile_pay.recipt_id,mobile_pay.recipt_no,customer.cus_name FROM mobile_pay INNER JOIN `user` ON mobile_pay.user_id=`user`.idUser INNER JOIN assessment ON assessment.idAssessment=mobile_pay.app_id INNER JOIN customer ON assessment.Customer_idCustomer=customer.idCustomer WHERE mobile_pay.idMobilePay=" + id,
            (ee, rr, ff) => {
                if (!ee) {
                    res.send(rr);
                }
            });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getBank = (req, res, next) => {
    try {
        mycon.execute("SELECT bank.idBank, bank.bank_name FROM bank",
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


exports.getMobileEmail = (req, res, next) => {
    let app_cat = req.body.app_cat;
    let app_id = req.body.app_id;
    try {
        mycon.execute("SELECT mobile_pay.cus_email,mobile_pay.cus_mobile FROM mobile_pay WHERE mobile_pay.app_cat='" + app_cat + "' AND mobile_pay.app_id='" + app_id + "' AND mobile_pay.cus_mobile<> '' ORDER BY mobile_pay.idMobilePay DESC LIMIT 1",
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

exports.getMyBill = (req, res, next) => {
    let from = req.body.from;
    let to = req.body.to;
    let user = req.body.user;
    try {
        mycon.execute("SELECT mobile_pay.idMobilePay,mobile_pay.app_cat,mobile_pay.app_id,mobile_pay.user_id,mobile_pay.collect_time,mobile_pay.amount,mobile_pay.pay_type,mobile_pay.cheque_no,mobile_pay.bank_id,mobile_pay.oder,mobile_pay.mobile_recipt_no,mobile_pay.cus_id,mobile_pay.cus_email,mobile_pay.cus_mobile,mobile_pay.`status`,mobile_pay.status_time,mobile_pay.recipt_id,mobile_pay.recipt_no FROM mobile_pay " +
            " WHERE date(mobile_pay.collect_time) BETWEEN '" + from + "' AND '" + to + "' AND mobile_pay.user_id='" + user + "'",
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


exports.getAssBill = (req, res, next) => {
    let idMobilePay = req.body.idMobilePay;
    try {
        mycon.execute("SELECT mobile_pay.idMobilePay,mobile_pay.app_cat,mobile_pay.app_id,mobile_pay.user_id,mobile_pay.collect_time,mobile_pay.amount,mobile_pay.pay_type,mobile_pay.cheque_no,mobile_pay.bank_id,mobile_pay.oder,mobile_pay.mobile_recipt_no,mobile_pay.cus_id,mobile_pay.cus_email,mobile_pay.cus_mobile,mobile_pay.`status`,mobile_pay.status_time,mobile_pay.recipt_id,mobile_pay.recipt_no,assessment.idAssessment,assessment.Customer_idCustomer,assessment.Ward_idWard,assessment.Street_idStreet,assessment.ass_nature_idass_nature,assessment.ass_discription_idass_discription,assessment.User_idUser,assessment.assessment_oder,assessment.assessment_no,assessment.assessment_status,assessment.assessment_syn,assessment.assessment_comment,assessment.assessment_obsolete,assessment.office_idOffice,assessment.isWarrant,ward.ward_name,ward.idWard,ward.ward_no,street.street_name,street.street_no,street.idStreet,ass_allocation.ass_allocation_status,ass_allocation.ass_allocation,ass_nature.ass_nature_name,ass_discription.ass_discription FROM mobile_pay INNER JOIN assessment ON assessment.idAssessment=mobile_pay.app_id INNER JOIN ward ON assessment.Ward_idWard=ward.idWard INNER JOIN street ON street.Ward_idWard=ward.idWard AND assessment.Street_idStreet=street.idStreet INNER JOIN ass_allocation ON ass_allocation.Assessment_idAssessment=assessment.idAssessment INNER JOIN ass_nature ON assessment.ass_nature_idass_nature=ass_nature.idass_nature INNER JOIN ass_discription ON assessment.ass_discription_idass_discription=ass_discription.idass_discription WHERE ass_nature.ass_nature_status=1 AND mobile_pay.idMobilePay=" + idMobilePay,
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

exports.getAssBillToTot = (req, res, next) => {
    let from = req.body.from;
    let to = req.body.to;
    let user = req.body.user;
    try {
        mycon.execute("SELECT mobile_pay.idMobilePay,mobile_pay.app_cat,mobile_pay.app_id,mobile_pay.user_id,mobile_pay.collect_time,mobile_pay.amount,mobile_pay.pay_type,mobile_pay.cheque_no,mobile_pay.bank_id,mobile_pay.oder,mobile_pay.mobile_recipt_no,mobile_pay.cus_id,mobile_pay.cus_email,mobile_pay.cus_mobile,mobile_pay.`status`,mobile_pay.status_time,mobile_pay.recipt_id,mobile_pay.recipt_no FROM mobile_pay WHERE date(mobile_pay.collect_time)='" + from + "' AND mobile_pay.user_id='" + user + "' AND mobile_pay.`status`=0",
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


exports.cancleAssBill = (req, res, next) => {
    let idMobilePay = req.body.idMobilePay;
    try {
        mycon.execute("UPDATE `mobile_pay` SET `status`= 2 WHERE `idMobilePay`=" + idMobilePay,
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