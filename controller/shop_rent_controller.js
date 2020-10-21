const db = require('../util/conn');

exports.getAllShop = (req, res, next) => {
    try {
        //==============
        var u = req.body.user;
        console.log(u);
        db.execute('SELECT * FROM sr_shop', (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
                res.status(500).send(error);
            }
        });

        //============================
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getAlloffice = (req, res, next) => {
    try {
        //=============
        db.execute(
            'SELECT office.office_name, office.idOffice FROM `office`',
            (error, rows, fildData) => {
                if (!error) {
                   res.status(rows);
                } else {
                    console.log(error);                  
                }
            });
        //============================
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}




//(office, එකෙන් filter වෙන්න ඕනේ )
exports.getAllBillding = (req, res, next) => {
    try {
        //==============
        var of = req.body.sr_building;
        console.log(of);
        db.execute(
            "SELECT sr_building.sr_building_name, sr_building.idsr_building FROM `sr_building` WHERE sr_building.sr_office_id = '" + of + "'",
            (error, rows, fildData) => {
                if (!error) {
                    // console.log(rows);
                    rows.forEach(ro => {
                        var sn = ro.sr_building_name;
                        console.log(sn);
                    });
                } else {
                    console.log(error);
                    res.status(500).send(error);
                }
            });
        //============================
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


//Buliding, එකෙන් filter වෙන්න ඕනේ )
exports.getAllfloor = (req, res, next) => {
    try {
        //==============
        var bui = req.body.floor;
        var y = req.body.xyz;

        console.log(y + '==========');
        console.log(req.body.xyz + '========== xyz');
        db.execute(
            "SELECT sr_flow.sr_flow_name, sr_flow.idsr_flow FROM `sr_flow` WHERE sr_flow.sr_building_idsr_building = '" + bui + "'",
            (error, rows, fildData) => {
                if (!error) {
                    console.log(rows);
                    res.send(rows);
                } else {
                    console.log(error);
                    res.status(500).send(error);
                }
            });
        //============================
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
