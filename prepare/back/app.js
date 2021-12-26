const express = require('express');
const cors = require('cors')
const postRouter = require('./routes/post');
const userRouter = require('./routes/user')
const db = require('./models');
const passportConfig = require('./passport')

const app = express();

db.sequelize.sync()
    .then(()=>{console.log('db 연결 성공했따')})
    .catch(console.err);

passportConfig(); // app.js에서 passportConfig를 연결해준다고 보면 된다.

app.use(cors({
    origin: '*',
    credentials: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get('/api/posts', (req,res) => {
    res.json([
        {id: 1 , contents: 'happy'},
        {id: 2 , contents: 'love'},
        {id: 3 , contents: 'truth'},
    ])
});

app.get('/', (req,res)=>{
    res.send('hello express');
});

// app.get => 가져오다
// app.post => 생성하다
// app.put => 전체 수정
// app.delete => 제거
// app.patch => 부분 수정
// app.options => 찔러보기
// app.head => 헤더만 가져오기

app.use('/post',postRouter);
app.use('/user',userRouter);

app.listen(3099,()=>{
    console.log('서버 실행 중');
});