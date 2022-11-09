const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const UnverifiedAccounts = require('../src/forBank/accountHandler/UnverifiedAccounts');
const Blockchain = require('../src/chain/chain.js');
const VerifiedAccounts = require('../src/forBank/accountHandler/VerifiedAccounts');
const TransactionPool = require('../src/transaction/Transaction-pool');
const {
    requestForAccountCreation,
    createTransactionRequest,
    getMinedReceivedTransactionsByAddress,
    getPendingSentTransactionsByAddress
} = require('../services/userServices');
const {existingAccountByCN, existingAccountByAddress} = require('../src/forBank/accountHandler/ExistingAccountFilter');
const {
    verifyUserAccount, mineBlock,
    initialAccountTransaction
} = require('../services/bankServices');
const balanceCalculator = require('../src/transaction/balanceCalculator');
const getAllTransactions = require('../services/filterServices/getAllTransactions');
const getTransactionByHash = require('../services/filterServices/getTransactionByHash');
const getBlockByHash = require('../services/filterServices/getBlockByHash');
const getBlockByHeight = require('../services/filterServices/getBlockByHeight');
const getTotalAmountCirculating = require('../services/filterServices/getTotalAmountCirculating');
const getTransactionByBlockHeight = require('../services/filterServices/getTransactionByBlockHeight');
const getAllAccounts = require('../services/filterServices/getAllAccounts');
const {signIn} = require('../models/mongo');

const EllipticCurve = require('elliptic').ec;

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const blockchain = new Blockchain();
const unVerifiedAccountList = new UnverifiedAccounts();
const verifiedAccountList = new VerifiedAccounts();
const transactionPool = new TransactionPool();
const initialTransactionList = new TransactionPool();


app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded());

// endpoints for Bank

app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.get('/UA', (req, res) => {
    res.json(unVerifiedAccountList.unverifiedAccounts);
});

//req is citizenshipNumber
app.post('/ABC', (req, res) => {
    const {citizenshipNumber} = req.body;
    res.json(existingAccountByCN(citizenshipNumber, blockchain));
});

app.post('/ABA', (req, res) => {
    const {address} = req.body;
    res.json(existingAccountByAddress(address, blockchain));
});

app.post('/VA', (req, res) => {
    const {address} = req.body;
    if (verifyUserAccount(address, unVerifiedAccountList, verifiedAccountList)) {
        res.json('Account has been verified');
    } else {
        res.json('Could not verify account');
    }
});

app.post('/bal', (req, res) => {
    const {address} = req.body;

    if (existingAccountByAddress(address, blockchain).length !== 0) {
        let balance = balanceCalculator(blockchain, address);
        res.json(balance);
    } else {
        res.json('Account does not Exist');
        throw new Error('Error, Balance Request : This Address has no Account Created in CBBT ')
    }
});

app.get('/GVA', (req, res) => {
    res.json(verifiedAccountList.verifiedAccounts);
});

app.get('/', (req, res) => {
    res.json('Feri yehi aayau. Yaha kei xaina bhanya haina. /blocks ma jaau  hawa');
});

app.post('/MIT', (req, res) => {
    const {receiver, amount} = req.body;
    let money = amount;
    if (typeof amount === "string") {
        money = parseInt(amount)
    }
    // Call createTransactionRequest of UserServices.
    const EllipticCurve = require('elliptic').ec;

    const EC = new EllipticCurve('secp256k1');

    const prikey = '1facc76aa29749d2ecd30f21660cc34ceb27156bc54217b45e7f659a171a98fa';
    const sender = '04eea9237e54cd2a0ede29a37a3865dc0685ccad6d04415b720b4ee2bed74577118b86223d2365ba9f5c5745d275668e5c836e17f48a12a5ccd951889fa46e813a'
    const remarks = 'This is transaction by Bank'
    const message = `${sender}${remarks}`;

    const signature = EC.sign(message, prikey, 'hex')
    // const {sender, receiver, amount, signature, remarks} = req.body;

    const success = initialAccountTransaction(sender, receiver, money, signature, blockchain, initialTransactionList, remarks, money)
    if (success) {
        res.json('Transaction Pending');
    } else {
        res.json('Retry Transaction, error occured');
    }
});

app.post('/getData', async (req,res) => {
    const {email} = req.body;
    const data = await signIn(email);
    res.json(data);
})


//endpoints for Users

app.post('/CA', (req, res) => {
    // const {name, citizenshipNumber, priKey, puKey} = req.body;

    const {username, email,citizenshipNumber} = req.body;

    if (!username && !email && !citizenshipNumber) {
        throw new Error('Account Creation Data Input Error: Insufficient Data');
    }
    const EC = new EllipticCurve('secp256k1');
    const keyPair = EC.genKeyPair();
    const puKey = keyPair.getPublic().encode('hex');
    const priKey = keyPair.getPrivate('hex');


    const message = `${username}${email}${puKey}`;

    const signature = EC.sign(message, priKey, 'hex');

    const success = requestForAccountCreation(username, email, citizenshipNumber, puKey, signature, unVerifiedAccountList);
    

    if (success) {
        const data = {
            publicKey: puKey,
            privateKey: priKey
        }
        res.send(data);
    } else {
        res.json('Retry');
    }
});

app.post('/SM', (req, res) => {

    // Call createTransactionRequest of UserServices.
    const {sender, receiver, amount, priKey, remarks} = req.body;

    let money = amount;
    if (typeof amount === "string") {
        money = parseInt(amount)
    }

    const EC = new EllipticCurve('secp256k1');
    const message = `${sender}${remarks}`;
    const signature = EC.sign(message, priKey, 'hex')

    const success = createTransactionRequest(sender, receiver, money, signature, blockchain, transactionPool, remarks);
    if (success) {
        res.json('Transaction Pending');
    } else {
        res.json('Retry');
    }
});

app.get('/ITP', (req, res) => {
    res.json(initialTransactionList);
})

app.get('/TP', (req, res) => {
    res.json(transactionPool);
})

// app.get('/mine', (req, res) => {
//     function yourFunction() {
//         let newBlock = mineBlock(transactionPool, blockchain, verifiedAccountList, initialTransactionList);
//         if(newBlock !== null){
//             res.json(newBlock);
//         } else {
//             let msg = `Still mining at ${Date.now()}`
//             res.json(msg)
//         }
//
//         setTimeout(yourFunction, 5000);
//     }
//
//     yourFunction();
//
// });


// get txs by address
app.post('/gt', (req, res) => {
    const {address} = req.body;

    if (existingAccountByAddress(address, blockchain).length !== 0) {
        let transactions = getMinedReceivedTransactionsByAddress(address, blockchain);
        res.json(transactions);
    } else {
        res.send([])
        throw new Error('Error, Balance Request : This Address has no Account Created in CBBT ')
    }
});

// get pending received transactions
app.post('/pst', (req, res) => {
    const {address} = req.body;

    if (existingAccountByAddress(address, blockchain).length !== 0) {
        let transactions = getPendingSentTransactionsByAddress(address, blockchain, transactionPool);
        res.json(transactions);
    } else {
        res.json('Account does not Exist');
        throw new Error('Error, Balance Request : This Address has no Account Created in CBBT ')
    }
});

// endpoints for filter services
app.get('/getAllTransactions', (req, res) => {
    let transactionList = getAllTransactions(blockchain);
    res.json(transactionList);
});

app.post('/getTransactionByHash', (req, res) => {
    let {hash} = req.body;
    let transactionList = getTransactionByHash(blockchain, hash);
    res.json(transactionList);
});


app.post('/getBlockByHash', (req, res) => {
    let {hash} = req.body;
    let blockList = getBlockByHash(blockchain, hash);
    res.json(blockList);
});

app.post('/getBlockByHeight', (req, res) => {
    let {height} = req.body;
    let blockList = getBlockByHeight(blockchain, height);
    res.json(blockList);
});

app.get('/getTotalAmountCirculating', (req, res) => {
    let address = '04eea9237e54cd2a0ede29a37a3865dc0685ccad6d04415b720b4ee2bed74577118b86223d2365ba9f5c5745d275668e5c836e17f48a12a5ccd951889fa46e813a'
    res.json(getTotalAmountCirculating(blockchain, address));
});

app.post('/getTransactionByBlockHeight', (req, res) => {
    let {height} = req.body;
    let transactionList = getTransactionByBlockHeight(blockchain, height);
    res.json(transactionList);
});

app.post('/removeAccountCreationRequest', (req, res) => {
    let {address} = req.body;
    let existAccount = unVerifiedAccountList.unverifiedAccounts.find(ac => ac.accountAddress === address);
    if (existAccount) {
        unVerifiedAccountList.unverifiedAccounts = unVerifiedAccountList.unverifiedAccounts.filter(a => a.accountAddress !== address);
        res.json('Successfully deleted');
    } else {
        throw new Error('No Account Creation Requests for particular address');
    }
});

app.post('/getUnverifiedAccountByAddress', (req, res) => {
    let {address} = req.body;
    let existAccount = unVerifiedAccountList.unverifiedAccounts.find(ac => ac.accountAddress === address);
    if (existAccount) {
        res.json(existAccount);
    } else {
        throw new Error('No Account Creation Requests for particular address');
    }
});

app.get('/getAllAccount', (req, res) => {
    let accountList = getAllAccounts(blockchain);
    res.json(accountList);
});


//Listen

function yourFunction() {
    mineBlock(transactionPool, blockchain, verifiedAccountList, initialTransactionList);

    setTimeout(yourFunction, 5000);
}

yourFunction();

app.listen(HTTP_PORT, () => {
    console.log(`Server is running on port http://localhost:${HTTP_PORT}`)
});