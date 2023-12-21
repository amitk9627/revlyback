const mongoose = require('mongoose');
const userSchema = ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const User=mongoose.model('user',userSchema);
module.exports = User;