const express = require('express');

const router = express.Router();

const { validateToken } = require('../midlewares/validateJwt');

const categoryControllers = require('../controllers/category.controller');

router.post('/',
validateToken,
categoryControllers.insertCategoryDb);

router.get('/',
validateToken, 
categoryControllers.getAllCategoriesDb);

module.exports = router;