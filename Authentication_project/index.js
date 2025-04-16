const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectdb = require('./config/dbconnection')
const Router = require('./router/router')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine','ejs')


//DBconnection
connectdb()

//Router
app.use('/',Router)

app.post('/', (req, res) => {
    const data = req.body;
    res.send(`Hello ${data.name}!`);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});