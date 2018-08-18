var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       trim: true
   },   
   email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },  
    personality: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },   
});

var user = mongoose.model('User', userSchema);
module.exports = user;