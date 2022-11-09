const TransactionPool = require('./Transaction-pool.js');
const Transaction = require('./Transaction.js');
const Wallet = require('../wallet/wallet.js');
const Blockchain = require('../chain/chain.js');

describe('TransactionPool', () => {
    let transactionPool, wallet, transaction, blockchain;

    beforeEach( () => {
        transactionPool = new TransactionPool();
        blockchain = new Blockchain();
        wallet = new Wallet();
        transaction = wallet.createTransaction('r4nd-4dr355', 30, blockchain, transactionPool);
    });

    it('adds a transaction to the pool', () => {
        expect(transactionPool.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
    });

    // it('updates a transaction in the pool', () => {
    //     const oldTransaction = JSON.stringify(transaction);
    //     const newTransaction = transaction.update(wallet, 'foo-4ddr355', 40);
    //     transactionPool.updateOrAddTransaction(newTransaction);
    //
    //     expect(JSON.stringify(transactionPool.transactions.find(t => t.id === newTransaction.id)))
    //     .not.toEqual(oldTransaction);
    // });
    //
    // it('confirms that a transaction by a wallet exists', () => {
    //     expect(transactionPool.existingTransaction(wallet.publicKey)).toEqual(transaction);
    //   });
    //
    // it('clears transactions', () => {
    //     transactionPool.clear();
    //     expect(transactionPool.transactions).toEqual([]);
    // });
    //
    // describe('mixing valid and corrupt transactions', () => {
    //     let validTransactions;
    //
    //     beforeEach(() => {
    //         validTransactions = [...transactionPool.transactions];
    //         for (let i=0; i<6; i++ ){
    //             wallet = new Wallet();
    //             transaction = wallet.createTransaction('r4nd-4dr355', 30, blockchain, transactionPool);
    //             if(i%2 == 0) {
    //                 transaction.input.amount = 9999;
    //             } else {
    //                 validTransactions.push(transaction);
    //             }
    //         }
    //     });
    //
    //     it('shows a difference between valid and corrupt transactions', () => {
    //         expect(JSON.stringify(transactionPool.transactions)).not.toEqual(JSON.stringify(validTransactions));
    //     });
    //
    //     it('grabs valid transactions', () => {
    //         expect(transactionPool.validTransactions()).toEqual(validTransactions);
    //     });
    // });
});