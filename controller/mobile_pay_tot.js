const mycon = require('../util/conn');
var dateFormat = require('dateformat');
const conn = require('../util/conn');

exports.makeAssess = (req, res, next) => {
    var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    var bd = req.body;
    var payType = bd.payType;
    var uid = bd.user.uid;
    var total = bd.total;
    var chno = bd.chno;
    var date = bd.date;
    var oder = 0;
    var text = '';
    try {
        mycon.execute("SELECT mobile_tot.oder FROM mobile_tot WHERE mobile_tot.user_id='" + uid + "' AND mobile_tot.appcat=2 ORDER BY mobile_tot.idMobTot DESC LIMIT 1",
            (e, r, f) => {
                if (!e) {
                    if (r[0]) {
                        oder = r[0].oder + 1;
                    } else {
                        oder = oder + 1;
                    }
                    console.log('ODER  =  ' + oder);
                    mycon.execute("SELECT mobile_value.`key`,mobile_value.`value` FROM mobile_value WHERE mobile_value.`key`='mob_at_tot_bill_text'", (ee, rr, ff) => {
                        if (!ee) {
                            text = rr[0].value;
                            text = text + uid + '-' + oder;
                            console.log(text);

                            var qq = " INSERT INTO `mobile_tot` ( `user_id`, `total`, `date_time`, `no`, `status`, `comment`, `appcat`, `oder`, `payType`, `chequeno`, `recipt_date` ) "
                                + " VALUES 	(  '" + uid + "', '" + total + "', '" + day + "', '" + text + "', 1, '-', 2, '" + oder + "', '" + payType + "', '" + chno + "', '" + date + "' ) "
                            mycon.execute(qq, (eee, rrr, fff) => {
                                var insertId = rrr.insertId
                                console.log(rrr.insertId);
                                if (!eee) {
                                    bd.bills.forEach(b => {
                                        var qqq = "UPDATE `mobile_pay` SET `status`=1,`mob_tot_id`='" + insertId + "' WHERE `idMobilePay`= " + b.idMobilePay;
                                        mycon.execute(qqq, (eeee, rrrr, ffff) => {
                                            if (!eeee) {

                                            } else {
                                                console.log(eeee);
                                            }
                                        });
                                    });
                                    res.send(rrr);
                                }
                            });
                        }
                    });
                }
            });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.totalBillByDate = (req, res, next) => {
    var uid = req.body.uid;
    var date = req.body.date;
    try {
        mycon.execute("SELECT mobile_tot.idMobTot,mobile_tot.user_id,mobile_tot.total,mobile_tot.date_time,mobile_tot.`no`,mobile_tot.`status`,mobile_tot.`comment`,mobile_tot.appcat,mobile_tot.oder,mobile_tot.payType,mobile_tot.chequeno,mobile_tot.recipt_date FROM mobile_tot WHERE mobile_tot.recipt_date='" + date + "' AND mobile_tot.user_id=" + uid,
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
