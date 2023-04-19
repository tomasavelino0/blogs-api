const postServices = require('../services/post.service');

const insertNewPostDb = async (req, res) => {
    const { id } = req.user;
    const { title, content, categoryIds } = req.body;
    const newPost = await postServices.insertNewPost({ title, content, id }, categoryIds);
    if (newPost.type === 'error') {
        return res.status(400).json({ message: newPost.message });
    }
    return res.status(201).json(newPost.message);
};

const listAllPosts = async (_req, res) => {
    const posts = await postServices.getAllPosts();
    if (!posts.type) {
        return res.status(200).json(posts.message);
    }
    return res.status(500).json({ message: posts.message });
};

const listPostById = async (req, res) => {
    const { id } = req.params;
    const postById = await postServices.getPostById(Number(id));
    if (postById.type) {
        return res.status(404).json({ message: postById.message });
    }
    return res.status(200).json(postById.message);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const update = await postServices.updatePost(Number(id), title, content);
    if (!update.type) {
        return res.status(200).json(update.message);
    }
    return res.status(500).json({ message: 'ops algo deu errado' });
};

const deletePostDb = async (req, res) => {
    const { id } = req.params;
    const deleteDb = await postServices.deletePost(Number(id));
    if (deleteDb.type) {
        return res.status(404).json({ message: deleteDb.message });
    }
    return res.status(204).end();
};

module.exports = {
    insertNewPostDb,
    listAllPosts,
    listPostById,
    updatePost,
    deletePostDb,
};