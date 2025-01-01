const userRepository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');

class UserService {
    async getAllUsersAsync(page, limit) {
        const offset = (page - 1) * limit;
        return await userRepository.findAllAsync(limit, offset);
    }

    async getTotalUsersAsync() {
        return await userRepository.findTotalUserAsync();
    }

    async getUserByIdAsync(id) {
        const user = await userRepository.findByIdAsync(id);
        if (user == null)
            throw new Error(`User with id [${id}] not found.`);
        return user;
    }

    async addUserAsync(user) {
        const existingUser = await userRepository.findByNameAsync(user.username);
        if (existingUser)
            throw new Error(`User with username [${user.username}] already exists!`);

        const newUser = await this.prepareUser(user);
        return await userRepository.addAsync(newUser);
    }

    async updateUserAsync(id, user) {
        let existingUser = await this.getUserByIdAsync(id);
        existingUser = await this.updateUser(user);
        await userRepository.updateAsync(id, existingUser);
    }

    async deleteUserAsync(id) {
        const user = await this.getUserByIdAsync(id);
        await userRepository.deleteAsync(user);
    }

    async prepareUser(user) {
        const username = user.username;
        const roleId = username.toUpperCase() === "ADMIN" ? 1 : 2;
        const password = await bcrypt.hash(user.password, 10);
        return {roleId, username, password};
    }

    async updateUser(user) {
        const username = user.username;
        const roleId = user.roleId;
        const password = await bcrypt.hash(user.password, 10);
        return {roleId, username, password};
    }
}
module.exports = new UserService();