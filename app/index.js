const http = require('http');
const fs = require('fs');
const port = 3000;

const requestHandler = (request, response) => {
    let url = request.url;
    let method = request.method;

    const fileWriter = function () {
        let file = fs.createWriteStream("./video/bunny.mp4");
        let req = http.get("https://s3.eu-central-1.amazonaws.com/flipbase-coding-challenge/bunny.mp4", (response) => {
            response.pipe(file);
        });
    }

    const streamWriter = function (request, response, callback) {
        let str = '';
        request.on('data', (chunk) => {
            str += chunk;
        }).on('end', () => {
            callback(str);
        });
    }

    if (url === '/hello-world' && method === 'GET') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify({"hello": "world"}));
        response.end();
    }

    if (url === '/hello-to-admins-only' && method === 'GET') {
        response.writeHead(401);
        response.end();
    }

    if (url === '/hello-to-admins-only' && method === 'GET') {
        streamWriter(request, response, (data) => {
            let body = JSON.parse(data);
            if (body.username === 'John') {
                // console.log('No John!!!!');
                response.writeHead(401);
                request.pipe(response, {end: true});
                // response.end();
            }
            if (body.username === 'Karen') {
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write(JSON.stringify({"message": "Hello Karen"}));
                request.pipe(response);
                response.end();
            }

        });
    }

    if (url === '/download-video' && method === 'GET') {
        fileWriter();
    }

    response.end('Hello Node.js Server!');

};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err)
        return console.log('something bad happened', err);
});

// You need to export your application in order to be able to pass the tests!
module.exports = server;