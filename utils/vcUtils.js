/* eslint-disable no-unused-vars */
// import Eth from 'ethjs-query';
import EthrDID from '@rsksmart/ethr-did';
import { createJWT } from 'jesse-did-jwt';
// import { fromRpcSig } from 'ethereumjs-util';
const { ethers } = require('ethers');

const { createVerifiablePresentationJwt } = require('did-jwt-vc');

export const getNetwork = (provider) => new Eth(provider).net_version();
export const getAccounts = (provider) => new Eth(provider).accounts();

export const getAccountAndNetwork = (provider) =>
  Promise.all([
    getAccounts(provider).then((accounts) => accounts[0]),
    getNetwork(provider).then((chainId) => parseInt(chainId))
  ]);


export const createDidMethod = (chainId) => {
  switch (chainId) {
    case 1: return 'ethr'
    case 3: return 'ethr:ropsten'
    case 4: return 'ethr:rinkeby'
    case 5: return 'ethr:goerli'
    case 30: return 'ethr:rsk'
    case 31: return 'ethr:rsk:testnet'
    case 42: return 'ethr:kovan'
    case 5777: return 'ethr:development'
    case 31337: return 'ethr:rsk:testnet'
    default: return 'ethr:rsk'
  }
};

/**
 * Create Identity
 * @param address address for the did
 * @param chainId chainId

 */
export const createDidFormat = (address, chainId) => {
  const method = createDidMethod(chainId);
  return `did:${method}:${address}`;
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
  const ethrDid = new EthrDID({address: account, method: 'ethr:rsk:testnet', provider, signer: signerFunction});
  console.log('ethrDid', ethrDid);
  // return createVerifiablePresentationJwt(vpPayload, ethrDid);
  // return vpVwt;
  // return signedPresentation;
  console.log('createJWT');
  return createJWT(vpPayload, { alg: 'ES256K', issuer: did, signer: signerFunction })
};