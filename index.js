const Gutsy = require('./gutsy');

const app = new Gutsy();

app.get('/users', function(req, resp) {
    console.log({
        url: req.url,
        method: req.method,
        httpVersion: req.httpVersion,
        headers: req.headers
    });
    resp.end('Successfull response');
});

// app.get('/roles', function(req, resp) {
//     console.log({
//         url: req.url,
//         method: req.method,
//         httpVersion: req.httpVersion,
//         headers: req.headers
//     });
// });

app.listen(1234, function() {
    console.log("Server started");
});