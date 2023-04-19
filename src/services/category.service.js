const { Category } = require('../models');

const insertCategory = async (name) => {
    if (!name) {
        return { type: 'error', message: '"name" is required' }; 
    }
    const insertedCategory = await Category.create({ name });
    return insertedCategory.dataValues;
};

const getAllCategories = async () => {
    const allCategories = await Category.findAll();
    return { type: null, message: allCategories };
};

module.exports = {
    insertCategory,
    getAllCategories,
}; 