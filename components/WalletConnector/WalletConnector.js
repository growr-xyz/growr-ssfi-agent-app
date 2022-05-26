import Image from "next/image";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { useWeb3React } from "@web3-react/core";
import { useMutation, gql } from "@apollo/client";
import { injected } from "../../utils/connectors";
import {
  setWalletId,
  acceptTerms,
  rejectTerms,
  updateUserState,
} from "../../redux/user";
import { goToStep } from "../../redux/steps";
import BaseContentLayout from "../../components/BaseContentLayout/BaseContentLayout";
import styles from "./WalletConnector.module.css";
import { useRouter } from "next/router";

import { Button } from "components";
import truncateAccount from "@/utils/truncateAccount";
import useDataVault from "hooks/useDataVault";
import { dataVaultKeys } from "../../config/getConfig";

let user = {
  userId: "",
  walletId: "0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
  chainId: 31,
  balance: 0,
  bankUserId: "ffdcuser2",
  termsAccepted: false,
  growrTermsAccepted: false,
  verifiableCredentials: [
    "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQWdlIl0sImNyZWRlbnRpYWxTY2hlbWEiOnsiaWQiOiJkaWQ6ZXRocjpyc2s6MHg2YTMwMzVlYzMxMzdiZWViNjc4OWZmYTkwODk4Y2NhZDVjZDA2Zjc5O2lkPTAzMWM5ODgzLTBmOTQtNGQyNi04ZmJkLWM3M2FlZjQwN2NlNTt2ZXJzaW9uPTEuMCIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJhZ2UiOjUzfX0sInN1YiI6ImRpZDpldGhyOnJzazp0ZXN0bmV0OjB4RjlBOWVBNzkzNEZFOUZEMTE3QjVmODMzN0RiYjI4ZjhiRjRGRTA5MCIsIm5iZiI6MTY1MTUxNTE4OCwiaXNzIjoiZGlkOmV0aHI6cnNrOnRlc3RuZXQ6MHg5MTVEMWE0MEI5YjFhZDUxZkYzODMzODYyNGQwMjlFNzk3OWE5NEI1In0.aCmwhY4SRPkBIWM66xK6wXkUlcYymg5m6W-emaD6DSlch6TptwLxjm3wNncTkkJ0j5r0i-HsLJbj8qN8D2VSvQ",
    "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSGFzS1lDIl0sImNyZWRlbnRpYWxTY2hlbWEiOnsiaWQiOiJkaWQ6ZXRocjpyc2s6MHg2YTMwMzVlYzMxMzdiZWViNjc4OWZmYTkwODk4Y2NhZDVjZDA2Zjc5O2lkPWMxN2RmMzRlLTEwNGEtNGVmZi04NWUxLWNjNDVlNjU5YjJkYzt2ZXJzaW9uPTEuMCIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJoYXNLWUMiOnRydWV9fSwic3ViIjoiZGlkOmV0aHI6cnNrOnRlc3RuZXQ6MHhGOUE5ZUE3OTM0RkU5RkQxMTdCNWY4MzM3RGJiMjhmOGJGNEZFMDkwIiwibmJmIjoxNjUxNTE1MTg4LCJpc3MiOiJkaWQ6ZXRocjpyc2s6dGVzdG5ldDoweDkxNUQxYTQwQjliMWFkNTFmRjM4MzM4NjI0ZDAyOUU3OTc5YTk0QjUifQ.NpE5a-sAK9axw53P1XwghGPzY30-mKMigRnqlvIKIYQwBwRgi_Qaj5vj003os10u-tDCVBjnO519GMzod-Ybjg",
    "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQ2l0aXplbnNoaXAiXSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6ImRpZDpldGhyOnJzazoweDZhMzAzNWVjMzEzN2JlZWI2Nzg5ZmZhOTA4OThjY2FkNWNkMDZmNzk7aWQ9MjM3MzBhMWQtOGYyNS00YzZhLWI1MjctN2Y4YWQ5MDFlZWE5O3ZlcnNpb249MS4wIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImNpdGl6ZW5zaGlwIjoiRkwifX0sInN1YiI6ImRpZDpldGhyOnJzazp0ZXN0bmV0OjB4RjlBOWVBNzkzNEZFOUZEMTE3QjVmODMzN0RiYjI4ZjhiRjRGRTA5MCIsIm5iZiI6MTY1MTUxNTE4OCwiaXNzIjoiZGlkOmV0aHI6cnNrOnRlc3RuZXQ6MHg5MTVEMWE0MEI5YjFhZDUxZkYzODMzODYyNGQwMjlFNzk3OWE5NEI1In0.SN0KGtciTp9qvI4pVkSu0RV9R0QAA8VjOAATSoadr5t4gWT8jbYCjyx5xIkLsBw1ergmMbbCS3EMwhLda8e_zQ",
    "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQXZnTW9udGhseUluY29tZSJdLCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiZGlkOmV0aHI6cnNrOjB4NmEzMDM1ZWMzMTM3YmVlYjY3ODlmZmE5MDg5OGNjYWQ1Y2QwNmY3OTtpZD0yNmMzMzRkNS1lZTA3LTRkYWUtYTc4OS0wNWUzYTYyNzdkNzE7dmVyc2lvbj0xLjAiLCJ0eXBlIjoiSnNvblNjaGVtYVZhbGlkYXRvcjIwMTgifSwiY3JlZGVudGlhbFN1YmplY3QiOnsiYXZnTW9udGhseUluY29tZSI6MTU2fX0sInN1YiI6ImRpZDpldGhyOnJzazp0ZXN0bmV0OjB4RjlBOWVBNzkzNEZFOUZEMTE3QjVmODMzN0RiYjI4ZjhiRjRGRTA5MCIsIm5iZiI6MTY1MTUxNTE4OCwiaXNzIjoiZGlkOmV0aHI6cnNrOnRlc3RuZXQ6MHg5MTVEMWE0MEI5YjFhZDUxZkYzODMzODYyNGQwMjlFNzk3OWE5NEI1In0.0Uw3CHeNCuawfm-uaOHEoiKHlqt22y8t88XQ4vvAcXAEaR-eUtFIicKyF3EGbEM0zyniTaUxQlWy7J-9BrsWAg",
    "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQXZnTW9udGhseVJlc3QiXSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6ImRpZDpldGhyOnJzazoweDZhMzAzNWVjMzEzN2JlZWI2Nzg5ZmZhOTA4OThjY2FkNWNkMDZmNzk7aWQ9ZTNhODMxMTYtYzIyNi00M2FiLWFiMjktYTY0N2ExZDJjYjVlO3ZlcnNpb249MS4wIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImF2Z01vbnRobHlSZXN0IjowfX0sInN1YiI6ImRpZDpldGhyOnJzazp0ZXN0bmV0OjB4RjlBOWVBNzkzNEZFOUZEMTE3QjVmODMzN0RiYjI4ZjhiRjRGRTA5MCIsIm5iZiI6MTY1MTUxNTE4OCwiaXNzIjoiZGlkOmV0aHI6cnNrOnRlc3RuZXQ6MHg5MTVEMWE0MEI5YjFhZDUxZkYzODMzODYyNGQwMjlFNzk3OWE5NEI1In0.HKfCRzBHM4z5-8uI2Dol2bA3wtl6Zew1js5k6tasXc3b7J218UbydqYxNd4-jrmkt-jyVW5jjLWEhdslhi4f0A",
    "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQXZnTW9udGhseVJlc3QiXSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6ImRpZDpldGhyOnJzazoweDZhMzAzNWVjMzEzN2JlZWI2Nzg5ZmZhOTA4OThjY2FkNWNkMDZmNzk7aWQ9ZTNhODMxMTYtYzIyNi00M2FiLWFiMjktYTY0N2ExZDJjYjVlO3ZlcnNpb249MS4wIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImF2Z01vbnRobHlSZXN0IjowfX0sInN1YiI6ImRpZDpldGhyOnJzazp0ZXN0bmV0OjB4RjlBOWVBNzkzNEZFOUZEMTE3QjVmODMzN0RiYjI4ZjhiRjRGRTA5MCIsIm5iZiI6MTY1MTUxNTE4OCwiaXNzIjoiZGlkOmV0aHI6cnNrOnRlc3RuZXQ6MHg5MTVEMWE0MEI5YjFhZDUxZkYzODMzODYyNGQwMjlFNzk3OWE5NEI1In0.HKfCRzBHM4z5-8uI2Dol2bA3wtl6Zew1js5k6tasXc3b7J218UbydqYxNd4-jrmkt-jyVW5jjLWEhdslhi4f0A",
  ],
  bankCredentials: [
    {
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "Age"],
        credentialSchema: {
          id: "did:ethr:rsk:0x6a3035ec3137beeb6789ffa90898ccad5cd06f79;id=031c9883-0f94-4d26-8fbd-c73aef407ce5;version=1.0",
          type: "JsonSchemaValidator2018",
        },
        credentialSubject: {
          age: 53,
        },
      },
      sub: "did:ethr:rsk:testnet:0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
      nbf: 1651515188,
      iss: "did:ethr:rsk:testnet:0x915D1a40B9b1ad51fF38338624d029E7979a94B5",
    },
    {
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "HasKYC"],
        credentialSchema: {
          id: "did:ethr:rsk:0x6a3035ec3137beeb6789ffa90898ccad5cd06f79;id=c17df34e-104a-4eff-85e1-cc45e659b2dc;version=1.0",
          type: "JsonSchemaValidator2018",
        },
        credentialSubject: {
          hasKYC: true,
        },
      },
      sub: "did:ethr:rsk:testnet:0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
      nbf: 1651515188,
      iss: "did:ethr:rsk:testnet:0x915D1a40B9b1ad51fF38338624d029E7979a94B5",
    },
    {
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "Citizenship"],
        credentialSchema: {
          id: "did:ethr:rsk:0x6a3035ec3137beeb6789ffa90898ccad5cd06f79;id=23730a1d-8f25-4c6a-b527-7f8ad901eea9;version=1.0",
          type: "JsonSchemaValidator2018",
        },
        credentialSubject: {
          citizenship: "FL",
        },
      },
      sub: "did:ethr:rsk:testnet:0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
      nbf: 1651515188,
      iss: "did:ethr:rsk:testnet:0x915D1a40B9b1ad51fF38338624d029E7979a94B5",
    },
    {
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "AvgMonthlyIncome"],
        credentialSchema: {
          id: "did:ethr:rsk:0x6a3035ec3137beeb6789ffa90898ccad5cd06f79;id=26c334d5-ee07-4dae-a789-05e3a6277d71;version=1.0",
          type: "JsonSchemaValidator2018",
        },
        credentialSubject: {
          avgMonthlyIncome: 156,
        },
      },
      sub: "did:ethr:rsk:testnet:0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
      nbf: 1651515188,
      iss: "did:ethr:rsk:testnet:0x915D1a40B9b1ad51fF38338624d029E7979a94B5",
    },
    {
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "AvgMonthlyRest"],
        credentialSchema: {
          id: "did:ethr:rsk:0x6a3035ec3137beeb6789ffa90898ccad5cd06f79;id=e3a83116-c226-43ab-ab29-a647a1d2cb5e;version=1.0",
          type: "JsonSchemaValidator2018",
        },
        credentialSubject: {
          avgMonthlyRest: 0,
        },
      },
      sub: "did:ethr:rsk:testnet:0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
      nbf: 1651515188,
      iss: "did:ethr:rsk:testnet:0x915D1a40B9b1ad51fF38338624d029E7979a94B5",
    },
    {
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "AvgMonthlyRest"],
        credentialSchema: {
          id: "did:ethr:rsk:0x6a3035ec3137beeb6789ffa90898ccad5cd06f79;id=e3a83116-c226-43ab-ab29-a647a1d2cb5e;version=1.0",
          type: "JsonSchemaValidator2018",
        },
        credentialSubject: {
          avgMonthlyRest: 0,
        },
      },
      sub: "did:ethr:rsk:testnet:0xF9A9eA7934FE9FD117B5f8337Dbb28f8bF4FE090",
      nbf: 1651515188,
      iss: "did:ethr:rsk:testnet:0x915D1a40B9b1ad51fF38338624d029E7979a94B5",
    },
  ],
  finances: {
    income: "1000",
    other: "1000",
    unofficial: "1000",
    expenses: "1000",
    dependants: "2",
  },
  goals: [
    {
      goalId: "8c4acbbe-05a7-4b41-9bda-015381faa75d",
      goalType: "new car",
      loanDuration: "2",
      amountSaved: "1000",
      amountNeeded: "1000",
      isAchieved: false,
      offer: {
        found: true,
        pondAddress: "0xf1216e3f66d44895e275EeF1f846265ca488D064",
        amount: "215.0",
        annualInterestRate: 0.03,
        approved: true,
        cashBackRate: 0.02,
        disbursmentFee: 4,
        duration: 2,
        installmentAmount: "108.0375",
        totalAmount: "216.075",
        totalInterest: "1.075",
      },
      loan: {
        pondAddress: "",
        amount: 0,
        annualPercentageRate: 0,
        duration: 0,
        instalment: 0,
        nextInstalment: "2022-01-01",
        lastInstalment: "2022-01-01",
        totalToRepay: 0,
        totalInterest: 0,
        outstanding: 0,
      },
    },
  ],
};

function WalletConnector({ onNext }) {
  const termsAccepted = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let dataVault = useDataVault();
  const { active, account, chainId, activate, deactivate } = useWeb3React();

  const t = useTranslations("onboarding");

  const router = useRouter();

  useEffect(() => {
    try {
      activate(injected, undefined, true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const onSubmit = async () => {
    if (active && account) {
      // await dataVault.create({
      //   key: dataVaultKeys.onboarding,
      //   content: JSON.stringify(user),
      // });
      dispatch(setWalletId(account, chainId));

      onNext(); // .catch((err) => err);
      // createWallet().then(() =>
      //   createUser()
      //     .then(() => onNext().catch((err) => err))
      //     .catch((err) => err)
      // );
    }
  };

  const onChangeCheckbox = ({ target }) =>
    target.checked ? dispatch(acceptTerms()) : dispatch(rejectTerms());

  const buttonIsActive = !active || !account || !termsAccepted;

  const onCustonButtonClick = async () => {
    try {
      if (result.length) {
        let result = await dataVault.get({ key: dataVaultKeys.onboarding });
        const latestState = result.pop();
        // something metamask don't ask the user to decrypt and davaVault returns encrypted
        // when we try to JSON.parse the data it throws an error, so we try-catch it to move to the next step
        dispatch(updateUserState(JSON.parse(latestState.content)));
        dispatch(goToStep(4));
      } else {
        throw new Error();
      }
    } catch (err) {
      onSubmit();
    }
  };

  const renderCustomButton = () => {
    return (
      <Button
        disabled={buttonIsActive}
        label="Restore Account"
        onClick={onCustonButtonClick}
      />
    );
  };

  return (
    <BaseContentLayout
      {...{
        submitButtonProps: {
          label: t("submitBtn"),
          onClick: onSubmit,
          disabled: buttonIsActive,
        },
        renderCustomButton,
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Image src="/logo.svg" height={100} width={250} alt="Logo" priority />
        </div>

        <h1 className={styles.title}>{t("page1.title")}</h1>

        {active ? (
          <div className={styles.connected} onClick={disconnect}>
            <span className={styles.usernumber}>
              {truncateAccount(account)}
            </span>
            <Image src="/logout.svg" height={32} width={32} alt="Logout" />
          </div>
        ) : (
          <div className={styles.disconnected}>
            <Image
              src="/metamask.svg"
              height={95}
              width={304}
              alt="MetaMask"
              onClick={connect}
            />
          </div>
        )}

        <div className={styles.terms}>
          <input
            className={styles.checkbox}
            id="terms"
            name="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={onChangeCheckbox}
          />
          <label htmlFor="terms">{t("page7.confirmCheck")}</label>
        </div>

        <div
          className={styles.switch}
          onClick={() => {
            router.push(`/`, `/`, {
              locale: router.locale == "es" ? "en" : "es",
            });
          }}
        >
          {t("page7.switchLang")}
        </div>
      </div>
    </BaseContentLayout>
  );
}

export default WalletConnector;
