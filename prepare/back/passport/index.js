const passport = require('passport');
const local = require('./local');
module.exports = () => {
    passport.serializeUser(() => {

    });

    passport.deserializeUser(()=>{

    });

    local(); // local.js의 module.exports가 실행되는 코드이다...
};