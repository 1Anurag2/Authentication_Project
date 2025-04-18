const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");

app.use(cookieparser());
// app.use(cookieparser('Secretkey123'));

app.get("/", (req, res) => {
  const name = req.cookies.username;
  if (!name) {
    res.send(`Home Page : No cookie found`);
  } else {
    res.send(`Home Page : cookie found : ${name}`);
  }
});

app.get("/set-cookie", (req, res) => {
  res.cookie("username", "Anurag", {
    maxAge: 900000,
    httpOnly: true,
    // signed: true,   when secret key given 
  });
  res.send("Cookie has been set");
});

app.get("/get-cookie", (req, res) => {
  const username = req.cookies.username;
//   const username = req.signedCookies.username;  when secret key given
  if (!username) {
    res.send("Cookie value not found");
  } else {
    res.send(`Cookie found : ${username}`);
  }
});

app.get("/delete-cookie", (req, res) => {
  const destroy = res.clearCookie("username");
  if(!destroy){
    res.send('Cookie has not been Deleted.')
  }else{
    res.send('Cookie has been deleted.')
  }
});

app.listen(3000, () => {
  console.log(`Server is running at 3000`);
});
