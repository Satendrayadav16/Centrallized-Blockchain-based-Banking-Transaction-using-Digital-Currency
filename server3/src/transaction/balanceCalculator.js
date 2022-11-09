module.exports = function balanceCalculator(blockchain, address) {

    let transactionList = [];
    let balance = 0;

    // collects all the transactions from blockchain to transactions
    blockchain.chain.forEach(block => block.transactions.forEach(transaction => {
        transactionList.push(transaction);
    }));

    // filters all the transactions related to respective address
    const addressTxs = transactionList.filter(transaction => transaction.input.sender === address);

    let startTime = 0;

    // gives most recent transaction
    if(addressTxs.length  > 0) {
        const recentInput = addressTxs.reduce(
            (prev,current) => prev.input.timestamp > current.input.timestamp ? prev : current
        );

        startTime = recentInput.input.timestamp;
        balance = recentInput.outputs.find(output => output.address === address).amount;
    }

    transactionList.forEach(transaction => {
        if(transaction.input.timestamp > startTime) {
            transaction.outputs.forEach(output => {
                if(output.address === address) {
                    balance += output.amount;
                }
            })
        }
    })

    return balance;
};
