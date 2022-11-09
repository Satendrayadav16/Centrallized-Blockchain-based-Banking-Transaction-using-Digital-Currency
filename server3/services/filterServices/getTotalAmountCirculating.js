module.exports = function(blockchain, address) {

    let totalAmount = 0;

    blockchain.chain.forEach(block => {
        if(block.transactions.length !== 0){
            block.transactions.forEach(transaction => {
                if(transaction.input.sender === address)
                totalAmount += transaction.input.amount;
            })
        }
    });
    return totalAmount;
}