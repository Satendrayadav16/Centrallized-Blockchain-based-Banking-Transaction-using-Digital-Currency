const EllipticCurve = require('elliptic').ec;

// Initialize EllipticCurve context
const SECP256K1 = new EllipticCurve('secp256k1');

module.exports = function signatureVerifier(publicKey, signature, message) {
    return SECP256K1.verify(message, signature, publicKey, 'hex' );
}