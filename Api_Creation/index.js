const express = require('express');
const app = express();
const connectDb = require('./config/dbconnect')
const studentRouter = require('./router/student.router');
const { MulterError } = require('multer');

app.use(express.json())
port = process.env.PORT

//connect database
connectDb()

//Router
app.use('/api/students',studentRouter)

app.use((error,req,res,next)=>{
    if(error instanceof MulterError){
        return res.status(400).send(`Image Error : ${error.message} : ${error.code}`)
    }else if(error){
        return res.status(500).send(`Something went wrong : ${error.message}`)
    }
    next()
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});