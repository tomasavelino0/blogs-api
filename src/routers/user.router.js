const express = require('express');

const router = express.Router();

const userControler = require('../controllers/user.controller');
const { validateToken } = require('../midlewares/validateJwt');

const { 
    validateBodyCreateUser, 
 } = require('../midlewares/user.midlewares');

router.post('/', 
validateBodyCreateUser, 
userControler.insertNewUser);

router.get('/', 
validateToken,
userControler.getAllUsersDb);

router.get('/:id', 
validateToken,
userControler.userById);

module.exports = router;