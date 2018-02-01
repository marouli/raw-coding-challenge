const fs = require('fs');

const fileWriter = function () {
    let file = fs.createWriteStream("./video/bunny.mp4");
    http.get("https://s3.eu-central-1.amazonaws.com/flipbase-coding-challenge/bunny.mp4", (response) => {
        response.pipe(file);
    });
};

module.exports = fileWriter;