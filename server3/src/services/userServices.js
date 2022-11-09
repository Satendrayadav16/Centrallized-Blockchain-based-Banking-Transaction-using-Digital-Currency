// const keyGenerator = require('../utility/keypairGenerator')
//
// function test() {
// return keyGenerator();
// }
//
// console.log(test()===test())

const EllipticCurve = require('elliptic').ec;

// Initialize EllipticCurve context
const EC = new EllipticCurve('secp256k1');
const A = EC

const key = EC.genKeyPair()
console.log(key.getPrivate('hex'));
console.log(key.getPublic().encode('hex'))




