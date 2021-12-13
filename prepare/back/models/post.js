module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post',{
        // id가 기본적으로 들어있다.
        content: {
            type:DataTypes.TEXT,
            allowNull:false,
        },
        // PostId => RetweetId로 변화
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci' // 이모티콘을 쓰려면 utf8에 mb4를 달아줘야...
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, {through: 'Like' , as: 'Likers'});
        db.Post.belongsTo(db.Post, {ad: 'Retweet'});
    };
    return Post;
};