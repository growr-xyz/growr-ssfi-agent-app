import styles from "./FinHealth.module.css";
import Box from "../../Box/Box";
import Rectangle from "../../Icons/Rectangle";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const FinHealth = () => {
  const t = useTranslations("dashboard");
  const router = useRouter();

  const onClick = () => {
    router.push("/finhealth");
  };

  return (
    <Box
      {...{
        name: t("quests.finhealth.title"),
        details: t("quests.start"),
        onClick,
      }}
    >
      <div className={styles.container}>
        <Rectangle />
      </div>
    </Box>
  );
};

export default FinHealth;
