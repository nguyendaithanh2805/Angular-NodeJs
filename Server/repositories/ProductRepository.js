const db = require("../config/db");

class ProductRepository {
    async findAllAsync(limit, offset) {
        const [rows] = await db.query('SELECT * FROM tbl_product LIMIT ? OFFSET ?', [limit, offset]);
        return rows;
    }

    async findByIdAsync(id) {
        const [rows] = await db.query('SELECT * FROM tbl_product WHERE productId = ?', [id]);
        return rows[0];
    }

    async addAsync(product) {
        const [result] = await db.query('INSERT INTO tbl_product (categoryId, name, description, discount, image, quantity, sellingPrice) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [   
                product.categoryId, product.name, product.description,
                product.discount, product.image, product.quantity, product.sellingPrice
            ]);
            
        console.log(`Saved product successfully with ID : [${result.insertId}]`);
        return result.insertId;
    }

    async updateAsync(id, product) {
        await db.query('UPDATE tbl_product SET categoryId = ?, name = ?, description = ?, discount = ?, image = ?, quantity = ?, sellingPrice = ? WHERE productId = ?', 
            [   
                product.categoryId, product.name, product.description,
                product.discount, product.image, product.quantity, product.sellingPrice, id
            ]);
        console.log(`Updated product successfully with ID : [${id}]`);
    }

    async deleteAsync(product) {
        await db.query('DELETE FROM tbl_product WHERE productId = ?', [product.productId]);
        console.log(`Deleted product successfully with ID : [${product.productId}]`);
    }

    async findTotalProductAsync() {
        const [rows] = await db.query('SELECT COUNT(*) as total FROM tbl_product');
        return rows[0].total;
    }

    async findByNameAsync(name) {
        const [rows] = await db.query('SELECT * FROM tbl_product WHERE name = ?', [name]);
        return rows[0];
    }
}
module.exports = new ProductRepository();