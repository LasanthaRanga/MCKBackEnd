const db = require('../util/conn');

exports.getArrears = (req, res, next) => {
    let id = req.body.id;
    let year = req.body.year;
    console.log(year);
    let query = "SELECT \
    ass_qstart.idass_Qstart, \
        ass_qstart.ass_Qstart_QuaterNumber, \
        ass_qstart.ass_Qstart_process_date, \
        ass_qstart.ass_Qstart_LYC_Arreas, \
        ass_qstart.ass_Qstart_LYC_Warrant, \
        ass_qstart.ass_Qstart_LQC_Arreas, \
        ass_qstart.ass_Qstart_LQC_Warrant, \
        ass_qstart.ass_Qstart_HaveToQPay, \
        ass_qstart.ass_Qstart_status, \
        ass_qstart.Assessment_idAssessment, \
        ass_qstart.ass_Qstart_year \
    FROM \
    ass_qstart \
    WHERE \
    ass_qstart.Assessment_idAssessment = "+ id + " AND \
    ass_qstart.ass_Qstart_year = " + year;

    let obj = {
        lya: 0,
        lyw: 0,
        tya: 0,
        tyw: 0,
        qpay: 0,
        tot: 0

    }

    db.execute(query,
        (error, rows, fildData) => {
            if (!error) {
                rows.forEach(el => {
                    if (el.ass_Qstart_status == 1) {
                        obj.lya = el.ass_Qstart_LYC_Arreas;
                        obj.lyw = el.ass_Qstart_LYC_Warrant;
                        obj.qpay = el.ass_Qstart_HaveToQPay;
                        obj.tya += el.ass_Qstart_LQC_Arreas;
                        obj.tyw += el.ass_Qstart_LQC_Warrant;
                    } else {
                        obj.tya += el.ass_Qstart_LQC_Arreas;
                        obj.tyw += el.ass_Qstart_LQC_Warrant;
                    }
                });

                obj.tot = obj.lyw + obj.lya + obj.tya + obj.tyw + obj.qpay;
                obj.tya = obj.tya.toFixed(2);
                obj.tyw = obj.tyw.toFixed(2);
                obj.lya = obj.lya.toFixed(2);
                obj.lyw = obj.lyw.toFixed(2);
                obj.qpay = obj.qpay.toFixed(2);
                obj.tot = obj.tot.toFixed(2);
                res.send(obj);
            } else {
                console.log("error message");
                console.log(error.message);
            }
        });
}



exports.getDetails = (req, res, nex) => {
    let id = req.body.id;
    let query = "SELECT \
	assessment.idAssessment, \
	assessment.assessment_no, \
	street.street_name, \
	ward.ward_name, \
	customer.cus_name, \
	customer.cus_nic, \
	person_title.title_name, \
	ass_allocation.ass_allocation, \
	ass_nature.ass_nature_name, \
	ass_nature.ass_nature_year_rate, \
	ass_nature.ass_nature_warrant_rate, \
	ass_discription.ass_discription  \
FROM \
	assessment \
	INNER JOIN street ON assessment.Street_idStreet = street.idStreet \
	INNER JOIN ward ON assessment.Ward_idWard = ward.idWard \
	AND street.Ward_idWard = ward.idWard \
	INNER JOIN customer ON assessment.Customer_idCustomer = customer.idCustomer \
	LEFT JOIN person_title ON person_title.title_id = customer.cus_person_title \
	INNER JOIN ass_allocation ON ass_allocation.Assessment_idAssessment = assessment.idAssessment \
	INNER JOIN ass_nature ON assessment.ass_nature_idass_nature = ass_nature.idass_nature \
	INNER JOIN ass_discription ON assessment.ass_discription_idass_discription = ass_discription.idass_discription \
WHERE \
	assessment.idAssessment = "+ id + " \
	AND ass_allocation.ass_allocation_status = 1 \
	AND assessment.assessment_syn = 0"

    db.execute(query,
        (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log("error message");
                console.log(error.message);
            }
        });
}


exports.getWardList = (req, res, next) => {
    try {
        db.execute('SELECT ward.idWard,ward.ward_no,ward.ward_name FROM ward', (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
               // res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getStreetList = (req, res, next) => {
    try {
        db.execute('SELECT street.idStreet,street.street_name FROM street WHERE street.Ward_idWard= ' + req.body.id, (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
               // res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.searchAssessment = (req, res, next) => {
    try {
        db.execute("SELECT customer.cus_name,assessment.assessment_no,ass_nature.ass_nature_name,ass_discription.ass_discription, assessment.idAssessment, " +
            " assessment.Street_idStreet FROM assessment INNER JOIN customer ON assessment.Customer_idCustomer=customer.idCustomer  " +
            " INNER JOIN ass_nature ON assessment.ass_nature_idass_nature=ass_nature.idass_nature  " +
            " INNER JOIN ass_discription ON assessment.ass_discription_idass_discription=ass_discription.idass_discription " +
            " WHERE assessment.assessment_syn=0 AND assessment.Ward_idWard= '" + req.body.ward + "' " +
            " AND assessment.Street_idStreet= '" + req.body.street + "' " +
            " AND assessment.assessment_no LIKE '%" + req.body.assno + "%' ", (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                 //   res.status(500).send(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}



exports.xxxx = (req, res, next) => {
    try {
        db.execute('', (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
               // res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}