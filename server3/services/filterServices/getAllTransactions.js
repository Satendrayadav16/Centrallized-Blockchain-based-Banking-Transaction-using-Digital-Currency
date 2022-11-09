module.exports = function getAllTransactions(blockchain) {
    let transactionList = [];

    // Filters all the transactions from the whole blockchain
    blockchain.chain.forEach(block => block.transactions.forEach(transaction => transactionList.push(transaction)));

    return transactionList;
}