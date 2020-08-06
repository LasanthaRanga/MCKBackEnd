const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    console.log(req.headers);
    try {  
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, "secret")
        req.userData = decode;
        next();
    } catch (error) {
        // console.log(error);
        return res.status(401).json({
            mg: 'Auth Failed'
        });
    }
};  