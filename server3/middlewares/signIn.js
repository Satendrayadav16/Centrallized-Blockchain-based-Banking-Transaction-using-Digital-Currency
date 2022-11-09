const {User} = require('../models/user.model');

module.exports = function signIn(email) {

    User.findOne({email:email}),(err,user)=> {
        if(user){
            return user;
        } else {
            return "No data found for this user"
        }
    }
}