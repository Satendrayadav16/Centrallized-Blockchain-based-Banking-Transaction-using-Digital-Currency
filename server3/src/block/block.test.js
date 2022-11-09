const Block = require('./block.js');

/**
* @name: Block
* @purpose - To test the Block
*/
describe('Block', () => {

    /**
     * @name - testing for constructor
     * @testFor - constructor in Block
     * 
     * @checks - block.blockHeight in block should be equal to value passed while Constructor call
     */
    it('testing for construtor', () => {
        const block = new Block(
            0, 
            [],
            'initial hash', 
            'No parent hash', 
            'empty merkle root', 
            [],
            'nonce0',
            'this is data',
            123,
            []
        );

        expect(block.blockHeight)
        .toBe(0);
    });

    /**
     * @name - testing for genesis
     * @testFor Block.genesis()
     * @summary tests if genesis function works or not
     * @checks - block.blockHeight should be value passed while genesis()
     */
    it('testing for genesis', () => {
        const block = Block.genesis();

        expect(block.blockHeight)
        .toBe(0);
    });
});