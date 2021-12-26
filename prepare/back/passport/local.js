const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
    },async (email,password,done)=>{
        try{
            const user = await User.findOne({
                where: {email} // es6 이전 문법 where: {email : email}
            });
            if (!user){
                return done(null,false,{reason: '존재하지 않는 이메일입니다!'}) // null 자리 = 서버에러 , false = 성공여부 , {reason} = 클라이언트 에러 왼쪽의 세 위치 암기
            }
            const result = await bcrypt.compare(password, user.password);
            if(result){ // 서버 연결 성공
                return done(null, user); // 클라이언트 실패
            }
            return done(null,false,{reason: '비밀번호가 틀렸습니다.'}); // 클라이언트 실패 2
        } catch(error){ // 서버 에러
            console.error(error);
            return done(error);
        }
    }));
};


