module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory',
      {
        postId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
      },
      {
        timestamps: false,
        underscored: true, 
        tableName: 'posts_categories'
      },
    );
    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
          through: PostCategory,
          foreignKey: { name: 'postId' }, as: 'categories',
          otherKey: 'categoryId',
        });
        models.Category.belongsToMany(models.BlogPost, {
            through: PostCategory,
            foreignKey: { name: 'categoryId' }, as: 'posts',
            otherKey: 'postId',
          });
      };
  
      return PostCategory;
  };