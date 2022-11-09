const sha256 = require('../utility/hashGenerator.js');

/**
 * @name Block
 * @class
 * @summary Initializes the block with provide block blockData
 */

class Block {
    /**
     * @Summary Constructor is to initialize the Block
     * @constructor
     *
     * @param {int} blockHeight - block blockHeight
     * @param transactions - transactions with in the block
     * @param size - size of block
     * @param hash - hash of the block
     * @param parent_hash - hash of the previous block
     * @param merkle_root - final root of generated merkle tree
     * @param timestamp - time at which block was created
     * @param blockData - blockData
     * @param accounts - stores the data of accounts associated to the system chain
     */
    constructor(blockHeight,
                transactions,
                size,
                hash,
                parent_hash,
                merkle_root,
                timestamp,
                blockData,
                // nonce,
                accounts) {

        this.blockHeight = blockHeight;
        this.transactions = transactions;
        this.size = size;
        this.hash = hash;
        this.parent_hash = parent_hash;
        this.merkle_root = merkle_root;
        this.timestamp = timestamp;
        this.blockData = blockData;
        // this.nonce = nonce;
        this.accounts = accounts;
    }

    /**
     * @name toString
     * @method
     *
     * @returns: Data present with in a block in the form of String blockData type
     */

    toString() {
        return `Block -
         blockHeight : ${this.blockHeight}
         transactions : ${this.transactions}
         block hash : ${this.hash}
         parent hash : ${this.parent_hash}
         merkle root : ${this.merkle_root}
         timestamp : ${this.timestamp} 
         size : ${this.size}
         blockData: ${this.blockData}
         accounts: ${this.accounts}
          `;
    }

    /**
     * @name  genesis
     * @method
     *
     * @summary - makes the genesis block .i.e first block of the block chain
     * @summary - runs immediately after constructor call
     */
    static genesis() {
        return new this(
            0,
            [
        {
            "id": "d4d3d8f0337f11ed877aed1cea93021c",
            "input": {
                "timestamp": 1663085964287,
                "amount": 50000,
                "sender": "04eea9237e54cd2a0ede29a37a3865dc0685ccad6d04415b720b4ee2bed74577118b86223d2365ba9f5c5745d275668e5c836e17f48a12a5ccd951889fa46e813a",
                "signature": {
                    "r": "5525a074ecb017f1c09ed3ffe479769b4c9fdb9aeb7a630ae358a1bb363c1709",
                    "s": "a827a02c26316dfa1ee5fc11dca265d8d7b0504dbe2b1df70c9bca2c424bc42f",
                    "recoveryParam": 1
                }
            },
            "outputs": [
                {
                    "amount": 0,
                    "address": "04eea9237e54cd2a0ede29a37a3865dc0685ccad6d04415b720b4ee2bed74577118b86223d2365ba9f5c5745d275668e5c836e17f48a12a5ccd951889fa46e813a"
                },
                {
                    "amount": 50000,
                    "address": "049028f154b124f8f6122229358173c231210b4920584f8c5cb7b72d086fe9cd7e0e906e55c8e71714676a0245c184be8174664083a4c01d3096b6188fc845bc00"
                }
            ],
            "remark": "This is transaction by Bank",
            "hash": "82ba233aac14648af2fa1ac560b0f058913b4164779fafffc905a556ac6d3053",
            "blockNumber": 0
        }
    ],
            '1235 Bytes',
            'genesisHash',
            // `Genesis Block Hash: ${sha256('This is Team SAYS working on CBBDC')}`,
            'NO PARENT HASH FOR GENESIS BLOCK',
            'NO TXs in GENESIS BLOCK',
            'Genesis Block is starting',
            ` ----- Message From Team SAYS ::: This is Genesis Block of "Centralized Blockchain Based Digital Transaction". Also, We Team SAYS invite every other developers to work on this Opensource Project.
            `,
            []
        );
    }
}

module.exports = Block;