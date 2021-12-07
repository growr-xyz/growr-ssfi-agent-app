import { useState, useEffect } from 'react';
// import { useQuery, gql } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import BaseContentLayout from '../../components/BaseContentLayout/BaseContentLayout';
import { startSwap, connectWallet, lockFunds } from '../../utils/swap';
import Input from '../../components/Input/Input';
import { useTranslations } from "next-intl";
import BigNumber from 'bignumber.js';
import styles from "./Payment.module.css";

function Payment() {
  const t = useTranslations("invoice");

  const [working, setWorking] = useState(false);

  const [swapState, setSwapState] = useState({
    step: 0,
    retry: true,
    inSwapMode: false,
    webln: null,
    isFetching: false,
    swapInfo: {
      base: "RBTC",
      quote: "BTC",
      baseAmount: new BigNumber("0.0001005"),
      quoteAmount: new BigNumber("0.0001000"),
      keys: {
        privateKey:
          "cbe74ba3d4e3614cdcba8bb9d14a09a447f8cb385f72845d70d200e8f7b6e640",
        publicKey:
          "02407616d57b70f4d6a2c7532d474b2cb1b45940d4985120fd80882fabf64d8741",
      },
      pair: { id: "RBTC/BTC", orderSide: "sell" },
      invoice: null,
    },
    swapResponse: {
      acceptZeroConf: false,
      address: "", // '0x598adb45a4eb8a1c12a0201dac4c163c23a4a674',
      claimAddress: "", //'0xb316383b46e22A7447eCe3e458637363E836bd3B',
      expectedAmount: new BigNumber("0"), //10050,
      id: "", // "UrVXop",
      timeoutBlockHeight: 0, // 2403415
    },
    swapStatus: {
      error: false,
      pending: false,
      message: t("waitingMsg"),
    },
  });

  const [w3, setW3] = useState();
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  // const { web3Context } = props;
  // const { networkId, networkName, providerName } = web3Context;

  // const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
  // const abi = contract.abi;

  // const checkWalletIsConnected = () => {
  //   const { ethereum } = window;

  //   if (!ethereum) {
  //     console.log("Make sure you have MetaMask installed");
  //     return;
  //   } else {
  //     console.log("Wallet exists!");
  //   }
  // }

  useEffect(() => {
    // checkWalletIsConnected();
    setW3(connectWallet());
  }, []);

  const setSwapResponse = (success, swapResponse) => {
    console.log("setSwapResponse => ", success, swapResponse);
    if (success) {
      setSwapState({
        ...swapState,
        step: 1, // Move to the Sign step
        swapResponse: swapResponse,
      });
    }
  };

  const setSwapStatus = (swapStatus) => {
    console.log("setSwapStatus => ", swapStatus);
    setSwapState({ ...swapState, swapStatus: swapStatus });
  };

  const onSubmit = () => {
    switch (swapState.step) {
      case 0:
        // setWorking(true);
        startSwap(swapState.swapInfo, setSwapResponse, setSwapStatus);
        break;
      case 1:
        lockFunds(swapState.swapInfo, swapState.swapResponse);
        break;
      default:
        return true;
    }
  };

  const updateQuoteAmountInput = (e) => {
    setSwapState({
      ...swapState,
      swapInfo: {
        ...swapState.swapInfo,
        quoteAmount: new BigNumber(e.target.value),
        baseAmount: new BigNumber(e.target.value).multipliedBy(1.005),
      },
    });
  };

  const updateInvoiceInput = (e) => {
    setSwapState({
      ...swapState,
      swapInfo: {
        ...swapState.swapInfo,
        invoice: e.target.value,
      },
    });
  };

  console.log(swapState);

  return (
    <div className={styles.container}>
      <BaseContentLayout {... {
        submitButtonProps: {
          onClick: onSubmit,
          label: (swapState.step === 0 ? 'Continue' : 'Sign'),
          disabled: working
        }
      }}>
        {/* <div className={styles.container}> */}
        <div>
          <h1>{t("title")}</h1>

          <h4>{t("input_invoice")}</h4>

          {/* Amount in RBTC - TODO: we could extract from the invoice */}
          <Input
            type="text"
            name="quoteAmount"
            placeholder={t("initiate.amount")}
            onChange={updateQuoteAmountInput} />

          {/* Lightning invoice */}
          <Input
            type="text"
            name="invoice"
            placeholder={t("initiate.invoice")}
            onChange={updateInvoiceInput} />

        </div>
      </BaseContentLayout>
    </div>
  );
}

export default Payment;

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        invoice: require(`../../locales/${locale}/invoice.json`),
      },
    },
  };
}