const productRepository = require("../repositories/ProductRepository");

class ProductService {
    async getAllProductAsync(page, limit) {
        const offset = (page - 1) * limit;
        return await productRepository.findAllAsync(limit, offset);
    }

    async getTotalProductAsync() {
        return await productRepository.findTotalProductAsync();
    }

    async getProductByIdAsync(id) {
        const product = await productRepository.findByIdAsync(id);
        if (product == null)
            throw new Error(`Product with id [${id}] not found.`);
        return product;
    }

    async addProductAsync(product) {
        const existingproduct = await productRepository.findByNameAsync(product.name);
        if (existingproduct)
            throw new Error(`Product with name [${product.name}] already exists!`);

        return await productRepository.addAsync(product);
    }

    async updateProductAsync(id, product) {
        let existingProduct = await this.getProductByIdAsync(id);
        existingProduct = await this.prepareProductForUpdate(product);
        await productRepository.updateAsync(id, existingProduct);
    }

    async deleteProductAsync(id) {
        const product = await this.getProductByIdAsync(id);
        await productRepository.deleteAsync(product);
    }

    async prepareProductForUpdate(product) {
        const name = product.name;
        const categoryId = product.categoryId;
        const description = product.description;
        const discount = product.discount;
        const image = product.image;
        const quantity = product.quantity;
        const sellingPrice = product.sellingPrice;
        return { name, categoryId, description, discount, image, quantity, sellingPrice };
    }
}
module.exports = new ProductService();