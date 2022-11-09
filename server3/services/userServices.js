// Create Account
const EllipticCurve = require('elliptic').ec;
const Account = require('../src/forBank/accountHandler/Account');
const Transaction = require('../src/transaction/Transaction');
const {existingAccountByAddress} = require("../src/forBank/accountHandler/ExistingAccountFilter");
const balanceCalculator = require('../src/transaction/balanceCalculator');
const {signIn, signUP} = require('../models/mongo');


const requestForAccountCreation = (name, email, citizenshipNumber, puKey, signature, UnverifiedAccountList) => {

    if (name && email && puKey && signature && citizenshipNumber) {

        const EC = new EllipticCurve('secp256k1');

        const message = `${name}${email}${puKey}`;
        const verified = EC.verify(message, signature, puKey, 'hex');

        if (verified) {
            let account = new Account(name.toUpperCase(), citizenshipNumber, puKey);

            //push to unverified Accounts
            UnverifiedAccountList.addUnverifiedAccount(account);

            signUP(name, email,puKey)

            return true;
        } else {
            throw new Error('invalid request: Verification error');
        }

    } else {
        throw new Error('Some Data are missing')
    }
};

const createTransactionRequest = (sender, receiver, amount, signature, blockchain, transactionPool, remarks) => {

    let receiverExists = existingAccountByAddress(receiver, blockchain);
    let senderExists = existingAccountByAddress(sender, blockchain);

    let balance = 0;
    if (receiverExists && senderExists) {
        balance = balanceCalculator(blockchain, sender);

        // checks if amount exceeds the remaining balance
        if (amount > balance) {
            throw new Error('Insufficient Balance');
        }

        // gets transaction of particular address present in transaction pool
        const transaction = transactionPool.existingTransaction(sender);

        // if transaction exists present then update
        if (transaction) {
            transaction.update(sender, receiver, amount, signature, balance, transaction);
        } else {
            let newTransaction = Transaction.newTransaction(sender, receiver, amount, signature, blockchain, balance, remarks);
            transactionPool.updateOrAddTransaction(newTransaction);
        }
    } else {
        throw new Error('Account does not Exist');
    }
    return true;
};

const getMinedReceivedTransactionsByAddress = (address, blockchain) => {
    let transactionList = [];
    let validAddress = existingAccountByAddress(address, blockchain);
    if (validAddress.length !== 0) {
        blockchain.chain.forEach(block => {
            if (block.transactions.length !== 0) {
                block.transactions.forEach(transaction => {
                    transactionList.push(transaction);
                })
            }
        });

        if (transactionList.length !== 0) {
            let tl = [];
            transactionList.forEach(transaction => {
                transaction.outputs.forEach(tx => {
                    if (tx.address === address) {

                        tl.push(transaction);
                    }
                })
            })
            return tl;

        }
    }
    return [];
};

// Get all the transactions by account (pending transactions)
const getPendingSentTransactionsByAddress = (address, blockchain, transactionPool) => {
    let transactionList = [];
    let validAddress = existingAccountByAddress(address, blockchain);

    if (validAddress.length !== 0 && transactionPool.transactions.length !== 0) {
        transactionPool.transactions.forEach(transaction => {
            transactionList.push(transaction);
        });
        if (transactionList.length !== 0) {
            return transactionList.filter(transaction => transaction.input.sender === address);
        }
    }
    return [];
};

module.exports = {
    requestForAccountCreation,
    createTransactionRequest,
    getMinedReceivedTransactionsByAddress,
    getPendingSentTransactionsByAddress
};


// Sign IN to Wallet
// Show Balance
// Tranfers
// View respective transactions