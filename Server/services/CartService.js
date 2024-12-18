const cartRepository = require("../repositories/CartRepository");

class CartService {
    async addCartAsync(cart) {
        return await cartRepository.addAsync(cart);
    }

    async updateCartAsync(id, cart) {
        let existingCart = await this.getCartByUserIdAsync(id);

        existingCart.userId = cart.userId;
        existingCart.productId = cart.productId;
        existingCart.quantity = cart.quantity;
        existingCart.totalBill = cart.totalBill;

        await cartRepository.updateAsync(id, existingCart);
    }

    async deleteCartAsync(id) {
        const cart = await this.getCartByUserIdAsync(id);
        await cartRepository.deleteAsync(cart);
    }

    async getCartByUserIdAsync(id) {
        const cart = await cartRepository.findByUserIdAsync(id);
        if (cart == null)
            throw new Error(`Cart with user id [${id}] not found.`);
        return cart;
    }
}
module.exports = new CartService();