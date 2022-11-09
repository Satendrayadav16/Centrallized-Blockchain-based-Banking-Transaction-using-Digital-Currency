const CONFIG = require('../config.js');
const genKeyPair = require('../utility/keypairGenerator.js');
const Transaction = require('../transaction/Transaction.js')

class Wallet {
    constructor() {
        this.balance = CONFIG.INITIAL_BALANCE;
        this.keyPair = genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `Wallet -
        publicKey : ${this.publicKey.toString()}
        balance   : ${this.balance}`
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }

    // create transaction in wallet
    createTransaction(recipient, amount, blockchain, transactionPool) {
        // calculates the balance
        this.balance = this.calculateBalance(blockchain);

        // checks if amount exceeds the remaining balance
        if (amount > this.balance) {
            console.log(`Amount: ${amount}, exceeds current balance: ${this.balance}`);
            return;
        }

        // gets transaction of particular address present in transaction pool
        let transaction = transactionPool.existingTransaction(this.publicKey);

        // if transaction exists present then update
        if (transaction) {
            transaction.update(this, recipient, amount);
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        }

        return transaction;
    }

    // function to calculate the balance of respective address
    calculateBalance(blockchain) {
        let balance = this.balance;
        let transactions = [];

        // collects all the transactions from blockchain to transactions
        blockchain.chain.forEach(block => block.transactions.forEach(transaction => {
            transactions.push(transaction);
        }));

        // filters all the transactions related to respective address
        const walletInputs = transactions.filter(transaction => transaction.input.sender === this.publicKey);

        let startTime = 0;

        // gives most recent transaction
        if (walletInputs.length > 0) {
            const recentInput = walletInputs.reduce(
                (prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current
            );

            startTime = recentInput.input.timestamp;
            balance = recentInput.outputs.find(output => output.address === this.publicKey).amount;
        }

        transactions.forEach(transaction => {
            if (transaction.input.timestamp > startTime) {
                transaction.outputs.forEach(output => {
                    if (output.address === this.publicKey) {
                        balance += output.amount;
                    }
                });
            }
        });

        return balance;
    }

    static blockchainWallet() {
        const blockchainWallet = new this();
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
    }

}

module.exports = Wallet;