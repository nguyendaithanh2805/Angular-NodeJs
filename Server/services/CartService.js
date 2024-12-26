const cartRepository = require("../repositories/CartRepository");
const productRepository = require("../repositories/ProductRepository");
const orderDetailRepository = require("../repositories/OrderDetailRepository");

class CartService {
    async addCartAsync(cart) {
        const existingProduct = await cartRepository.findProductInCartByUserIdAndProductIdAsync(cart.userId, cart.productId);
        if (existingProduct) {
            await this.updateCartAsync(cart.productId, cart);
            return 0;
        } else {

            const product = await this.checkProduct(cart);

            cart.totalBill = cart.quantity * product.sellingPrice;
            return await cartRepository.addAsync(cart);
        }
    }

    async updateCartAsync(id, cart) {
        let existingCart = await cartRepository.findCartByProductId(id);
        existingCart.quantity = cart.quantity + existingCart.quantity;

        const product = await this.checkProduct(cart);

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

    async checkProduct(cart) {
        const product = await productRepository.findByIdAsync(cart.productId);
        if (!product)
            throw new Error(`Product with ID [${cart.productId}] not found.`);
        return product;
    }

    async processCartToOrder(userId, orderId) {
        const carts = await cartRepository.findByUserIdAsync(userId);

        for (const cart of carts) {
            const orderDetail = {
                orderId: orderId,
                productId: cart.productId,
                discount: cart.discount || 0,
                quantity: cart.quantity,
                totalBill: cart.totalBill
            };
            await orderDetailRepository.addAsync(orderDetail);

            await this.decreaseProductQuantity(cart);

            await cartRepository.deleteAsync(cart);
        }
    }

    async decreaseProductQuantity(cart) {
        const product = await productRepository.findByIdAsync(cart.productId);
        if (!product) throw new Error(`Product with ID [${cart.productId}] not found.`);
        if (product.quantity >= 0)
            product.quantity -= cart.quantity;
        await productRepository.updateAsync(cart.productId, product);
    }

}
module.exports = new CartService();