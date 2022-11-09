module.exports = function getTransactionByHash(blockchain, hash) {

    let transactionList = [];

    // Filters all the transactions from the whole blockchain
    blockchain.chain.forEach(block => block.transactions.forEach(transaction => {
        if (transaction.hash === hash) {
           transactionList.push(transaction);
        }
    }));
    return transactionList;
}