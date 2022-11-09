const sha256 = require("./hashGenerator.js");

const blockHashGenerator = (block) => {

    return sha256(`${block.blockHeight}${block.merkle_root}${block.parent_hash}${block.timestamp}${block.blockData}`);
}
module.exports = blockHashGenerator;