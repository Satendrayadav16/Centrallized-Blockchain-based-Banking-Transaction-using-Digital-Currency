const uuidGenerator = require('../utility/uuidGenerator.js');
const hashGenerator = require('../utility/hashGenerator.js');

class Transaction {

    constructor() {
        this.id = uuidGenerator().split('-').join('');
        this.input = null;
        this.outputs = [];
        this.remark = null;
        this.hash = hashGenerator(`${this.id}${this.input}${this.outputs}${this.remark}`);
        this.blockNumber = 0;
    };

    // used to set the data in transaction.
    static transactionWithOutputs(balance, sender, outputs, remark, signature) {
        const transaction = new this();
        transaction.remark = remark;
        transaction.outputs.push(...outputs);
        Transaction.transactionWithInput(transaction, balance, sender, signature);
        return transaction;
    }

    // transaction with input
    static transactionWithInput(transaction, balance, sender, signature) {
        transaction.input = {
            timestamp: Date.now(),
            amount: balance,
            sender: sender,
            signature: signature
        };
    };

    // function to create new transaction
    static newTransaction(sender, recipient, amount, signature, blockchain, balance, remarks) {

        //checks if amount exceeds the balance
        if (amount > balance) {
            throw new Error(`Amount: ${amount} exceeds balance.`);
        }

        // calls transactionWithOutput and returns it.
        return Transaction.transactionWithOutputs(balance, sender, [
            {amount: balance - amount, address: sender},
            {amount, address: recipient}
        ], remarks, signature);
    }

    static update(sender, recipient, amount, signature, balance, transaction) {
        const senderOutput = transaction.outputs.find(output => output.address === sender);

        if (amount > senderOutput.amount) {
            console.log(`Amount: ${amount} exceeds balance.`);
            return;
        }

        senderOutput.amount = senderOutput.amount - amount;
        transaction.outputs.push({amount, address: recipient});
        Transaction.transactionWithInput(transaction, balance, sender, signature);

        return transaction;
    }


}

module.exports = Transaction;