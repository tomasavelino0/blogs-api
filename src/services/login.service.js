const { createToken } = require('../auth/jwtFunction');

const { User } = require('../models');

const login = async (email, password) => {
   if (!email || !password) {
    return { type: 'body', message: 'Some required fields are missing' };
   }   
  const checkLogin = await User.findOne(
    { where: [{ email }, { password }] },
   );

  if (!checkLogin) {
    return { type: 'field', message: 'Invalid fields' };
   }
   const { password: _password, ...userWithoutPassword } = checkLogin.dataValues;
   const token = createToken(userWithoutPassword);
   return { type: null, token };
};

module.exports = {
    login,
};