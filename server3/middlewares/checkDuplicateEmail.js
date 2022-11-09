//To verify a SignUp action

const User = require("../models/user.model");

// Checks for duplicate email or username
checkDuplicateEmail = (email) => {
    // Checks for Email
    User.findOne({
      email: email
    }).exec((err, user) => {
      if (err) {
        return "Error";
      }

      if (user) {
        return true;
      }

    });
    return false;
};

module.exports = {checkDuplicateEmail};
