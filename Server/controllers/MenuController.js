const ApiResponse = require("../common/ApiResponse");
const productService = require("../services/ProductService");

class MenuController {
    async getAllProducts(req, res) {
        try {
            let page = parseInt(req.query.page) || 1;
            let limit = parseInt(req.query.limit) || 10;
            
            const products = await productService.getAllProductAsync(page, limit);
            const totalProducts = await productService.getTotalProductAsync();

            res.status(200).json(new ApiResponse(true, 'Products retrieved successfully', { products, totalProducts } ));
        } catch(error) {
            res.status(500).json({ message: 'Failed to retrieve products' });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await productService.getProductByIdAsync(req.params.id);
            res.status(200).json(new ApiResponse(true, `Product retrieved successfully with id ${product.productId}.`, product));
        } catch (error) {
            res.status(404).json({ messgae: error.message });
        }
    }
}
module.exports = new MenuController();