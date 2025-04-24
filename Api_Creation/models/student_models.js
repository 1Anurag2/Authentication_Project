const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    first_name: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    phone: {
        type : String,
        required : true
    },
    gender: {
        type : String,
        enum : ['Male','Female','Other'],
        required : true
    },
    profile_pic:{
        type:String,
    }
})

const studentmodel = mongoose.model('student',StudentSchema)

module.exports = studentmodel