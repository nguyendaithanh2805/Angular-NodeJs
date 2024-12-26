const db = require("../config/db");

class OrderDetailRepository {
    async findAllAsync() {
        const [rows] = await db.query('SELECT * FROM tbl_order_detail');
        return rows;
    }
    
    async addAsync(orderDetail) {
        const [result] = await db.query('INSERT INTO tbl_order_detail (productId, orderId, discount, quantity, totalBill) VALUES (?, ?, ?, ?, ?)', 
            [orderDetail.productId, orderDetail.orderId, orderDetail.discount, orderDetail.quantity, orderDetail.totalBill]);
        console.log(`Saved OrderDetail successfully with ID : [${result.insertId}]`);
        return result.insertId;
    }

    async updateAsync(id, orderDetail) {
        await db.query('UPDATE tbl_order_detail SET productId = ?, orderId = ?, discount = ?, quantity = ?, totalBill = ? WHERE orderId = ?', 
            [orderDetail.productId, orderDetail.orderId, orderDetail.discount, orderDetail.quantity, orderDetail.totalBill, id]);
        console.log(`Updated OrderDetail successfully with ID : [${id}]`);
    }

    async deleteAsync(orderDetail) {
        await db.query('DELETE FROM tbl_order_detail WHERE orderId = ?', [orderDetail.orderId]);
        console.log(`Deleted OrderDetail successfully with ID : [${orderDetail.orderId}]`);
    }
}
module.exports = new OrderDetailRepository();