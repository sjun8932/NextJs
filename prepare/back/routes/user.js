const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');

const router = express.Router();

//POST/user/login
router.post('/login', (req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){ // 다시 한번 말하지만 info는 클라이언트 에러 부분
            return res.status(401).send(info.reason); //403은 금지 401은 허가되지 않음을 의미
        }
        return req.login(user,async (loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where:{id:user.id},
                attributes:{
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                },{
                    model: User,
                    as: 'Followings',
                },{
                    model: User,
                    as: 'Followers',
                }]
            });
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req,res,next); // 미들웨어 확장법....
});

//POST /user/
router.post('/' , async(req,res,next) => {
    try{
        const exUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (exUser){
            return res.status(403).send('이미 사용중인 아이디 입니다.')
        }
        // status 200 : 성공 , 300 : 리다이렉트 , 400 : 클라이언트 서버 오류 , 500 : 서버 에러
        const hashedPassword = await bcrypt.hash(req.body.password, 13);
        await User.create({
            email:req.body.email,
            nickname:req.body.nickname,
            password:hashedPassword,
        });
        res.status(200).send('ok');
    }catch(error){
        console.error(error);
        next(error); // status 500
    }
});

router.post('/user/logout' ,(req,res,next)=>{
    req.logout();
    req.session.destroy();
    res.send('ok')
})

module.exports = router;