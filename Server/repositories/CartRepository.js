const db = require("../config/db");

class CartRepository {
    async findAllAsync() {
        const [rows] = await db.query('SELECT * FROM tbl_cart');
        return rows;
    }

    async findByIdAsync(id) {
        const [rows] = await db.query('SELECT * FROM tbl_cart WHERE cartId = ?', [id]);
        return rows[0];
    }

    async addAsync(cart) {
        const [result] = await db.query('INSERT INTO tbl_cart (userId, productId, quantity, totalBill) VALUES (?, ?, ? , ?)', 
            [cart.userId, cart.productId, cart.quantity, cart.totalBill]);
        console.log(`Saved cart successfully with ID : [${result.insertId}]`);
        return result.insertId;
    }

    async updateAsync(id ,cart) {
        await db.query('UPDATE tbl_cart SET userId = ?, productId = ?, quantity = ?, totalBill = ? WHERE cartId = ?', 
            [cart.userId, cart.productId, cart.quantity, cart.totalBill, id]);
        console.log(`Updated cart successfully with ID : [${id}]`);
    }

    async deleteAsync(cart) {
        await db.query('DELETE FROM tbl_cart WHERE cartId = ?', [cart.cartId]);
        console.log(`Deleted cart successfully with ID : [${cart.cartId}]`);
    }

    async findTotalCartAsync() {
        const [rows] = await db.query('SELECT COUNT(*) as total FROM tbl_cart');
        return rows[0].total;
    }
}
module.exports = new CartRepository();