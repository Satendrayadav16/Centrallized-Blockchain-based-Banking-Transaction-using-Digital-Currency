module.exports = function getBlockByHash(blockchain, hash) {
    let blockList = [];

    blockchain.chain.forEach(block => {
        if(block.hash === hash){
            blockList.push(block)
        }
    });

    return blockList;
}