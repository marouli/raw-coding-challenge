const streamWriter = function (request, response, callback) {
    let str = '';
    request.on('data', (chunk) => {
        str += chunk;
    }).on('end', () => {
        callback(str);
    });
};

module.exports = streamWriter;