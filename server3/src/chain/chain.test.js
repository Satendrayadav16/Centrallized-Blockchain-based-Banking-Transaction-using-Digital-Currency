const Blockchain = require('./chain.js');
const Block = require('../block/block.js');

/**
 * @name: Chain
 * @purpose - To test the chain
 */
describe('Chain Test', () => {

    let blockChain, blockchain1;

    beforeEach(() => {
        blockChain = new Blockchain();
        blockchain1 = new Blockchain();
    });


    it('starts with the genesis block', () => {
        expect(blockChain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = 'foo';
        const transactionList = [];
        const accountList = [];
        blockChain.addBlock(data, transactionList, accountList);
        expect(blockChain.chain[blockChain.chain.length - 1].blockData).toEqual(data);
    });

    it('validates a valid chain', () => {
        blockchain1.addBlock('foo',[], []);
        expect(blockChain.isValidChain(blockchain1.chain)).toBe(true);
    });

    it('invalidates a chain with a corrupt genesis block', () => {
        blockchain1.chain[0].blockData = 'Bad data';

        expect(blockChain.isValidChain(blockchain1.chain)).toBe(false);
    });

    it('invalidates a corrupt chain', () => {
        blockchain1.addBlock('foo',[]);
        blockchain1.chain[1].blockData = 'not foo';

        expect(blockChain.isValidChain(blockchain1.chain)).toBe(false);
    });

    it('replaces the chain with a valid chain', () => {
        blockchain1.addBlock('goo',[],[]);
        blockChain.replaceChain(blockchain1.chain);

        expect(blockChain.chain).toEqual(blockchain1.chain);
    });

    it('does not replace the chain with one of less than or equal length', () => {
        blockChain.addBlock('foo',[]);
        const blockChainLength = blockChain.chain.length;
        blockChain.replaceChain(blockchain1.chain);

        expect(blockChain.chain.length).toEqual(blockChainLength);
    });
});
