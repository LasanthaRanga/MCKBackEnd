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
                    res.send(rows);
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

        db.execute(
            "SELECT sr_building.sr_building_name, sr_building.idsr_building FROM `sr_building` WHERE sr_building.sr_office_id = '" + req.body.office + "'",
            (error, rows, fildData) => {
                if (!error) {
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


//Buliding, එකෙන් filter වෙන්න ඕනේ )
exports.getAllfloor = (req, res, next) => {
    try {
        db.execute(
            "SELECT sr_flow.sr_flow_name, sr_flow.idsr_flow FROM `sr_flow` WHERE sr_flow.sr_building_idsr_building = '" + req.body.bid + "'",
            (error, rows, fildData) => {
                if (!error) {
                    console.log(rows);
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


exports.getShops = (req, res, next) => {
    try {
        db.execute(
            "SELECT CONCAT(customer.cus_name,' | ',customer.cus_nic,' | ',sr_shop_now.sr_shop_now_category) AS cusFull,sr_building.sr_building_name,sr_flow.sr_flow_name,sr_shop_type.sr_shop_type_name,customer.cus_nic,customer.cus_name,customer.cus_mobile,sr_shop_now.sr_shop_now_category_id,sr_shop_now.sr_shop_now_category,sr_status.sr_status,sr_shop.sub_office_id,sr_shop_values.sr_shop_value_rental,sr_shop.idsr_shop,sr_shop.sr_shop_no FROM sr_shop_now INNER JOIN sr_shop ON sr_shop_now.sr_shop_id=sr_shop.idsr_shop INNER JOIN sr_shop_type ON sr_shop.sr_shop_type_idsr_shop_type=sr_shop_type.idsr_shop_type INNER JOIN sr_building ON sr_shop.sr_building_idsr_building=sr_building.idsr_building INNER JOIN sr_flow ON sr_flow.sr_building_idsr_building=sr_building.idsr_building AND sr_shop.sr_flow_idsr_flow=sr_flow.idsr_flow INNER JOIN sr_status ON sr_shop_now.sr_shop_now_status=sr_status.sr_status_id INNER JOIN sr_shop_has_value ON sr_shop_has_value.value_shop_id=sr_shop_now.sr_shop_now_category_id INNER JOIN sr_shop_values ON sr_shop_has_value.value_id=sr_shop_values.sr_shop_value_id INNER JOIN customer ON sr_shop_now.sr_shop_cus_id=customer.idCustomer "
            + " WHERE sr_shop_has_value.value_status='1' AND sr_shop.sr_flow_idsr_flow='" + req.body.fid + "' AND sr_shop_now.sr_shop_now_category LIKE '%" + req.body.shop + "%'",
            (error, rows, fildData) => {
                if (!error) {
                    console.log(rows);
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

exports.getShopInfo = (req, res, next) => {
    try {
        db.execute(
            "SELECT CONCAT(customer.cus_name,' | ',customer.cus_nic,' | ',sr_shop_now.sr_shop_now_category) AS cusFull,sr_building.sr_building_name,sr_flow.sr_flow_name,sr_shop_type.sr_shop_type_name,customer.cus_nic,customer.cus_name,customer.cus_mobile,sr_shop_now.sr_shop_now_category_id,sr_shop_now.sr_shop_now_category,sr_status.sr_status,sr_shop.sub_office_id,sr_shop_values.sr_shop_value_rental,sr_shop.idsr_shop,sr_shop.sr_shop_no FROM sr_shop_now INNER JOIN sr_shop ON sr_shop_now.sr_shop_id=sr_shop.idsr_shop INNER JOIN sr_shop_type ON sr_shop.sr_shop_type_idsr_shop_type=sr_shop_type.idsr_shop_type INNER JOIN sr_building ON sr_shop.sr_building_idsr_building=sr_building.idsr_building INNER JOIN sr_flow ON sr_flow.sr_building_idsr_building=sr_building.idsr_building AND sr_shop.sr_flow_idsr_flow=sr_flow.idsr_flow INNER JOIN sr_status ON sr_shop_now.sr_shop_now_status=sr_status.sr_status_id INNER JOIN sr_shop_has_value ON sr_shop_has_value.value_shop_id=sr_shop_now.sr_shop_now_category_id INNER JOIN sr_shop_values ON sr_shop_has_value.value_id=sr_shop_values.sr_shop_value_id INNER JOIN customer ON sr_shop_now.sr_shop_cus_id=customer.idCustomer "
            + " WHERE sr_shop_has_value.value_status='1' AND sr_shop_now.sr_shop_now_category_id = '" + req.body.sid + "'",
            (error, rows, fildData) => {
                if (!error) {
                    console.log(rows);
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


exports.getPayInfo = (req, res, next) => {
    try {
        db.execute(
            "SELECT sr_pay_view2.sr_shop_proc_year, sr_pay_view2.`month`, sr_pay_view2.LYFB, sr_pay_view2.sr_shop_last_year_arrears_bal, sr_pay_view2.FB, sr_pay_view2.sr_shop_arrears_bal, sr_pay_view2.sr_shop_rental_tot_bal, sr_pay_view2.SE_Charge, sr_pay_view2.sr_shop_proc_id, sr_pay_view2.sr_shop_proc_month, Round( sr_pay_view2.LYFB + sr_pay_view2.sr_shop_last_year_arrears_bal + sr_pay_view2.FB + sr_pay_view2.sr_shop_arrears_bal + sr_pay_view2.sr_shop_rental_tot_bal + sr_pay_view2.SE_Charge, 2 ) AS tot FROM `sr_pay_view2` "
            + " WHERE sr_pay_view2.sr_shop_shop_id = '" + req.body.sid + "' ORDER BY sr_pay_view2.sr_shop_proc_id ASC",
            (error, rows, fildData) => {
                if (!error) {
                    console.log(rows);
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
