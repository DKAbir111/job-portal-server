const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access denied. No token provided.');
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) return res.status(401).send('Access denied. Invalid token.');

        next();

    })

}

module.exports = { verifyToken };