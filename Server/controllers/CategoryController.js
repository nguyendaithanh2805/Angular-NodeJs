const ApiResponse = require("../common/ApiResponse");
const categoryService = require("../services/CategoryService");

class CategoryController {
    async getAllCategories(req, res) {
        try {
            let page = parseInt(req.query.page) || 1;
            let limit = parseInt(req.query.limit) || 10;
            
            const categories = await categoryService.getAllCategoryAsync(page, limit);
            const totalCategories = await categoryService.getTotalCategoryAsync();

            res.status(200).json(new ApiResponse(true, 'Categories retrieved successfully', { categories, totalCategories } ));
        } catch(error) {
            res.status(500).json({ message: 'Failed to retrieve Categories' });
        }
    }

    async getCategoryById(req, res) {
        try {
            const category = await categoryService.getCategoryByIdAsync(req.params.id);
            res.status(200).json(new ApiResponse(true, `Category retrieved successfully with id ${category.categoryId}.`, category));
        } catch (error) {
            res.status(404).json({ messgae: error.message });
        }
    }

    async addCategory(req, res) {
        try {
            const categoryId = await categoryService.addCategoryAsync(req.body);
            res.status(201).json(new ApiResponse(true, 'Created category succesfully', { categoryId: categoryId }));
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateCategory(req, res) {
        try {
            await categoryService.updateCategoryAsync(req.params.id, req.body);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            await categoryService.deleteCategoryAsync(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}
module.exports = new CategoryController();