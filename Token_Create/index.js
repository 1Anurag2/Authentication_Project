const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const csrf = require('csurf')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cookieParser())
const csrfProtection = csrf({cookie:true})

app.get('/',(req,res)=>{
    res.send('Home Page')
})

app.get('/form', csrfProtection ,(req, res) => {
    res.render('form',{csrfToken : req.csrfToken()})
});

app.post('/submit',csrfProtection,(req,res)=>{
    res.send(req.body)
})

app.listen(3000,()=>{
    console.log(`Server is running at 3000`)
})