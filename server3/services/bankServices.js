const {existingAccountByAddress} = require("../src/forBank/accountHandler/ExistingAccountFilter");
const Transaction = require("../src/transaction/Transaction");
const transactionValidator = require('../src/transaction/transactionValidator');

const verifyUserAccount = (account, unverifiedAccountList, verifiedAccountList) => {

    let existAccount = unverifiedAccountList.unverifiedAccounts.find(ac => ac.accountAddress === account);

    if (existAccount) {
        verifiedAccountList.verifyAccount(existAccount, unverifiedAccountList);
        return true;
    } else {
        throw new Error('There is no request pending for account creation');
    }
};

// It is for block mining. Block mining function is called by Bank.
const mineBlock = async(transactionPool, blockchain, verifiedAccountList, initialTransactionList) => {
    if (transactionPool.transactions.length === 0 && verifiedAccountList.verifiedAccounts.length === 0 && initialTransactionList.transactions.length === 0) {
        return null;
        // throw new Error('Cannot mine empty block with no transaction or account');
    } else {
        let tp = transactionValidator(transactionPool);
        // data type of tp === transactionpool.transactions as tp is after validation that returns changing data type

        let tp1;

        if (tp.length !== 0  || initialTransactionList.transactions) {

            if (tp.length === 0) {
                tp1 = initialTransactionList.transactions
            } else {
                tp1 = tp
            }
        } else if (tp.transactions && initialTransactionList.transactions) {
            tp1 = tp.concat(initialTransactionList.transactions)
        }

        tp1.forEach(t => {
            t.blockNumber = blockchain.chain.length
        })

        let data = 'This is CBBDT server mining this block.'
        const block = await blockchain.addBlock(data, tp1, verifiedAccountList.verifiedAccounts);
        verifiedAccountList.verifiedAccounts = [];
        transactionPool.transactions = [];
        initialTransactionList.transactions = [];

        return block;
    }
};

// Initial account transaction
const initialAccountTransaction = (sender, receiver, amount, signature, blockchain, initialTransactionList, remarks, balance) => {

    let receiverExists = existingAccountByAddress(receiver, blockchain);
    // let senderExists = existingAccountByAddress(sender, blockchain);

    if (receiverExists.length !==0) {

        // transaction in transaction list of particular address
        const transaction = initialTransactionList.transactions.find(t => t.input.sender === sender);


        // if transaction exists present then update
        if (transaction) {
            const senderOutput = transaction.outputs.find(output => output.address === sender);
            if (amount > senderOutput.amount) {
                console.log(`Amount: ${amount} exceeds balance.`);
                return;
            }
            senderOutput.amount = senderOutput.amount - amount;
            transaction.outputs.push({amount, address: receiver});
            Transaction.transactionWithInput(transaction, balance, sender, signature);
        } else {
            let newTransaction = Transaction.newTransaction(sender, receiver, amount, signature, blockchain, balance, remarks);
            initialTransactionList.updateOrAddTransaction(newTransaction);
        }
    } else {
        throw new Error('Account does not Exist');
    }
    return true;
};


module.exports = {verifyUserAccount, mineBlock, initialAccountTransaction};


//Issue coins
// validate account
// Total coins in market (calculate except banks)
// own balance
// Filter (by block, by address, by transaction)
// view address details