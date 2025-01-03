const ApiResponse = require("../common/ApiResponse");
const productService = require("../services/ProductService");
const imageMiddleware = require("../middlewares/HandleImage");

class ProductController {
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

    async addProduct(req, res) {
        try {
            const productId = await productService.addProductAsync(req.body, req.file);

            res.status(201).json(new ApiResponse(true, 'Created product succesfully', { productId: productId }));
        } catch (error) {
            if (req.file) {
                imageMiddleware.deleteImage(req.file.filename);
            }
            res.status(400).json({ message: error.message });
        }
    }

    async updateproduct(req, res) {
        try {
            await productService.updateProductAsync(req.params.id, req.body, req.file);
            res.status(204).send();
        } catch (error) {
            if (req.file) {
                imageMiddleware.deleteImage(req.file.filename);
            }
            res.status(404).json({ message: error.message });
        }
    }

    async deleteproduct(req, res) {
        try {
            await productService.deleteProductAsync(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}
module.exports = new ProductController();