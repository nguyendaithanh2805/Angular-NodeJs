const loginService = require('../services/LoginService');
const ApiResponse = require('../common/ApiResponse');

class LoginController {
    async login(req, res){
        try {
            const {username, password} = req.body;
            const result = await loginService.login(username, password);
            res.status(200).json(new ApiResponse(
                true, 
                'Login successfully',
                {
                    user: {
                        userId: result.user.userId,
                        roleId: result.user.roleId,
                        username: result.user.username
                    },
                    token: result.token
                }
            ));
        } catch (error) {
            if (error.message.includes('Invalid'))
                return res.status(401).json({ message: error.message });
            return res.status(404).json({ message: error.message });
        }
    }
}
module.exports = new LoginController();