const userServices = require('../services/user.service');

const insertNewUser = async (req, res) => {
   const { displayName, email, password, image } = req.body;
   const insertUser = await userServices.createUser({ displayName, email, password, image });
   if (insertUser.type) {
      return res.status(409).json({ message: insertUser.message });
   }
   return res.status(201).json({ token: insertUser.token });
};

const getAllUsersDb = async (_req, res) => {
   const users = await userServices.getAllUsers();
   return res.status(200).json(users);
};

const userById = async (req, res) => {
  const { id } = req.params;
  const user = await userServices.getUserById(Number(id));
  if (user.type === 'error') {
   return res.status(404).json({ message: user.message });
  }
  return res.status(200).json(user.message);
};

module.exports = {
   insertNewUser,
   getAllUsersDb,
   userById,
};