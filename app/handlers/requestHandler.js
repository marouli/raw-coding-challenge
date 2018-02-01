const fileWriter = require('./../helpers/fileWriter');
const streamWriter = require('./../helpers/streamWriter');

const requestHandler = (request, response) => {
    let url = request.url;
    let method = request.method;

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

module.exports = requestHandler;