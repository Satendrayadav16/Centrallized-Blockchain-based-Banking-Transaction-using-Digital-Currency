class UnverifiedAccounts {
    constructor() {
        this.unverifiedAccounts = [];
    };

    addUnverifiedAccount(account) {

        // one citizenship number one account logic implementation remaining
        let accountUnverified = this.unverifiedAccounts.find(a => a.accountAddress === account.accountAddress);
        if (!accountUnverified) {
            this.unverifiedAccounts.push(account);
        } else {
            throw new Error('Account already exists, review remaining from Bank side')
        }
    }

}

module.exports = UnverifiedAccounts;