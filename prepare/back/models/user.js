module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // MySQL에는 users 테이블이 생성됨
        //id가 기본적으로 들어있다.
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true,
        },
        nickname: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    },{
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글 저장
    });
    User.associate = (db) => {};
    return User;
};