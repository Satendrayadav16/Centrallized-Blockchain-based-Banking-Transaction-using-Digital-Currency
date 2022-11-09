
class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    // to check if no new transaction with same properties are formed. If entered same Tx then update with new one.
    updateOrAddTransaction(transaction) {
        let transactionWithId = this.transactions.find(t=> t.id === transaction.id);

        if (transactionWithId) {
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
        } else {
            this.transactions.push(transaction);
        }
    }

    // transaction in transaction pool of particular address
    existingTransaction(address) {
        return this.transactions.find(t => t.input.sender === address);
    }

    // validTransactions() {
    //     return this.transactions.filter(transaction => {
    //         const outputTotal = transaction.outputs.reduce((total, output) => {
    //             return total + output.amount;
    //         }, 0);
    //
    //         if(transaction.input.amount !== outputTotal) {
    //             console.log(`Invalid transaction from ${transaction.input.sender}.`);
    //             return;
    //         }
    //
    //         let message = `${transaction.input.sender}${transaction.input.amount}${transaction.remark}`;
    //
    //         if (!SignOrVerify.verifyTransaction(transaction, message)) {
    //             console.log(`Invalid signature from ${transaction.input.sender}.`);
    //             return;
    //         }
    //
    //         return transaction;
    //     });
    // }

}

module.exports = TransactionPool;