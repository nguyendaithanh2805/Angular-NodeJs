const cartRepository = require("../repositories/CartRepository");
const productRepository = require("../repositories/ProductRepository");

class CartService {
    async addCartAsync(cart) {
        const existingProduct = await cartRepository.findProductyByIdInCartAsync(cart.productId);
        if (existingProduct) {
            await this.updateCartAsync(cart.productId, cart);
        } else {
            return await cartRepository.addAsync(cart);
        }
    }

    async updateCartAsync(id, cart) {
        let existingCart = await cartRepository.findCartByProductId(id);
        existingCart.quantity = cart.quantity + existingCart.quantity;

        const product = await productRepository.findByIdAsync(cart.productId);
        if (!product)
            throw new Error(`Product with ID [${cart.productId}] not found.`);

        existingCart.totalBill = existingCart.quantity * product.sellingPrice;
        await cartRepository.updateAsync(existingCart);
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