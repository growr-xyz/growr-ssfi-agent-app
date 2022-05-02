import { Button, Page } from "components";
import Input from "components/Input/Input";
import styles from "./Profile.module.css";

import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import Credentials from "components/Credentials/Credentials";

const Profile = () => {
  const { expenses, income, other, unofficial } = useSelector(
    (state) => state.user.finances
  );

  let verifiableCredentials = useSelector(
    (state) => state.user.verifiableCredentials
  );
  console.log("verifiableCredentials", verifiableCredentials);
  const t = useTranslations("profile");

  return (
    <Page>
      <h1>{t("label")}</h1>
      <p>{t("description")}</p>
      <h3>{t("financial_details")}</h3>
      <label className={styles.label} htmlFor="profile-income-input">
        {t("income_label")}
      </label>
      <Input
        {...{ id: "profile-income-input", value: `$${income}`, disabled: true }}
      />
      <label className={styles.label} htmlFor="profile-other-input">
        {t("other_label")}
      </label>
      <Input
        {...{ id: "profile-other-input", value: `$${other}`, disabled: true }}
      />
      <label className={styles.label} htmlFor="profile-unofficial-input">
        {t("unofficial_label")}
      </label>
      <Input
        {...{
          id: "profile-unofficial-input",
          value: `$${unofficial}`,
          disabled: true,
        }}
      />
      <label className={styles.label} htmlFor="profile-expenses-input">
        {t("expenses_label")}
      </label>
      <Input
        {...{
          id: "profile-expenses-input",
          value: `$${expenses}`,
          disabled: true,
        }}
      />
      <Button {...{ label: t("refresh_button") }} />
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
