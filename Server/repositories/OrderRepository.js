const db = require("../config/db");

class OrderRepository {
    async findAllAsync() {
        const [rows] = await db.query('SELECT *,  od.quantity AS order_quantity FROM tbl_order_detail od INNER JOIN tbl_order o ON od.orderId = o.orderId INNER JOIN tbl_product p ON od.productId = p.productId');
        return rows;
    }

    async findByIdAsync(id) {
        const [rows] = await db.query('SELECT * FROM tbl_order WHERE orderId = ?', [id]);
        return rows[0];
    }

    async addAsync(order) {
        const [result] = await db.query('INSERT INTO tbl_order (paymentMethod, userId, orderDate, deliveryDate, status, address) VALUES (?, ?, ?, ?, ?, ?)', 
            [order.paymentMethod, order.userId, order.orderDate, order.deliveryDate, order.status, order.address]);
        console.log(`Saved order successfully with ID : [${result.insertId}]`);
        return result.insertId;
    }

    async updateAsync(id, order) {
        await db.query('UPDATE tbl_order SET status = ? WHERE orderId = ? AND userId = ?', 
            [order.status, id, order.userId]);
        console.log(`Updated order successfully with ID : [${id}]`);
    }

    async deleteAsync(order) {
        await db.query('DELETE FROM tbl_order WHERE orderId = ?', [order.orderId]);
        console.log(`Deleted order successfully with ID : [${order.orderId}]`);
    }
}
module.exports = new OrderRepository();