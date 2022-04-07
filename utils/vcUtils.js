/* eslint-disable no-unused-vars */
// import Eth from 'ethjs-query';
import EthrDID from '@rsksmart/ethr-did';
// import { createJWT } from 'jesse-did-jwt';
// import { fromRpcSig } from 'ethereumjs-util';
const { ethers, Signature } = require('ethers');

const { createVerifiablePresentationJwt } = require('did-jwt-vc');

export const getNetwork = (provider) => new Eth(provider).net_version();
export const getAccounts = (provider) => new Eth(provider).accounts();

export const getAccountAndNetwork = (provider) =>
  Promise.all([
    getAccounts(provider).then((accounts) => accounts[0]),
    getNetwork(provider).then((chainId) => parseInt(chainId))
  ]);

/**
 * Create Identity
 * @param address address for the did
 * @param chainId chainId

 */
 export const createDidFormat = (address, chainId) => {
  switch (chainId) {
    case 1: return `did:ethr:${address}`
    case 3: return `did:ethr:ropsten:${address}`
    case 4: return `did:ethr:rinkeby:${address}`
    case 5: return `did:ethr:goerli:${address}`
    case 30: return `did:ethr:rsk:${address}`
    case 31: return `did:ethr:rsk:testnet:${address}`
    case 42: return `did:ethr:kovan:${address}`
    case 5777: return `did:ethr:development:${address}`
    case 31337: return `did:ethr:rsk:testnet:${address}`
    default: return address
  }
};

export const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  // var jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').split('').map(function(c) {
  //   return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  // }).join(''));

  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export const createPresentation = async(provider, account, jwt) => {
  console.log('createPresentation', jwt, provider);
	const signer = provider.getSigner(account);
  // console.log('signer', signer);

  const vpPayload = {
    vp: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation'],
      verifiableCredential: [jwt], // TODO: To support more than one credential, we should change jwt to jwts (array of JWTs)
      nbf: Math.floor(new Date().getTime() / 1000),
      exp: Math.floor(new Date().getTime() / 1000) + 3600
    }
  };
  console.log('vpPayload', vpPayload);

  const signerFunction = async(data) => {
    // const hexData = await signer.signMessage(JSON.stringify(data));
    const hexData = await signer.signMessage(data);
    console.log('hex data', hexData);

    const sig = ethers.utils.splitSignature(hexData);
    console.log('sig split', sig);

    const { v, r, s } = sig;
    const result = {
      r: r.split('0x')[1],
      s: s.split('0x')[1],
      recoveryParam: v
    };
    console.log('signer result', result);
    
    return result;
  };

  const { chainId } = await provider.getNetwork();
  console.log(chainId);
  const did = createDidFormat(account, chainId);
  console.log('did', did);

  // const signedPresentation = await signer.signMessage(JSON.stringify(vpPayload));
  const ethrDid = new EthrDID({address: account, provider, signer: signerFunction});
  console.log('ethrDid', ethrDid);
  return createVerifiablePresentationJwt(vpPayload, ethrDid);
  // return vpVwt;
  // return signedPresentation;
  // return createJWT(vpPayload, { alg: 'ES256K', issuer: did, signer })
};