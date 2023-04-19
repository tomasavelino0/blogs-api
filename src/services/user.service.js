const { User } = require('../models');
const { createToken } = require('../auth/jwtFunction');

const createUser = async ({ displayName, email, password, image }) => {
    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) {
        return { type: true, message: 'User already registered' };
    }
    const getUser = await User.create({ displayName, email, password, image });
    const { password: _password, ...userWithoutPassword } = getUser.dataValues;
    const token = createToken(userWithoutPassword);
    return { type: null, token };
  };
  
const getAllUsers = async () => {
    const getAllUsersDb = await User.findAll({ attributes: { exclude: ['password'] } });
    return getAllUsersDb;
};

const getUserById = async (id) => {
    const getUser = await User.findOne(
        { where: { id } }, { attributes: { exclude: ['password'] } },
    );
    if (!getUser) {
        return { type: 'error', message: 'User does not exist' };
    }
    const { password: _password, ...userWithoutPassword } = getUser.dataValues;
    return { type: null, message: userWithoutPassword };
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
};