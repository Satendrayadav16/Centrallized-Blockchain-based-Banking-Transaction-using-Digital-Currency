const MerkelTree = require("./merkletree.js");
const TransactionList = require("../transaction/Transaction-pool.js");
const Transaction = require("../transaction/Transaction.js");
const Block = require("./block.js");

describe('Merkel Tree', () => {

    let transactionList = new TransactionList();
    const merkelTree = new MerkelTree();

    for (let i = 0; i < 4; i++) {
            transactionList.updateOrAddTransaction(new Transaction(Math.random(), Math.random(), Math.random()));
        }
        if (transactionList.transactions) {
            transactionList = transactionList.transactions
        }

    it('for valid transaction', () => {
        const merkles = merkelTree.createTree(transactionList);

        const block = new Block(0,
            transactionList,
            'initial hash',
            'No parent hash',
            'empty merkle root',
            merkles[0][0],
            'nonce0',
            'this is data',
            123,
            []);

        expect(merkelTree.verifyMerkleTransaction(transactionList[2])).toEqual(true);
    });

    it('tampered transaction', () => {
        merkelTree.createTree(transactionList);
        transactionList[2] = "randomGuy";
        expect(merkelTree.verifyMerkleTransaction(transactionList[2])).toEqual(false);
    });

});