const {checkDuplicateEmail} = require('./checkDuplicateEmail');
const {User} = require('../models/user.model');

module.exports = function signUP(email,username, puKey) {

    // check if email already exists
    if(checkDuplicateEmail(email)){
        return "Email already exist";
    } else{
        const UserData = new User({
            username,
            email,
            puKey
        })

        UserData.save(err => {
            if(err) {
                throw new Error('Error occurred while registering data')
            } else {
                return "Successfully Registered"
            }
        })
    }

}