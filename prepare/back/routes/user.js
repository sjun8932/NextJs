const express = require('express');
const bcrypt = require('bcrypt')
const { User } = require('../models');

const router = express.Router();

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

module.exports = router;