const Block = require('./block');
const sha256 = require("../utility/hashGenerator.js");
const MerkleTree = require("../block/merkletree.js");
const SIZEOF = require("object-sizeof");

module.exports = async function mineBlock(lastBlock, data, transactionList, accountList) {

    const parent_hash = lastBlock.hash;
    const blockHeight = lastBlock.blockHeight + 1;
    const timestamp = Date.now();
    const blockData = data;
    // const merkleTree = new MerkleTree();
    // const merkle_root = merkleTree.createTree(transactionList);

    if (transactionList.transactions) {
        transactionList = transactionList.transactions
    }
    const transactions = transactionList;
    const merkleTree = new MerkleTree();
    // const merkle_root = merkleTree.createTree(transactionList);

    let merkle_root;

    if (transactionList.length === 0) {
        merkle_root = [['No Transactions Available In This Block. So, No Merkle Root']]
    } else {
        merkle_root = merkleTree.createTree(transactionList);
    }

    const hash = sha256(`${blockHeight}${merkle_root[0][0]}${parent_hash}${timestamp}${blockData}`);

    let temp = {
        "blockHeight":blockHeight,
        "transactions": transactionList,
        "hash":hash,
        "parent_hash":parent_hash,
        "merkle_root":merkle_root,
        "timeStamp":timestamp,
        "blockData":blockData,
        "accounts":accountList
    }

    const size = `${SIZEOF(temp)} Bytes`;


    return new Block(
        blockHeight,
        transactions,
        size,
        hash,
        parent_hash,
        merkle_root[0][0],
        timestamp,
        blockData,
        accountList
    );

};