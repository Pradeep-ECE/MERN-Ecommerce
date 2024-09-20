const cryptoJs = require('crypto-js');

const encrypt = async function(plaintext){
    let cipherText;
    console.log('check13',CONFIG);
    cipherText = cryptoJs.AES.encrypt(plaintext.toString(),CONFIG.secretKey).toString();
    return cipherText;
};
module.exports.encrypt = encrypt;

const decrypt = async function(cipherText){
    let plaintext;
    const bytes = cryptoJs.AES.decrypt(cipherText.toString(),CONFIG.secretKey);
    plaintext = bytes.toString(cryptoJs.enc.Utf8);
    return plaintext;
};

module.exports.decrypt = decrypt;