// const EllipticCurve = require('elliptic').ec;
//
// const EC = new EllipticCurve('secp256k1');
//
// const prikey = '1facc76aa29749d2ecd30f21660cc34ceb27156bc54217b45e7f659a171a98fa';
// const sender = '04eea9237e54cd2a0ede29a37a3865dc0685ccad6d04415b720b4ee2bed74577118b86223d2365ba9f5c5745d275668e5c836e17f48a12a5ccd951889fa46e813a'
// const receiver = '0486da0817fa5779465b3f9cd94819ec7a673147f246643141deece003302ef9d6fb6ed060391740f969747ac233510eed440f2a899b5f607707a124cdb3906dd0'
// const amount = 200
// const remark = 'This is transaction by Bank'
//         const message = `${sender}${receiver}${amount}${remark}`;
//
// const a = EC.sign(message,prikey,'hex')
//
// console.log(a)

const SIZEOF = require('object-sizeof');

const a = {
        data: [{
                name: "CBDC"
        }]
}

