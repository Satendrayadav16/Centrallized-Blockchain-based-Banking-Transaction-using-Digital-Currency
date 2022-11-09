const EllipticCurve = require('elliptic').ec;

// Initialize EllipticCurve context
const SECP256K1 = new EllipticCurve('secp256k1');

// Generate Keys
module.exports = function genKeyPair() {
    return SECP256K1.genKeyPair();
}
