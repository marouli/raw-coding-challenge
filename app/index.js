const http = require('http');
const port = 3000;
const requestHandler = require('./handlers/requestHandler');
const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err)
        return console.log('something bad happened', err);
});

// You need to export your application in order to be able to pass the tests!
module.exports = server;