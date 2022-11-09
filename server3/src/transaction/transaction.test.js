const Transaction = require('./Transaction.js');
const SignOrVerify = require('./signOrVerify.js')
const Wallet = require('../wallet/wallet.js');

describe('Transaction', () => {
    let transaction, wallet, recipient, amount;

    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13nt';
        transaction = Transaction.newTransaction(wallet, recipient, amount, "reamark");
    });

    it('outputs the `amount` substracted from the wallet balance', () => {

        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount);
    });

    it('outputs the `amount` added to the recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount)
            .toEqual(amount);
    });

    it('inputs the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    it('validates a valid transaction', () => {
        expect(SignOrVerify.verifyTransaction(transaction)).toBe(true);
    });



    // it('invalidates the corrupt transaction', () => {
    //   transaction.outputs[0].amount = 50000;
    //   expect(SignOrVerify.verifyTransaction(transaction)).toBe(false);
    // });

    describe('transacting with an amount that exceeds the balance', () => {
        beforeEach(() => {
            amount = 50000;
            transaction = Transaction.newTransaction(wallet, recipient, amount, "this is remark");
        });

          it('does not create the transaction', () => {
            expect(transaction).toEqual(undefined);
          });

        });

        describe('and updating a transaction', () => {
          let nextAmount, nextRecipient;

          beforeEach(() => {
            nextAmount = 20;
            nextRecipient = 'n3xt-addr355';
            transaction = transaction.update(wallet, nextRecipient, nextAmount);
          })

          it(`substracts the next amount from the sender's output`, () => {
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount - nextAmount);
          })

          it(`outputs and amount for the next recipient`, () => {
            expect(transaction.outputs.find(output => output.address === nextRecipient).amount)
            .toEqual(nextAmount);
          })

        });

    });