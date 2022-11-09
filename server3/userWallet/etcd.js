const putETCD = async (blockchain) => {
    const {Etcd3} = require('etcd3');
    const client = new Etcd3();

    const data = {
        CHAIN: blockchain,
        ETCDTimeStamp: Date.now()
    }

    let chain = Buffer.from(JSON.stringify(data))
    await client.put('blockchain').value(chain);
    return console.log(await client.get('blockchain'));

};

module.exports = {putETCD};

