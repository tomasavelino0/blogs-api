const { verifyToken } = require('../auth/jwtFunction');

const validatePostBody = (req, res, next) => {
    const propriedadesBody = ['title', 'content', 'categoryIds'];
  const postBody = req.body;
  const hasProperties = propriedadesBody.every((propriedade) => propriedade in postBody);
    if (!hasProperties) {
        return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }
    return next();
};

const validateUpdate = (req, res, next) => {
    const propriedadesBody = ['title', 'content'];
    const updatePost = req.body;
    const { title, content } = req.body;
    const hasProperties = propriedadesBody.every((propriedade) => propriedade in updatePost);
    if (!hasProperties || title.length === 0 || content.length === 0) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    return next();
};

const validateIdUpdate = (req, res, next) => {
   const { id } = req.params;
   const checkId = req.user.id;
   if (Number(id) !== Number(checkId)) {
    return res.status(401).json({ message: 'Unauthorized user' });
   }
    return next();
};

const validateUser = (req, res, next) => {
    const { authorization } = req.headers;
    const checkUser = verifyToken(authorization);
    const { id } = checkUser.data;
    const token = req.user.id;
     if (Number(id) !== Number(token)) {
      return res.status(401).json({ message: 'Unauthorized user' });
     }
      return next();
};

module.exports = {
    validatePostBody,
    validateUpdate,
    validateIdUpdate,
    validateUser,
};