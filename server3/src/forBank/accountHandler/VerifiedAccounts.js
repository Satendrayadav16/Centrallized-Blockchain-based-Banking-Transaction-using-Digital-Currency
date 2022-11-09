class VerifiedAccounts {

    constructor() {
        this.verifiedAccounts = [];
    }

    // called by bank for verification
    verifyAccount(account, UnverifiedAccountList) {
       this.verifiedAccounts.push(account);
       UnverifiedAccountList.unverifiedAccounts = UnverifiedAccountList.unverifiedAccounts.filter(a => a.accountAddress !== account.accountAddress);
    }

}

module.exports = VerifiedAccounts;