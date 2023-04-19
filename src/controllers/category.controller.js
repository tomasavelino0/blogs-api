const categoryServices = require('../services/category.service');

const insertCategoryDb = async (req, res) => {
    const { name } = req.body;
    const inserted = await categoryServices.insertCategory(name);
    if (inserted.type === 'error') {
        return res.status(400).json({ message: inserted.message });
    }
    return res.status(201).json(inserted);
};

const getAllCategoriesDb = async (req, res) => {
    const allcategoriesDb = await categoryServices.getAllCategories();
    if (!allcategoriesDb.type) {
        return res.status(200).json(allcategoriesDb.message);
    }
    return res.status(500).json({ message: 'Ops algo deu errado' });
};

module.exports = {
    insertCategoryDb,
    getAllCategoriesDb,
};