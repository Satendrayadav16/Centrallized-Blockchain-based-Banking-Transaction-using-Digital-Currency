const hashGenerator = require('../utility/hashGenerator.js');
const {ignoreRoot} = require("nodemon/lib/config/defaults");

class MerkelTree {

    constructor() {
        this.root = [];
    }


    createTree(transactionList) {
        if (transactionList.transactions) {
            transactionList = transactionList.transactions
        }

        if(transactionList.length >1){
        this.root.unshift(transactionList);
        this.root.unshift(transactionList.map(t => {
           t.hash
        }));

        while (this.root[0].length > 1) {

            let temp = [];

            for (let i = 0; i < this.root[0].length; i += 2) {
                if (i < this.root[0].length - 1 && i % 2 === 0) {
                    temp.push(hashGenerator(this.root[0][i] + this.root[0][i + 1]));
                } else temp.push(this.root[0][i]);
            }

            this.root.unshift(temp);
        }
        }
        else {this.root = [[transactionList[0].hash]]}
        return this.root;
    }

    verifyMerkleTransaction(transaction) {
        let position = this.root.slice(-1)[0].findIndex(t => t.hash === transaction.hash);
        console.log("Element found at: " + position);

        if (position) {
            // let verifyHash = hashGenerator(transaction);
            let verifyHash = hashGenerator(`${transaction.id}${transaction.input}${transaction.outputs}${transaction.remark}`);


            for (let i = this.root.length - 2; i > 0; i--) {
                let neighbour = null;
                if (position % 2 === 0) {
                    neighbour = this.root[i][position + 1];
                    position = Math.floor((position) / 2)
                    verifyHash = hashGenerator(verifyHash + neighbour);
                } else {
                    neighbour = this.root[i][position - 1];
                    position = Math.floor((position - 1) / 2)
                    verifyHash = hashGenerator(neighbour + verifyHash);
                }
            }

            console.log(verifyHash === this.root[0][0] ? "Valid" : "Not Valid");

            return verifyHash === this.root[0][0];

        } else {
            console.log("Data not found with the id");
            return false;
        }
    }
}

module.exports = MerkelTree;