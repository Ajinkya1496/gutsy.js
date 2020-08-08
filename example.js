const Gutsy = require('./gutsy');
const users = require('./data/userData');
const app = new Gutsy();

app.get('/', function(req, resp) {
    resp.render('login.html');
});

app.post('/signup', async (req, resp) => {
    let body = await req.getBody();
    console.log(body.name, body.email, password);
});

app.post('/login', async (req, resp) => {
    let body = await req.getBody();
    console.log(body.email, body.password);
})


app.listen(1234, function() {
    console.log("Server started");
});