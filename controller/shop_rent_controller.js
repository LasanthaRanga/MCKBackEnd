const db = require('../util/conn');

exports.getAllShop = (req, res, next) => {
    try {
        db.execute('SELECT * FROM sr_shop', (error, rows, fildData) => {
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
