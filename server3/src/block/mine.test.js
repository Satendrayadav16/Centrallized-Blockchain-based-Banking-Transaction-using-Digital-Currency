const mine = require('./mine.js');
const Block = require('./block.js');
const Transaction = require('../transaction/Transaction.js');


/**
 * @name: Mine
 * @purpose - To test the mineBlock function
 */
describe('Mine Block', () => {

    let lastBlock, minedBlock, data, accountList;

    beforeEach(() => {
        lastBlock = Block.genesis();
        data = "Hello Mine test";
        accountList = [];
        minedBlock = mine(lastBlock, data, [new Transaction], accountList);
    });

    /**
     * @name - testing for mine
     * @testFor - mineBlock()
     *
     * @checks - should mine a new block
     */
    it('testing for mineGenerator', () => {
        expect(minedBlock.blockHeight)
            .toBe(1);
    });

});