const cartRepository = require("../repositories/CartRepository");
const productRepository = require("../repositories/ProductRepository");

class CartService {
    async getAllCartAsync() {
        return await cartRepository.findAllAsync();
    }

    async getCartByIdAsync(id) {
        const cart = await cartRepository.findByIdAsync(id);
        if (cart == null)
            throw new Error(`Cart with id [${id}] not found.`);
        return cart;
    }

    async addCartAsync(cart) {
        return await cartRepository.addAsync(cart);
    }

    async updateCartAsync(id, cart) {
        let existingCart = await this.getCartByIdAsync(id);

        existingCart.userId = cart.userId;
        existingCart.productId = cart.productId;
        existingCart.quantity = cart.quantity;
        existingCart.totalBill = cart.totalBill;

        await cartRepository.updateAsync(id, existingCart);
    }

    async deleteCartAsync(id) {
        const cart = await this.getCartByIdAsync(id);
        await cartRepository.deleteAsync(cart);
    }

    async getCartByUserIdAsync(id) {
        const cart = await cartRepository.findByUserIdAsync(id);
        if (cart == null)
            throw new Error(`Cart with id [${id}] not found.`);
        return cart;
    }
}
module.exports = new CartService();