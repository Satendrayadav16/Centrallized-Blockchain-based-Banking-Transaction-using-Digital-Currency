const SignOrVerify = require("./signOrVerify");

    const transactionValidator = (tp) => {
    return tp.transactions.filter(transaction => {
        const outputTotal = transaction.outputs.reduce((total, output) => {
            return total + output.amount;
        }, 0);

        if (transaction.input.amount !== outputTotal) {
            console.log(`Invalid transaction from ${transaction.input.sender}.`);
            return;
        }

        let message = `${transaction.input.sender}${transaction.remark}`;

        if (!SignOrVerify.verifyTransaction(transaction, message)) {
            console.log(`Invalid signature from ${transaction.input.sender}.`);
            return;
        }


        return transaction;
    });
}

module.exports = transactionValidator;