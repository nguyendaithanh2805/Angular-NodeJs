const config = require('../config/jwt');
const jwt = require('jsonwebtoken');

class Authentication {
    async getTokenFromHeader(req) {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token)
           throw new Error('Access denied. No token provided.');
        return token;
    }

    async verifyToken(req, next) {
        const token = await this.getTokenFromHeader(req);
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;
        next();
    }
}
module.exports = new Authentication();