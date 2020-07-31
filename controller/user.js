const mycon = require('../util/conn');
const jwt = require('jsonwebtoken');

exports.getAllusers = (req, res, next) => {
    console.log(req.header);

    try {
        mycon.execute("select * from user",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.login = (req, res, next) => {
    try {
        mycon.execute("SELECT `user`.idUser,`user`.user_full_name,`user`.user_nic,`user`.user_syn,`user`.user_username," +
            "  `user`.user_password,`user`.user_level,`user`.office_idOffice,`user`.user_name_sinhala,`user`.mobile_no," +
            "   `user`.user_status,approval_cat.approval_name,approval_cat.idApproval_cat " +
            "   FROM `user` LEFT JOIN user_has_approval_cat ON user_has_approval_cat.User_idUser=`user`.idUser " +
            "   LEFT JOIN approval_cat ON user_has_approval_cat.Approval_cat_idApproval_cat=approval_cat.idApproval_cat " +
            "   WHERE `user`.user_username='" + req.body.uname + "'",
            (error, rows, fildData) => {
                if (!error) {
                    if (rows[0] != null) {
                        console.log(rows[0]);
                        if (rows[0].user_password == req.body.pword) {
                            console.log('equal');

                            let obj = {
                                uid: rows[0].idUser,
                                fname: rows[0].user_full_name,
                                nic: rows[0].user_nic,
                                uname: rows[0].user_username,
                                office: rows[0].office_idOffice,
                                unames: rows[0].user_name_sinhala,
                                mobile: rows[0].mobile_no,
                                appCatId: rows[0].idApproval_cat,
                                appCatName: rows[0].approval_name
                            };

                            const token = jwt.sign(obj, process.env.JWT_KEY, { expiresIn: "1h" });
                            return res.status(200).json({
                                message: "Auth Successfull",
                                token: token
                            });
                        } else {
                            return res.status(401).json({ message: 'user name or password is wrong' });
                        }
                    } else {
                        return res.status(401).json({ message: 'user name or password is wrong' });
                    }
                } else {
                    return res.status(401).json({ message: 'user name or password is wrong' });
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

