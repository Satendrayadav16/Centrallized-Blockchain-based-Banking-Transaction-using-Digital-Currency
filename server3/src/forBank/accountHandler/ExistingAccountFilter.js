//existingAccountByCitizenshipNumber
// existingAccountByAccountAdddress


    const existingAccountByCN = (citizenshipNumber, blockchain) => {
        let accountList = [];

        //collect accounts from chain.blocks
        blockchain.chain.forEach(block => block.accounts.forEach(account => {
            accountList.push(account);
        }));

        //find the account by citizenshipNumber
        return accountList.filter(account => account.citizenshipNumber === citizenshipNumber);
    }

    const existingAccountByAddress = (accountAddress, blockchain) => {
        let accountList = [];

        //collect account from chain.blocks
        blockchain.chain.forEach(block => block.accounts.forEach(account => {
            accountList.push(account);
        }));

        //find the account by accountAddress
        return accountList.filter(account => account.accountAddress === accountAddress);
    };




module.exports = { existingAccountByAddress , existingAccountByCN };