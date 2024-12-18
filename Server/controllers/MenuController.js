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
}
module.exports = new MenuController();