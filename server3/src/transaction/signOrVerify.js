const hashGenerator = require('../utility/hashGenerator');
const signatureVerifier = require('../utility/signatureVerifier');

class SignOrVerify {

    // static signTransaction(transaction, senderWallet) {
    //     transaction.input = {
    //       timestamp: Date.now(),
    //       amount: senderWallet.balance,
    //       sender: senderWallet.publicKey,
    //       signature: senderWallet.sign(hashGenerator(transaction.outputs))
    //     };
    // }

    static verifyTransaction(transaction, message) {
        return signatureVerifier(
            transaction.input.sender,
            transaction.input.signature,
            message
        );
    }

}

module.exports = SignOrVerify;