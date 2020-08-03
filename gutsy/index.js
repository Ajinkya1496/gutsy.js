const http = require('http');

function gutsy() {
    return {
        createServer: function() {
            console.log("in create server")
        },
        listen: function(port) {
            if(typeof port !== "number") {
                throw new TypeError(`Port should be a number, got ${typeof port}`)
            }
            const server = http.createServer((req, res) => {
                res.end();
            })
            server.listen(port);
        },
    }
}

module.exports = gutsy;