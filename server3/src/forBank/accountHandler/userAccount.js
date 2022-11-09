// const Account = require('./Account.js');
// const genKeyPair = require("../../utility/keypairGenerator.js");
//
// module.exports = function requestForAccountCreation(name, citizenshipNumber, unverifiedAccounts) {
//
//     if (name && citizenshipNumber) {
//         const keyPair = genKeyPair();
//         const publicAddress = keyPair.getPublic().encode('hex');
//         let account = new Account(name.toUpperCase(), citizenshipNumber, publicAddress);
//         // push to the unverified account
//         unverifiedAccounts.addUnverifiedAccount(account);
//         console.log(keyPair.getPublic());
//         console.log(keyPair.getPrivate());
//         return "keyPair.getPrivate()";
//     } else {
//         throw new Error('Name or Citizenship Number is missing');
//     }
// }
//
// //called by user while account creation request by the user.