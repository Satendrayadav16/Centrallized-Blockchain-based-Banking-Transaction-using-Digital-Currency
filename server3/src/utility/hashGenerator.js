const crypto = require('crypto');

const generateHash = (data) => {
    return data != null
        ? crypto 
        .createHash("sha256")
        .update(data.toString())
        .digest("hex")
        : "";
};


module.exports =  generateHash;