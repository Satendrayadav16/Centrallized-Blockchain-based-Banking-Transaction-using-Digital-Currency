const getETCD = async () => {
    const {Etcd3} = require('etcd3');
    const client = new Etcd3();

    const data = await client.get('blockchain')
    return JSON.parse(data);
};

module.exports = {getETCD};

