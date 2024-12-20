const orderRepository = require("../repositories/OrderRepository");

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
        return await orderRepository.addAsync(order);
    }

    async updateOrderAsync(id, order) {
        let existingOrder = await this.getOrderByIdAsync(id);
        existingOrder.name = order.name;
        existingOrder.paymentMethod = order.paymentMethod;
        existingOrder.userId = order.userId;
        existingOrder.orderDate =  order.orderDate;
        existingOrder.deliveryDate = order.deliveryDate;
        existingOrder.status = order.status;
        existingOrder.address = order.address;
        await orderRepository.updateAsync(id, existingOrder);
    }

    async deleteOrderAsync(id) {
        const order = await this.getOrderByIdAsync(id);
        await orderRepository.deleteAsync(order);
    }
}
module.exports = new OrderService();