const Gutsy = require('./gutsy');
const app = new Gutsy();


const DUMMY_USERS = [
    { 
        "user": "yash",
        "email": "yashpriyam74@gmail.com", 
        "password": "nedstark"
    },
    {
        "user": "priyam",
        "email": "yashpriyam74@icloud.com",
        "password": "robert"
    }
]
app.get('/', function(req, resp) {
    resp.render('login.html');
});

app.post('/login', async (req, resp) => {
    let body = await req.getBody();
    if (DUMMY_USERS.find(el => el.email === body.email)) {
        resp.json({ message: `Welcome ${body.email}` })
    } else {
        resp.json({message: `No user present with ${body.email}, please sign up first` })
    }
    console.log(body.email, body.password);
})

app.get('/sign', function(req, resp) {
    resp.render('signup.html');
});

app.post('/signup', async (req, resp) => {
    let body = await req.getBody();
    if (DUMMY_USERS.find(el => el.email === body.email)) {
        resp.json({ message: 'User already exists' })
    } else {
        DUMMY_USERS.push({user: body.username, email: body.email, password: body.password})
        resp.json({ Message: 'New User Created', User: body.username, Email: body.email, Password: body.password })
    }
    console.log(body.email, password);
});

app.listen(1234, function() {
    console.log("Server started");
});