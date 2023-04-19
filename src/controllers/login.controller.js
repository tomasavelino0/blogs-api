const loginService = require('../services/login.service');

const loginPost = async (req, res) => {
    const { email, password } = req.body;
    const checkLogin = await loginService.login(email, password);

    if (!checkLogin.type) {
        return res.status(200).json(checkLogin);
    }
    if (checkLogin.type === 'body') {
        return res.status(400).json({ message: checkLogin.message });
    }
    if (checkLogin.type === 'field') {
        return res.status(400).json({ message: checkLogin.message });
    }
};

module.exports = {
    loginPost,
};