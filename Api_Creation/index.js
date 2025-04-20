const express = require('express');
const app = express();
const connectDb = require('./config/dbconnect')
const studentRouter = require('./router/student.router')

app.use(express.json())
port = process.env.PORT

//connect database
connectDb()

//Router
app.use('/api/students',studentRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});