const express = require('express');
const postRouter = require('./routes/post');

const app = express();

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

app.listen(3099,()=>{
    console.log('서버 실행 중');
});