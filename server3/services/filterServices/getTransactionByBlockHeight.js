module.exports = function getBlockByHeight(blockchain, height) {
    let transactions;

    blockchain.chain.forEach(block => {

        if (block.blockHeight === height) {
            transactions = block.transactions
        }
    });

    return transactions;
}