const account = [];

function getAccount(address) {

    let accountList = ["040a91c8bb83cfa1f0f7a1dcf3b722d70fdf25b538fe67725987d817199ac18042f8451212fabb38f3dbc25186f9a20dc555f8c7363cfa9f46b85bdcbbe704162f", 
"049028f154b124f8f6122229358173c231210b4920584f8c5cb7b72d086fe9cd7e0e906e55c8e71714676a0245c184be8174664083a4c01d3096b6188fc845bc00"];

accountList.forEach(acc => {
    console.log(acc)
    if(acc === address){
        console.log('oh yess')
        account.push(address);
    }
})

}

module.exports = {account, getAccount};