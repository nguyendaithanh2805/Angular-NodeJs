const ApiResponse = require("../common/ApiResponse");
const orderService = require("../services/orderService");

class OrderController {
    async getAllOrders(req, res) {
        try {
            const orders = await orderService.getAllOrderAsync();
            res.status(200).json(new ApiResponse(true, 'Orders retrieved successfully', orders ));
        } catch(error) {
            res.status(500).json({ message: 'Failed to retrieve Orders' });
        }
    }

    async getOrderById(req, res) {
        try {
            const order = await orderService.getOrderByIdAsync(req.params.id);
            res.status(200).json(new ApiResponse(true, `Order retrieved successfully with id ${order.orderId}.`, order));
        } catch (error) {
            res.status(404).json({ messgae: error.message });
        }
    }

    async addOrder(req, res) {
        try {
            const orderId = await orderService.addOrderAsync(req.body);
            res.status(201).json(new ApiResponse(true, 'Created order succesfully', { orderId: orderId }));
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateOrder(req, res) {
        try {
            await orderService.updateOrderAsync(req.params.id, req.body);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteOrder(req, res) {
        try {
            await orderService.deleteOrderAsync(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}
module.exports = new OrderController();