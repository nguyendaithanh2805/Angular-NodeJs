const db = require('../config/db');

class UserRepository {
    async findAllAsync(limit, offset) {
        const [rows] = await db.query('SELECT * FROM tbl_user LIMIT ? OFFSET ?', [limit, offset]);
        return rows;
    }

    async findByIdAsync(id) {
        const [rows] = await db.query('SELECT * FROM tbl_user WHERE userId = ?', [id]);
        return rows[0];
    }

    async findByNameAsync(username) {
        const [rows] = await db.query('SELECT * FROM tbl_user WHERE username = ?', [username]);
        return rows[0];
    }

    async addAsync(user) {
        const [result] = await db.query('INSERT INTO tbl_user (roleId, username, password) VALUES (?, ?, ?)', [user.roleId, user.username, user.password]);
        console.log(`Saved user successfully with userId : [${result.insertId}]`);
        return result.insertId;
    }

    async updateAsync(user) {
        await db.query('UPDATE tbl_user SET roleId = ?, username = ?, password = ? WHERE userId = ?', [user.roleId, user.username, user.password, user.userId]);
        console.log(`Updated user successfully with userId : [${user.userId}]`);
    }

    async deleteAsync(user) {
        await db.query('DELETE FROM tbl_user WHERE userId = ?', [user.userId]);
        console.log(`Deleted user successfully with userId : [${user.userId}]`);
    }

    async findTotalUserAsync() {
        const [rows] = await db.query('SELECT COUNT(*) as total FROM tbl_user');
        return rows[0].total;
    }
}
module.exports = new UserRepository();