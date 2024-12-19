const ApiResponse = require("../common/ApiResponse");
const cartService = require("../services/CartService");

class CartController {

    async getCartByUserId(req, res) {
        try {
            const carts = await cartService.getCartByUserIdAsync(req.params.id);

            if (!carts || carts.length === 0) 
                return res.status(404).json(new ApiResponse(false, 'Không có sản phẩm nào trong giỏ hàng.', []));

            res.status(200).json(new ApiResponse(true, `Carts retrieved successfully with user id ${req.params.id}.`, carts));
        } catch (error) {
            res.status(404).json({ messgae: error.message });
        }
    }

    async addCart(req, res) {
        try {
            const cartId = await cartService.addCartAsync(req.body);
            res.status(201).json(new ApiResponse(true, 'Created cart succesfully', { cartId: cartId }));
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateCart(req, res) {
        try {
            await cartService.updateCartAsync(req.params.id, req.body);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteCart(req, res) {
        try {
            await cartService.deleteCartAsync(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}
module.exports = new CartController();