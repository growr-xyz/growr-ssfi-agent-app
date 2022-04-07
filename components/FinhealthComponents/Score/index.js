import styles from "./Score.module.css";
import { useRef, useState } from "react";
import BaseContentLayout from "../../BaseContentLayout/BaseContentLayout";
import ScoreBar from "../ScoreBar/ScoreBar";
import useScore from "../../../hooks/useScore";
import { useTranslations } from "next-intl";
// import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";
// import Input from "@/components/Input";
// import useLoader from "@/hooks/useLoader";
// import Message from "@/components/Message";
// import SocialMediaGroup from "@/components/SocialMediaGroup";

// let validateEmail = (value) =>
//   !!value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);

let data = {
  dynamic: {},
  final: { location: "a", age: "b", income: "c" },
  householdType: "household",
  static: {
    spend: {
      spend001: {
        id: "spend001.d",
        points: 25,
        timeElapsed: 740376,
      },
      spend002: {
        id: "spend002.a",
        points: 100,
        timeElapsed: 1623,
      },
    },
    save: {
      save001: {
        id: "save001.a",
        points: 100,
        timeElapsed: 1381,
      },
      save002: {
        id: "save002.a",
        points: 100,
        timeElapsed: 1217,
      },
    },
    borrow: {
      borrow001: {
        id: "borrow001.b",
        points: 85,
        timeElapsed: 1484,
      },
      borrow002: {
        id: "borrow002.a",
        points: 100,
        timeElapsed: 1360,
      },
    },
    plan: {
      plan001: {
        id: "plan001.a",
        points: 100,
        timeElapsed: 1552,
      },
      plan002: {
        id: "plan002.c",
        points: 35,
        timeElapsed: 2014,
      },
    },
  },
};

const Score = ({ data, lang }) => {
  const t = useTranslations("common.score");
  //   const tCommon = useTranslations("common");
  const router = useRouter();
  let { score } = useScore(data.static);
  //   let tempIdRef = useRef(JSON.stringify(Date.now()));
  //   let [firstName, setFirstName] = useState("");
  //   let [email, setEmail] = useState("");
  //   let [emailIsValid, setEmailIsValid] = useState(true);
  //   let [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const { activate, deactivate } = useLoader();

  //   useEffect(() => {
  //     // store the data in temp_onboarding table when this page is reached
  //     fetch("/api/storeData", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         tempId: tempIdRef.current,
  //         data,
  //       }),
  //     }).finally(() => {
  //       deactivate();
  //     });
  //   }, []);

  //   const onChange = (e) => {
  //     let { name, value } = e.target;
  //     if (name === "name") {
  //       setFirstName(value);
  //       return;
  //     }
  //     if (name === "email") {
  //       let isValid = validateEmail(value);
  //       setEmailIsValid(isValid);
  //       setEmail(value);
  //     }
  //   };

  // supabase email login:
  //   const handleLogin = async (email) => {
  //     try {
  //       setLoading(true);
  //       plausible("OnboardingSignUp");
  //       let { error } = await supabase.auth.signIn({ email });

  //       if (error) {
  //         setServerError(true);
  //         return;
  //       }

  //       let registerRes = await fetch("/api/registerUser", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           // pass in the tempId to delete the temp_onboarding table after successful registration
  //           tempId: tempIdRef.current,
  //           data,
  //           firstName,
  //           email,
  //           lang,
  //         }),
  //       });

  //       if (registerRes.status === 500) {
  //         setServerError(true);
  //         return;
  //       }

  //       router.push({
  //         pathname: "/welcome",
  //         query: { name: firstName },
  //       });
  //     } catch (error) {
  //       setServerError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const handleProviderRegistration = async (provider) => {
  //     try {
  //       // set the tempId in the localStorage to retrive it in the user context on signIn after the provider redirects back
  //       window.localStorage.setItem(
  //         "registrationData",
  //         JSON.stringify({
  //           tempId: tempIdRef.current,
  //           lang,
  //         })
  //       );

  //       await supabase.auth.signIn({
  //         provider,
  //       });
  //     } catch (error) {
  //       console.log("Signin using a provider error: ", error);
  //     }
  //   };

  //   let isDisabled = !firstName || !email || !emailIsValid;

  let getPersonalResponse = (score) => {
    let response;
    if (score >= 0.8) {
      response = t("personalResponse.green");
    }
    if (score >= 0.4 && 0.8 > score) {
      response = t("personalResponse.yellow");
    }
    if (0.4 > score) {
      response = t("personalResponse.red");
    }

    return response?.split("/n");
  };

  return (
    <BaseContentLayout
      {...{
        submitButtonProps: {
          label: t("nextButton"),
          onClick: (e) => {
            e.preventDefault();
            router.replace("/dashboard");
            // handleLogin(email);
          },
          //   disabled: isDisabled,
          loading,
        },
      }}
    >
      <div>
        <h1>{t("label")}</h1>
        <ScoreBar progressIndex={score} />
        {getPersonalResponse(score)?.map((text, index) => {
          return (
            <div className={styles.response} key={index}>
              {text}
            </div>
          );
        })}
        <h4>{t("inviteToAction")}</h4>
        <h4 className={styles.consent}>
          {t("consent")
            ?.split(":")
            .map((text, index, array) => {
              if (text.startsWith("%") && t("document" + text)) {
                let documentName = t("document" + text + ".name");
                let documentLink = t("document" + text + ".link");
                return (
                  <a
                    href={encodeURI(documentLink)}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.consentLink}
                    key={index}
                  >
                    {documentName}
                  </a>
                );
              } else {
                return <span key={"span" + index}>{text}</span>;
              }
            })}
        </h4>
        {/* <SocialMediaGroup
          {...{
            providers: ["discord", "facebook", "google"],
            onClick: handleProviderRegistration,
            text: {
              label: tCommon("connectWith"),
              or: tCommon("or"),
            },
          }}
        /> */}
        {/* <div className={styles.inputs}>
          <Input
            {...{
              name: "name",
              value: firstName,
              placeholder: t("firstName"),
              onChange,
            }}
          />
          <Input
            {...{
              name: "email",
              value: email,
              placeholder: t("email"),
              onChange,
              error: !emailIsValid,
            }}
          />
          <Message error={serverError ? t("serverError") : undefined} />
        </div> */}
      </div>
    </BaseContentLayout>
  );
};

export default Score;
