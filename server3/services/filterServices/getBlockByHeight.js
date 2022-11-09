module.exports = function getBlockByHeight(blockchain, height) {
    let blockList = [];

    blockchain.chain.forEach(block => {

        if (block.blockHeight === height) {
            blockList.push(block)
        }
    });

    return blockList;
}