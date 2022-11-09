const { v1: uuidV1 } = require('uuid');

const getUUID = () => {
    return uuidV1();
}

module.exports = getUUID;