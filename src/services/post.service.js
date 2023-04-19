const { PostCategory, BlogPost, sequelize, Category, User } = require('../models');

const insertNewPost = async ({ title, content, id }, categories) => {
    const findCategories = await Category.findAll({ where: { id: categories } });
    const arrayCategories = findCategories.map(({ dataValues }) => dataValues);
    if (arrayCategories.length === 0) {
        return { type: 'error', message: 'Some required fields are missing' };
    }
    if (arrayCategories.length !== categories.length) {
        return { type: 'error', message: 'one or more "categoryIds" not found' };
    }
    const result = await sequelize.transaction(async (t) => {
        const newPost = await BlogPost.create({ title, content, userId: id }, { transaction: t });

        await Promise.all(categories.map(async (categoryId) => PostCategory
                .create({ postId: newPost.id, categoryId }, { transaction: t })));

        return newPost;
    });
        return { type: null, message: result.dataValues };
};

const getAllPosts = async () => {
    try {
        const allPosts = await BlogPost.findAll({
            include: [
                { model: User, as: 'user', attributes: { exclude: ['password'] } },
                { model: Category, as: 'categories', through: { attributes: [] } }],
        });
        return { type: null, message: allPosts };
    } catch (e) {
        return { type: true, message: e.message };
    }
};

const getPostById = async (id) => {
    try {
        const postById = await BlogPost.findOne({
            where: { id },
            include: [
                { model: User, as: 'user', attributes: { exclude: ['password'] } },
                { model: Category, as: 'categories', through: { attributes: [] } }],
        });
        if (!postById) {
            return { type: true, message: 'Post does not exist' };
        }

        return { type: null, message: postById };
    } catch (e) {
        console.error(e);
    }
};

const updatePost = async (id, title, content) => {
    await sequelize.transaction(async (t) => {
        await BlogPost.update({
            title,
            content,
        }, { where: { userId: id } }, { transaction: t });
    });
    const updatedPost = await BlogPost.findOne({
        where: { userId: id },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return { type: null, message: updatedPost };
};

const deletePost = async (idPost, idUser) => {
    const deleted = await BlogPost.destroy({
        where: { id: idPost },
    });
    console.log('aaaaaaa', deleted.id);
    if (!deleted) {
        return { type: true, message: 'Post does not exist' };
    }
    // const userPost = await BlogPost.findOne({
    //     where: { userId: idUser },
    // });
    return { type: null };
};

module.exports = {
    insertNewPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};