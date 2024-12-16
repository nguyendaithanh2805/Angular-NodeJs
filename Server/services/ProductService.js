const productRepository = require("../repositories/ProductRepository");
const categoryRepository = require("../services/CategoryService");
const imageMiddleware = require('../middlewares/HandleImage'); 

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

    async addProductAsync(product, file) {
        const existingproduct = await productRepository.findByNameAsync(product.name);
        if (existingproduct)
            throw new Error(`Product with name [${product.name}] already exists!`);

        await this.checkExistsCategory(product);

        const preparedProduct = await this.prepareProductData(product, file);
        return await productRepository.addAsync(preparedProduct);
    }

    async updateProductAsync(id, product, file) {
        let existingProduct = await this.getProductByIdAsync(id);

        if (file && existingProduct.image)
            imageMiddleware.deleteImage(existingProduct.image);

        await this.checkExistsCategory(product);

        const preparedProduct = await this.prepareProductData(product, file);
        await productRepository.updateAsync(id, preparedProduct);
    }

    async deleteProductAsync(id) {
        const product = await this.getProductByIdAsync(id);
        await productRepository.deleteAsync(product);
    }

    async prepareProductData(product, file) {
        const name = product.name;
        const categoryId = product.categoryId;
        const description = product.description;
        const discount = product.discount;
        const image = file.filename;
        const quantity = product.quantity;
        const sellingPrice = product.sellingPrice - (product.sellingPrice * (discount/100));
        return { name, categoryId, description, discount, image, quantity, sellingPrice };
    }

    async checkExistsCategory(product) {
        await categoryRepository.getCategoryByIdAsync(product.categoryId);
    }
}
module.exports = new ProductService();