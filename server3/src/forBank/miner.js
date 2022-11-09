// // It is for block mining. Block mining function is called by Bank.
//
// class Miner {
//     constructor(blockchain, transactionPool, verifiedAccount) {
//         this.blockhain = blockchain;
//         this.transactionPool = transactionPool;
//         this.verifiedAccount = verifiedAccount;
//     }
//
//     mine() {
//         const validTransaction = this.transactionPool.validTransactions();
//         const accountList = this.verifiedAccount;
//
//         const block = this.blockhain.addBlock(validTransaction, accountList);
//         this.verifiedAccount.clear();
//         this.transactionPool.clear();
//
//         return block;
//     }
//
// }
//
// module.exports = Miner;
