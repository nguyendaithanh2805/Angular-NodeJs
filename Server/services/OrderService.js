const orderRepository = require("../repositories/OrderRepository");
const currentDateTime = require("../common/CurrentDateTime");
class OrderService {
    async getAllOrderAsync() {
        return await orderRepository.findAllAsync();
    }

    async getOrderByIdAsync(id) {
        const order = await orderRepository.findByIdAsync(id);
        if (order == null)
            throw new Error(`Order with id [${id}] not found.`);
        return order;
    }

    async addOrderAsync(order) {
        order.orderDate = await currentDateTime.getCurrentDateTime();
        order.deliveryDate = await currentDateTime.getDeliveryDate(order.orderDate);
        order.status = 0;
        return await orderRepository.addAsync(order);
    }

    async updateOrderAsync(id, status) {
        let existingOrder = await this.getOrderByIdAsync(id);     
        existingOrder.status = status;
        await orderRepository.updateAsync(id, existingOrder);
    }

    async deleteOrderAsync(id) {
        const order = await this.getOrderByIdAsync(id);
        await orderRepository.deleteAsync(order);
    }
}
module.exports = new OrderService();