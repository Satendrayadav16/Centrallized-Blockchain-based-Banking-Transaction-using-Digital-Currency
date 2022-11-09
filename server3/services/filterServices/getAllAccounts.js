module.exports = function getAllAccounts(blockchain) {
    let accountList = [];

    // Filters all the transactions from the whole blockchain
    blockchain.chain.forEach(block => block.accounts.forEach(account => accountList.push(account)));
    return accountList;
}