import AsymmetricEncryptionManager from "./encryption-manager/asymmetric";
import SignerEncryptionManager from "./encryption-manager/with-signer";

// service errors
const SERVICE_MAX_STORAGE_REACHED = "MAX_STORAGE_REACHED";

// errors
const MAX_STORAGE_REACHED = "Max storage reached";
const AUTHENTICATION_ERROR = "Authentication error";
const UNKNOWN_ERROR = "Unknown error";

class IPFSCpinnerClient {
  authManager;
  encryptionManager;

  constructor(config) {
    this.config = config;
    this.authManager = config.authManager;
    this.encryptionManager = config.encryptionManager;
  }

  async get({ key }) {
    try {
      const encrypted = await this.authManager
        .get(`${this.config.serviceUrl}/content/${key}`)
        .then((res) => res.status === 200 && res.data);
      console.log("dataVault get encrypted result: ", encrypted);

      return Promise.all(
        encrypted.map(({ id, content }) => {
          console.log("content ", content);
          return this.encryptionManager
            .decrypt(content)
            .then((decrypted) => ({ id, content: decrypted }));
        })
      );
    } catch (err) {
      this.errorHandler(err);
    }
  }

  getKeys() {
    const { serviceUrl } = this.config;

    return this.authManager
      .get(`${serviceUrl}/keys`)
      .then((res) => res.status === 200 && !!res.data && res.data.keys)
      .catch(this.errorHandler);
  }

  getStorageInformation() {
    const { serviceUrl } = this.config;

    return this.authManager
      .get(`${serviceUrl}/storage`)
      .then((res) => res.status === 200 && res.data)
      .catch(this.errorHandler);
  }

  getBackup() {
    const { serviceUrl } = this.config;

    return this.authManager
      .get(`${serviceUrl}/backup`)
      .then((res) => res.status === 200 && res.data)
      .catch(this.errorHandler);
  }

  create(payload) {
    const { content, key } = payload;
    const { serviceUrl } = this.config;

    return this.encryptionManager
      .encrypt(content)
      .then((encrypted) =>
        this.authManager.post(`${serviceUrl}/content/${key}`, {
          content: encrypted,
        })
      )
      .then((res) => res.status === 201 && res.data)
      .catch(this.errorHandler);
  }

  delete(payload) {
    const { key, id } = payload;
    const { serviceUrl } = this.config;
    const path = id ? `${key}/${id}` : key;

    return this.authManager
      .delete(`${serviceUrl}/content/${path}`)
      .then((res) => res.status === 200)
      .catch(this.errorHandler);
  }

  swap(payload) {
    const { key, content, id } = payload;
    const { serviceUrl } = this.config;

    const path = id ? `${key}/${id}` : key;
    return this.encryptionManager
      .encrypt(content)
      .then((encrypted) =>
        this.authManager.put(`${serviceUrl}/content/${path}`, {
          content: encrypted,
        })
      )
      .then((res) => res.status === 200 && res.data)
      .catch(this.errorHandler);
  }

  #errorHandler(err) {
    if (!err.response) throw err; // not axios related

    const { status, data } = err.response;

    switch (status) {
      case 500:
        throw new Error(UNKNOWN_ERROR);
      case 401:
        throw new Error(AUTHENTICATION_ERROR);
      case 400:
        if (data === SERVICE_MAX_STORAGE_REACHED)
          throw new Error(MAX_STORAGE_REACHED);
        throw new Error(data);
      default:
        throw err;
    }
  }
}

export default IPFSCpinnerClient;
export { AsymmetricEncryptionManager, SignerEncryptionManager };
