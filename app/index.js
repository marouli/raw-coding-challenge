const http = require('http');
const port = 3000;

const requestHandler = (request, response) => {
// We end our request here; please customise this to your own liking!;
    let url = request.url;
    // let method = request.method;

    if (url === '/hello-world') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify({"hello": "world"}));
        response.end();
    }

    if (url === '/hello-to-admins-only') {
        response.statusCode = 401;
        response.end();
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