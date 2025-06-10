const express = require('express');
const passport = require('passport')
const session = require('express-session')
const app = express();
require('./auth/google')
const port = 3000;

// Session Setup
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>')
});

app.get('/auth/google',
  passport.authenticate(
    'google', 
    { scope: ['profile', 'email'] }
  ));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', 
    { 
      failureRedirect: '/', 
      successRedirect: '/profile'
    }
  ),
  );

  function authCheck(req, res, next){
    if(req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }

  app.get('/profile',authCheck,(req, res) =>{
    
    // console.log(req.user)
    res.send(`<h1>Welcome ${req.user.displayName} </h1>
              <img src="${req.user.photos[0].value}" />
              <a href='/logout'>Logout</a>
      `)  
  })

  app.get('/logout',(req, res) =>{ 
    req.logout(()=>{
      res.redirect('/')
    })
  })
  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});