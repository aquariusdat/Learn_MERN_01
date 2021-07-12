const jwt = require('jsonwebtoken');

// Authorization 'Bearer jk1h23jh12k3jh1jk23hjk'

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    console.log(`${token}`);
    if (!token) return res.status(401).json({ isSuccess: false, msg: `Access token not found.` });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userID = decoded.userID;
        req.username = decoded.username;

        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ isSuccess: false, msg: `Invalid token.` });
    }

}

module.exports = verifyToken;