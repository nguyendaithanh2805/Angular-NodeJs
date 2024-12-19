const db = require("../config/db");

class CartRepository {
    async findByIdAsync(id) {
        const [rows] = await db.query('SELECT * FROM tbl_cart WHERE cartId = ?', [id]);
        return rows[0];
    }

    async findByUserIdAsync(id) {
        const [rows] = await db.query('SELECT * FROM tbl_cart WHERE userId = ?', [id]);
        return rows;
    }

    async addAsync(cart) {
        const [result] = await db.query('INSERT INTO tbl_cart (userId, productId, quantity, totalBill) VALUES (?, ?, ? , ?)', 
            [cart.userId, cart.productId, cart.quantity, cart.totalBill]);
        console.log(`Saved cart successfully with ID : [${result.insertId}]`);
        return result.insertId;
    }

    async updateAsync(cart) {
        await db.query('UPDATE tbl_cart SET userId = ?, productId = ?, quantity = ?, totalBill = ? WHERE cartId = ?', 
            [cart.userId, cart.productId, cart.quantity, cart.totalBill, cart.cartId]);
        console.log(`Updated cart successfully with ID : [${cart.cartId}]`);
    }

    async deleteAsync(cart) {
        await db.query('DELETE FROM tbl_cart WHERE cartId = ?', [cart.cartId]);
        console.log(`Deleted cart successfully with ID : [${cart.cartId}]`);
    }

    async findCartByProductId(id) {
        const [rows] = await db.query('SELECT * FROM tbl_cart WHERE productId = ?', [id]);
        return rows[0];
    }

    async findProductyByIdInCartAsync(productId) {
        const [rows] = await db.query('SELECT * FROM tbl_cart c JOIN tbl_product p ON c.productId = p.productId WHERE c.productId = ?', [productId]);
        return rows[0];
    }
}
module.exports = new CartRepository();