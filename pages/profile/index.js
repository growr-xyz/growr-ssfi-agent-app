import { Button, Page } from "components";
import Input from "components/Input/Input";
import styles from "./Profile.module.css";
import Header from "../goal/components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import Credentials from "components/Credentials/Credentials";
import useDataVault from "hooks/useDataVault";
import { dataVaultKeys } from "config/getConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setFinances } from "redux/user";

// import { createMachine, assign } from "xstate";
// import { useMachine } from "@xstate/react";

// const profileMachine = createMachine({
//   id: "profile",
//   initial: "inactive",
//   context: {
//     count: 0
//   },
//   states: {
//     inactive: {
//       on: { TOGGLE: "active" }
//     },
//     active: {
//       entry: assign({ count: (ctx) => ctx.count + 1 }),
//       on: { TOGGLE: "inactive" }
//     }
//   }
// });

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const useActions = () => {
  const dispatch = useDispatch();

  const updateFinances = (query) => dispatch(setFinances(query));

  return {
    updateFinances,
  };
};

const Profile = () => {
  const router = useRouter();
  const t = useTranslations("profile");
  const { updateFinances } = useActions();

  const [isEditing, setIsEditing] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [latestStateId, setLatestStateId] = useState(null);
  let dataVault = useDataVault();
  const { user } = useSelector((state) => state);
  // const state = useSelector();
  const [localFinances, setLocalFinances] = useState(user.finances);

  useEffect(() => {
    setLocalFinances(user.finances);
  }, [user]);

  const { expenses, income, other, unofficial } = localFinances;

  let verifiableCredentials = useSelector(
    (state) => state.user.verifiableCredentials
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    setLocalFinances((prevFinances) => ({ ...prevFinances, [name]: value }));
    if (!value) {
      setEmptyField(true);
    } else if (emptyField) {
      setEmptyField(false);
    }
  };

  const onBackPress = () => {
    router.push("/dashboard");
  };

  const onRefresh = async () => {
    try {
      let result = await dataVault.get({ key: dataVaultKeys.onboarding });
      if (result.length) {
        const latestState = result.pop();
        // something metamask don't ask the user to decrypt and davaVault returns encrypted
        // when we try to JSON.parse the data it throws an error, so we try-catch it to move to the next step
        let parsedContent = JSON.parse(latestState.content);
        updateFinances(parsedContent.finances);
        setIsEditing(true);
        setLatestStateId(latestState.id);
      } else {
        throw new Error();
      }
    } catch (err) {}
  };

  const onSwap = async () => {
    try {
      const userCopy = deepCopy(user);
      userCopy.finances = localFinances;

      await dataVault.swap({
        key: dataVaultKeys.onboarding,
        content: JSON.stringify(userCopy),
        id: latestStateId,
      });
      updateFinances(localFinances);
      setIsEditing(false);
    } catch (err) {}
  };

  const disabled = !isEditing;

  return (
    <Page>
      <Header onBackPress={onBackPress} />
      <h1>{t("label")}</h1>
      <p>{t("description")}</p>
      <h3>{t("financial_details")}</h3>
      <label className={styles.label} htmlFor="profile-income-input">
        {t("income_label")}
      </label>
      <Input
        {...{
          id: "profile-income-input",
          name: "income",
          prefix: "$",
          value: `${income}`,
          onChange,
          disabled,
        }}
      />
      <label className={styles.label} htmlFor="profile-other-input">
        {t("other_label")}
      </label>
      <Input
        {...{
          id: "profile-other-input",
          prefix: "$",
          name: "other",
          value: `${other}`,
          onChange,
          disabled,
        }}
      />
      <label className={styles.label} htmlFor="profile-unofficial-input">
        {t("unofficial_label")}
      </label>
      <Input
        {...{
          id: "profile-unofficial-input",
          prefix: "$",
          name: "unofficial",
          value: `${unofficial}`,
          onChange,
          disabled,
        }}
      />
      <label className={styles.label} htmlFor="profile-expenses-input">
        {t("expenses_label")}
      </label>
      <Input
        {...{
          id: "profile-expenses-input",
          prefix: "$",
          name: "expenses",
          value: `${expenses}`,
          onChange,
          disabled,
        }}
      />
      <Button
        {...{
          label: isEditing ? t("update_button") : t("refresh_button"),
          onClick: isEditing ? onSwap : onRefresh,
          disabled: emptyField,
        }}
      />
      <Credentials credentials={verifiableCredentials} />;
    </Page>
  );
};

export default Profile;

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        profile: require(`../../locales/${locale}/profile.json`),
      },
    },
  };
}
