const http = require('http');
const server = http.createServer((req,res)=>{
    console.log(req.url,req.method);
    if (req.method === 'GET') {
        if (req.url === '/api/posts'){

        }
    } else if (req.method === 'POST') {
        if (req.url === '/api/post'){

        }
    } else if (req.method === 'DELETE'){
        if (req.url === '/api/post'){

        }
    }
    res.writeHead(200,{'Content-Type':'text/script; charset=UTF-8'});
    res.write('<h1>안녕</h1>');
    res.write('<h2>오늘은 좀 잘 풀리길 바래</h2>');
    res.write('<h3>점심을 좀 많이 먹었더니</h3>');
    res.write('<h4>배가 부르네</h4>');
    res.end('<h5>한숨 때려야 겠다.</h5>');
});
server.listen(3099,()=>{
    console.log('서버 실행 중');
});