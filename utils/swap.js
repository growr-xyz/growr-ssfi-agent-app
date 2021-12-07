import Web3 from 'web3';
import Web3Modal from 'web3modal';
import axios from 'axios';
import EventSource from 'eventsource';
// import WalletConnectProvider from '@walletconnect/web3-provider';
import lightningPayReq from 'bolt11';
import { BigNumber as BN } from 'ethers';

const boltzApi = 'https://lnsov.tk:9001';

export const SwapUpdateEvent = {
  InvoicePaid: 'invoice.paid',
  InvoiceSettled: 'invoice.settled',
  InvoiceFailedToPay: 'invoice.failedToPay',

  TransactionFailed: 'transaction.failed',
  TransactionMempool: 'transaction.mempool',
  TransactionClaimed: 'transaction.claimed',
  TransactionRefunded: 'transaction.refunded',
  TransactionConfirmed: 'transaction.confirmed',

  SwapExpired: 'swap.expired',
};

/**
 * Round a amount to 8 decimals and trims unnecessary zeros
 */
 export const roundWholeCoins = coins => {
  return Number(coins.toFixed(8));
};

/**
 * Convert satoshis and litoshis to whole coins
 */
export const toWholeCoins = satoshis => {
  return roundWholeCoins(satoshis / decimals);
};

// Decimals from WEI to 10 ** -8
export const etherDecimals = BN.from(10).pow(BN.from(10));



// Start submarine swap on LN-SOV bridge (Boltz)
export const startSwap = async(swapInfo, setSwapResponse, setSwapStatus) => {
  console.log('startSwap => swapInfo = ', swapInfo);
  const url = `${boltzApi}/createswap`;
  let { pair, invoice, keys } = swapInfo;

  // Trim the "lightning:" prefix, that some wallets add in front of their invoices, if it exists
  if (invoice.slice(0, 10) === 'lightning:') {
    invoice = invoice.slice(10);
  }

  // console.log("submarine swap request: refundPublicKey", keys.publicKey);
  return axios
    .post(url, {
      type: 'submarine',
      pairId: pair.id,
      orderSide: pair.orderSide,
      invoice: invoice,
      refundPublicKey: keys.publicKey,
    })
    .then(response => {
      setSwapResponse(true, response.data);
      // startListening(setSwapStatus, response.data.id, cb);
      // callback();
    })
    .catch(error => {
      const message = error.response.data.error;

      window.alert(`Failed to execute swap: ${message}`);
      setSwapResponse(false, message);
    });
};


// const handleSwapStatus = (data, source, setSwapStatus, callback) => {
//   const status = data.status;

//   switch (status) {
//     case SwapUpdateEvent.TransactionConfirmed:
//       setSwapStatus({
//         pending: true,
//         message: 'Waiting for invoice to be paid...',
//       });
//       break;

//     case SwapUpdateEvent.InvoiceFailedToPay:
//       source.close();
//       setSwapStatus({
//         error: true,
//       pending: false,
//         message: 'Could not pay invoice. Please refund your coins.',
//       });
//       break;

//     case SwapUpdateEvent.SwapExpired:
//       source.close();
//       setSwapStatus({
//         error: true,
//         pending: false,
//         message: 'Swap expired. Please refund your coins.',
//       });
//       break;

//     case SwapUpdateEvent.InvoicePaid:
//     case SwapUpdateEvent.TransactionClaimed:
//       source.close();
//       callback();
//       break;

//     default:
//       console.log(`Unknown swap status: ${JSON.stringify(data)}`);
//       break;
//   }
// };

// export const startListening = (setSwapStatus, swapId, callback) => {
//   const source = new EventSource(`${boltzApi}/streamswapstatus?id=${swapId}`);

//   setSwapStatus({
//     pending: true,
//     message: 'Waiting for one confirmation...',
//   });

//   console.log()

//   source.onerror = () => {
//     source.close();

//     console.log(`Lost connection to Boltz`);
//     const url = `${boltzApi}/swapstatus`;

//     const interval = setInterval(() => {
//       axios
//         .post(url, {
//           id: swapId,
//         })
//         .then(statusReponse => {
//           clearInterval(interval);

//           console.log(`Reconnected to Boltz`);

//           startListening(dispatch, swapId, callback);
//           handleSwapStatus(statusReponse.data, source, dispatch, callback);
//         });
//     }, 1000);
//   };

//   source.onmessage = event => {
//     handleSwapStatus(JSON.parse(event.data), source, dispatch, callback);
//   };
// };


let w3;
export const connectWallet = async () => {
  if (!w3) {
    const web3Modal = new Web3Modal({
      providerOptions: {
        // walletconnect: {
        //   package: WalletConnectProvider, // setup wallet connect for mobile wallet support
        //   options: {
        //     rpc: {
        //       31: 'https://public-node.testnet.rsk.co'
        //     },
        //   },
        // },
        metamask: {},
        // liquality: {},
      },
      // supportedChains: [33], // enable rsk regtest
    });

    // console.log("web3modal defined");
    const provider = await web3Modal.connect();
    console.log(`provider `, provider);
    let account;
    const web3 = new Web3(provider);
    if (provider.wc) {
      // walletconnect
      account = await provider.accounts[0];
    } else {
      // liquality/metamask
      account = await web3.eth.accounts.currentProvider.selectedAddress;
    }
    console.log(
      'utils account ',
      // web3,
      // web3.eth.accounts.currentProvider.selectedAddress,
      account,
      typeof account
    );
    w3 = { web3, account };
  }
  return w3;

  // return account;
};

export const getWalletBalance = async (wallet, callback) => {
  if (!w3) {
    const web3Modal = new Web3Modal({});
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

    web3.eth.getBalance(wallet, function(err, res) {
      if (err) {
        console.log(err)
      } else {
        const balance = web3.utils.fromWei(res, "ether")
        callback(balance)
      }
    })
  }
};

// Lock submarine swap funds
export const lockFunds = async (swapInfo, swapResponse) => {
  const w3 = await connectWallet();
  console.log('w3 ready: ', w3);
  const web3 = w3.web3;
  console.log('web3 ready: ', web3);

  console.log('lockFunds swapInfo, swapResponse ', swapInfo, swapResponse);

  // const signer = this.connectEthereum(this.provider, this.provider.address);
  // const { etherSwap, erc20Swap, token } = this.getContracts(signer);

  var decoded = lightningPayReq.decode(swapInfo.invoice);
  // console.log("decoded: ", decoded);

  var obj = decoded.tags;
  for (let index = 0; index < obj.length; index++) {
    const tag = obj[index];
    // console.log("tag: ", tag);
    if (tag.tagName == 'payment_hash') {
      console.log('yay: ', tag.data);
      var paymenthash = tag.data;
    }
  }
  console.log('paymenthash: ', paymenthash);

  // const preimageHash = getHexBuffer(paymenthash);
  var preimageHashbuffer = Buffer.from(paymenthash, 'hex');
  console.log('getHexBuffer preimageHash ', paymenthash);
  console.log('preimageHashbuffer ', preimageHashbuffer);
  const amount = BN.from(swapResponse.expectedAmount).mul(etherDecimals);
  console.log('amount ', amount);

  const timeout = web3.utils.numberToHex(swapResponse.timeoutBlockHeight);
  console.log('timeout ', timeout);

  console.log(
    'web3.eth.accounts.currentProvider.selectedAddress ',
    web3.eth.accounts.currentProvider.selectedAddress
  );

  // RBTC Swap ABI
  const rbtcswapabi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'preimageHash',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'bytes32',
          name: 'preimage',
          type: 'bytes32',
        },
      ],
      name: 'Claim',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'preimageHash',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'claimAddress',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'refundAddress',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timelock',
          type: 'uint256',
        },
      ],
      name: 'Lockup',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'preimageHash',
          type: 'bytes32',
        },
      ],
      name: 'Refund',
      type: 'event',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: 'preimage', type: 'bytes32' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'address', name: 'refundAddress', type: 'address' },
        { internalType: 'uint256', name: 'timelock', type: 'uint256' },
      ],
      name: 'claim',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: 'preimageHash', type: 'bytes32' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'address', name: 'claimAddress', type: 'address' },
        { internalType: 'address', name: 'refundAddress', type: 'address' },
        { internalType: 'uint256', name: 'timelock', type: 'uint256' },
      ],
      name: 'hashValues',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: 'preimageHash', type: 'bytes32' },
        { internalType: 'address', name: 'claimAddress', type: 'address' },
        { internalType: 'uint256', name: 'timelock', type: 'uint256' },
      ],
      name: 'lock',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: 'preimageHash', type: 'bytes32' },
        {
          internalType: 'address payable',
          name: 'claimAddress',
          type: 'address',
        },
        { internalType: 'uint256', name: 'timelock', type: 'uint256' },
        { internalType: 'uint256', name: 'prepayAmount', type: 'uint256' },
      ],
      name: 'lockPrepayMinerfee',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: 'preimageHash', type: 'bytes32' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'address', name: 'claimAddress', type: 'address' },
        { internalType: 'uint256', name: 'timelock', type: 'uint256' },
      ],
      name: 'refund',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      name: 'swaps',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'version',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  // rbtcswapaddress
  var rbtcswapcontract = new web3.eth.Contract(
    rbtcswapabi,
    swapResponse.address
  );
  console.log(
    'rbtc locking with ',
    preimageHashbuffer,
    swapResponse.claimAddress.toLowerCase(),
    timeout,
    'to contract ',
    swapResponse.address
  );
  // , chainId: 31
  rbtcswapcontract.methods
    .lock(preimageHashbuffer, swapResponse.claimAddress.toLowerCase(), timeout)
    .send(
      {
        from: web3.eth.accounts.currentProvider.selectedAddress,
        value: amount,
      },
      function(error, transactionHash) {
        console.log('error: ', error);
        console.log('transactionHash: ', transactionHash);
      }
    );
};
