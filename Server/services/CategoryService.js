const categoryRepository = require("../repositories/CategoryRepository");

class CategoryService {
    async getAllCategoryAsync(page, limit) {
        const offset = (page - 1) * limit;
        return await categoryRepository.findAllAsync(limit, offset);
    }

    async getTotalCategoryAsync() {
        return await categoryRepository.findTotalCategoryAsync();
    }

    async getCategoryByIdAsync(id) {
        const category = await categoryRepository.findByIdAsync(id);
        if (category == null)
            throw new Error(`Category with id [${id}] not found.`);
        return category;
    }

    async addCategoryAsync(category) {
        const existingCategory = await categoryRepository.findByNameAsync(category.name);
        if (existingCategory)
            throw new Error(`Category with name [${category.name}] already exists!`);

        return await categoryRepository.addAsync(category);
    }

    async updateCategoryAsync(id, category) {
        let existingCategory = await this.getCategoryByIdAsync(id);
        existingCategory = category.name;
        await categoryRepository.updateAsync(id, existingCategory);
    }

    async deleteCategoryAsync(id) {
        const category = await this.getCategoryByIdAsync(id);
        await categoryRepository.deleteAsync(category);
    }
}
module.exports = new CategoryService();