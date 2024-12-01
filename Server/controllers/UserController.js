const userService = require('../services/UserService');
const ApiResponse = require('../common/ApiResponse');

class UserController {
    async getAllUsers(req, res) {
        try {
            let page = parseInt(req.body.page) || 1;
            let limit = parseInt(req.body.limit) || 10;
            
            const users = await userService.getAllUsersAsync(page, limit);
            const totalUsers = await userService.getTotalUsersAsync();

            res.status(200).json(new ApiResponse(true, 'Users retrieved successfully', { users, totalUsers} ));
        } catch(error) {
            res.status(500).json({ message: 'Failed to retrieve users' });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserByIdAsync(req.params.id);
            res.status(200).json(new ApiResponse(true, `User retrieved successfully with id ${user.userId}.`, user));
        } catch (error) {
            res.status(404).json({ messgae: error.message });
        }
    }

    async addUser(req, res) {
        try {
            const userId = await userService.addUserAsync(req.body);
            res.status(201).json(new ApiResponse(true, 'Created user succesfully', { userId: userId }));
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            await userService.updateUserAsync(req.params.id, req.body);
            res.status(204).send('User updated successfully.');
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteUserAsync(req, res) {
        try {
            await userService.deleteUserAsync(req.params.id);
            res.status(204).send('User deleted successfully.');
        } catch {
            res.status(404).json({ message: error.message });
        }
    }
}