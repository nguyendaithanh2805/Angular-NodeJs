const userRepository = require('../repositories/UserRepository');

class UserService {
    async getAllUser(page, limit) {
        const offset = (page - 1) * limit;
        await userRepository.findAllAsync(limit, offset);
    }

    async getTotalUsers() {
        return await userRepository.findTotalUserAsync();
    }

    async getUserById(id) {
        const user = await userRepository.findByIdAsync(id);
        if (user === null)
            throw new Error(`User with ${id} not found`);
        return user;
    }

    async addUser(user) {
        const newUser = await this.prepareUser(user);
        return await userRepository.addAsync(newUser);
    }

    async updateUser(id) {
        const user = await userRepository.findByIdAsync(id);
        await userRepository.updateAsync(user);
    }

    async deleteUser(id) {
        const user = await userRepository.findByIdAsync(id);
        await userRepository.deleteAsync(user);
    }

    async prepareUser(user) {
        const username = user.username;
        const roleId = username.toUpperCase() === "ADMIN" ? 1 : 2;
        const password = user.password;
        return {roleId, username, password};
    }
}
module.exports = new UserService();