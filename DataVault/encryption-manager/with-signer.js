import { encrypt, decrypt, generateKeyViaRPC } from "./aes";

class EncryptionManager {
  key;
  macKey;

  constructor(key, macKey) {
    this.key = key;
    this.macKey = macKey;
  }

  encrypt = (data) => Promise.resolve(encrypt(this.key, data, this.macKey));
  decrypt = (cipher) => Promise.resolve(decrypt(this.key, cipher, this.macKey));

  static fromWeb3Provider = (provider) =>
    provider
      .request({
        method: "eth_accounts",
      })
      .then((accounts) => generateKeyViaRPC(provider, accounts[0]))
      .then(({ key, macKey }) => new EncryptionManager(key, macKey));
}

export default EncryptionManager;
