const Wallet = require('./wallet.js');
const Blockchain = require('../chain/chain.js');
const TransactionPool = require('../transaction/Transaction-pool.js');
const {INITIAL_BALANCE} = require('../config');

describe('Wallet', () => {
    let wallet, bc, tp;

    beforeEach(() => {
        wallet = new Wallet();
        bc = new Blockchain();
        tp = new TransactionPool();
    });

    describe('creating a transaction', () => {
        let transaction, sendAmount, recipient;

        beforeEach(() => {
            sendAmount = 50;
            recipient = 'r4nd0n-4ddr35';
            transaction = wallet.createTransaction(recipient, sendAmount, bc, tp);
        });

        describe('and doing the same transaction', () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, bc, tp);
            });

            it('doubles the `sendAmount` subtracted from the wallet balance', () => {
                // transaction.outputs.find(output => console.log(output.address))
                // console.log(transaction)
                // console.log(transaction)
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                    .toEqual(wallet.balance - 2*sendAmount);
            });

            it('clones the `sendAmount` output for the recipient', () => {
              expect(
                transaction.outputs.filter(output => output.address === recipient)
                  .map(output => output.amount)
              ).toEqual([sendAmount, sendAmount]);
            });
        });
    });

    describe('calculating a balance', () => {
      let addBalance, repeatAdd, blockData, senderWallet;

      beforeEach(() => {
        senderWallet = new Wallet();
        addBalance = 100;
        repeatAdd = 3;
        blockData = "this is block";

        for (let i=0; i<repeatAdd; i++) {
          senderWallet.createTransaction(wallet.publicKey, addBalance, bc, tp);
        }
        bc.addBlock(blockData, tp,[]);
      });

      it('calculates the balance for blockchain transacitons matching the recipient', () => {
        expect(wallet.calculateBalance(bc))
          .toEqual(INITIAL_BALANCE + (addBalance * repeatAdd));
      });

      it('calculates the balance for blockchain transactions matching the sender', () => {
        expect(senderWallet.calculateBalance(bc))
          .toEqual(INITIAL_BALANCE - (addBalance * repeatAdd));
      });
    });
});