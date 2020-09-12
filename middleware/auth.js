const jwt = require('jsonwebtoken');
const config = require('config');

const auth = ( req, res, next ) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'Token not found, unAuthorized'})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next()
    } catch (err) {
        console.log(err);
    }
}

module.exports = auth