

//Transaction
const {existingAccountByAddress} = require("../forBank/accountHandler/ExistingAccountFilter");
const {ec: EllipticCurve} = require("elliptic");
const Transaction = require("./Transaction");
const balanceCalculator = require("./balanceCalculator");

const createTransaction = (sender, receiver, amount, signature, remark, transactionPool, blockchain) => {
    let senderExists = existingAccountByAddress(sender, blockchain);
    let receiverExists = existingAccountByAddress(receiver, blockchain);

    if (senderExists && receiverExists) {
        const EC = new EllipticCurve('secp256k1');

        const message = `${sender}${receiver}${amount}${remark}`;
        const verified = EC.verify(message, signature, sender, 'hex');

        if (verified) {
            let transaction = new Transaction();
            // calculate balance function

            const balance = balanceCalculator(blockchain, sender, )
            transaction.newTransaction(balance, sender, outputs, remark, signature, recipient, amount );

        } else {
            throw new Error('invalid request: Verification error');
        }

    } else {
        throw new Error('Could not Send Money, retry');
    }
};

module.exports = { createTransaction };