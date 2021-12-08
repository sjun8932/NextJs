module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post',{
        // id가 기본적으로 들어있다.
        content: {
            type:DataTypes.TEXT,
            allowNull:false,
        },
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci' // 이모티콘을 쓰려면 utf8에 mb4를 달아줘야...
    });
    Post.associate = (db) => {};
    return Post;
};