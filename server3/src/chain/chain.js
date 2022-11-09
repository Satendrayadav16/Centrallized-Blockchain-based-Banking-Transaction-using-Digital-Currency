const Block = require('../block/block');
const mine = require('../block/mine');
const blockHashGenerator = require('../utility/blockHashGenerator.js');
const {putETCD} = require("../../userWallet/etcd");

// Create Chain
class Chain {
    constructor() {
        //add genesis in chain first
        this.chain = [Block.genesis()];
    };

    // now add new block after genesis
    async addBlock(data, transactions, accounts) {
        //pass arguments of last block and transaction data to mineblock() function
        const newBlock = await mine(
            this.chain[this.chain.length - 1],
            data,
            transactions,
            accounts
        );


        this.chain.push(newBlock);
        await putETCD(this.chain);

        return newBlock;
    };

    //chain validator
    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];

            if (block.parent_hash !== lastBlock.hash || block.hash !== blockHashGenerator(block)) {
                return false;
            }
        }
        return true;
    }

    // replacing by longest chain
    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
            console.log('Received chain is not longer than the current chain.');
            return;
        } else if (!this.isValidChain(newChain)) {
            console.log('The received chain is not valid.');
            return;
        }

        console.log('Replacing blockchain with the new chain.')
        this.chain = newChain;
    }

}

module.exports = Chain;