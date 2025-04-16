const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const dotenv = require('dotenv')
dotenv.config()
const app = express()


app.use(session({
    secret: 'secretkey',
    resave : false,
    saveUninitialized : false,
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URI,     // default me sessions ka collection banta hai
        collectionName:'mysession',
        // ttl : 1000*60*60*24, 
    }),
    cookie : {maxAge : 1000*60*60*24} 
}))


app.get('/',(req,res) => {
    if(req.session.username){
        res.send(`<h1>Username from session is : ${req.session.username}.</h1>`)
    }else{
        res.send(`<h1>No Username found in session.</h1>`)
    }
})

app.get('/set-username' , (req,res) => {
    req.session.username = 'Sahil verma'
    res.send('<h1>Username has been set in session.</h1>')
})
app.get('/get-username' , (req,res) => {
    if(req.session.username){
        res.send(`<h1>Username from session is : ${req.session.username}.</h1>`)
    }else{
        res.send(`<h1>No Username found in session.</h1>`)
    }
})
app.get('/destroy' , (req,res) => {
    req.session.destroy((err)=>{
        if(err){
            res.status(500).send('Failed to destroy session')
        }else{
            res.send(`<h1>Session destroy successfully.</h1>`)
        }
    })
})

app.listen(3000,()=>{
    console.log(`Server is running at 3000`)
})