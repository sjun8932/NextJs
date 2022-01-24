const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');
const router = express.Router();

router.get('/', async(req,res,next)=>{
   try{
       if(req.user){
           const fullUserWithoutPassword = await User.findOne({
               where: { id: req.user.id },
               attributes: {
                   exclude: ['password']
               },
               include: [{
                   model: Post,
                   attributes: ['id'],
               }, {
                   model: User,
                   as: 'Followings',
                   attributes: ['id'],
               }, {
                   model: User,
                   as: 'Followers',
                   attributes: ['id'],
               }]
           })
           res.status(200).json(fullUserWithoutPassword);
       }else {
           res.status(200).json(null);
       }
   }catch(error){
       console.error(error);
       next(error);
   }
});

//POST/user/login
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

//POST /user/
router.post('/' , isNotLoggedIn, async(req,res,next) => {
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

router.post('/logout', isLoggedIn ,(req,res)=>{
    req.logout();
    req.session.destroy();
    res.send('ok')
});

module.exports = router;