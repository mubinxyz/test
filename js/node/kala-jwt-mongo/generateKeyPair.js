/**
 * This module will generate a public and private keypair and save to current directory
 *
 * Make sure to save the private key elsewhere after generated!
 */
const crypto = require("crypto");
const fs = require("fs");

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  fs.writeFileSync(__dirname + "/id_rsa_pub.pem", keyPair.publicKey);

  fs.writeFileSync(__dirname + "/id_rsa_priv.pem", keyPair.privateKey);
}

genKeyPair();
