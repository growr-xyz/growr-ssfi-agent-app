import { encrypt as ethEncrypt } from "eth-sig-util";

class EncryptionManager {
  getEncryptionPublicKey;
  decryptInWallet;
  constructor({ getEncryptionPublicKey, decrypt }) {
    this.getEncryptionPublicKey = getEncryptionPublicKey;
    this.decryptInWallet = decrypt;
  }

  decrypt = (data) => {
    const parsedData = data.replaceAll(",", "");

    const hexaRegex = /^0x[0-9a-fA-F]+$/;

    // if not an hexadecimal, it means it is not encrypted, return the same data
    if (!this.decryptInWallet || !hexaRegex.test(parsedData))
      return Promise.resolve(parsedData);

    const cipherText = Buffer.from(parsedData.substr(2), "hex").toString(
      "utf8"
    );

    // we assume that if the text contains "version":"x25519-xsalsa20-poly1305", it is a cipherText that can be decrypted in a wallet.
    // more information in https://docs.metamask.io/guide/rpc-api.html#eth-getencryptionpublickey
    if (cipherText.indexOf('"version":"x25519-xsalsa20-poly1305"') > 0)
      return this.decryptInWallet(parsedData);

    return Promise.resolve(parsedData);
  };

  encrypt = (data) => {
    if (!this.getEncryptionPublicKey) return Promise.resolve(data);

    return this.getEncryptionPublicKey()
      .then((publicKey) =>
        ethEncrypt(publicKey, { data }, "x25519-xsalsa20-poly1305")
      )
      .then(
        (cipher) =>
          `0x${Buffer.from(JSON.stringify(cipher), "utf8").toString("hex")}`
      );
  };

  static fromWeb3Provider(provider) {
    return provider
      .request({
        method: "eth_accounts",
      })
      .then(
        (accounts) =>
          new EncryptionManager({
            getEncryptionPublicKey: () =>
              provider.request({
                method: "eth_getEncryptionPublicKey",
                params: [accounts[0]],
              }),
            decrypt: (cipher) =>
              provider.request({
                method: "eth_decrypt",
                params: [cipher, accounts[0]],
              }),
          })
      );
  }
}

export default EncryptionManager;
