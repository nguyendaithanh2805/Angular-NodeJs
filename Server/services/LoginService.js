const userRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const bcrypt = require('bcrypt');

class LoginService {
    async login(username, password) {
        const user = await userRepository.findByNameAsync(username);
        if (user == null)
            throw new Error(`User with username [${username}] not found.`);
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new Error('Invalid username or password.');

        const token = jwt.sign(
            { userId: user.userId, roleId: user.roleId },
            config.secret,
            {expiresIn: config.expiresIn}
        );
        return {user, token};
    }
}
module.exports = new LoginService();