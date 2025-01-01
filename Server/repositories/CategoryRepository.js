const db = require("../config/db");

class CategoryRepository {
    async findAllAsync(limit, offset) {
        const [rows] = await db.query('SELECT * FROM tbl_category LIMIT ? OFFSET ?', [limit, offset]);
        return rows;
    }

    async findByIdAsync(id) {
        const [rows] = await db.query('SELECT * FROM tbl_category WHERE categoryId = ?', [id]);
        return rows[0];
    }

    async addAsync(category) {
        const [result] = await db.query('INSERT INTO tbl_category (name) VALUES (?)', [category.name]);
        console.log(`Saved category successfully with ID : [${result.insertId}]`);
        return result.insertId;
    }

    async updateAsync(id ,category) {
        await db.query('UPDATE tbl_category SET name = ? WHERE categoryId = ?', [category, id]);
        console.log(`Updated category successfully with ID : [${id}]`);
    }

    async deleteAsync(category) {
        await db.query('DELETE FROM tbl_category WHERE categoryId = ?', [category.categoryId]);
        console.log(`Deleted category successfully with ID : [${category.categoryId}]`);
    }

    async findTotalCategoryAsync() {
        const [rows] = await db.query('SELECT COUNT(*) as total FROM tbl_category');
        return rows[0].total;
    }

    async findByNameAsync(name) {
        const [rows] = await db.query('SELECT * FROM tbl_category WHERE name = ?', [name]);
        return rows[0];
    }
}
module.exports = new CategoryRepository();