

//Account Type
class Account {
    constructor(name, citizenshipNumber, publicAddress) {
        this.name = name;
        this.citizenshipNumber = citizenshipNumber;
        this.accountAddress = publicAddress;
        this.role = "USER";
    }

    toString() {
        return `
        --------  Account Detail  --------
        Name : ${this.name}
        Citizenship Number : ${this.citizenshipNumber}
        Account Address  :  ${this.accountAddress}
        `;
    }
}

module.exports = Account;

// create an >> /account api to use register in unverifiedAccount