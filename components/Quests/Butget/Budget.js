import styles from "./Budget.module.css";
import Box from "../../Box/Box";
import Rectangle from "../../Icons/Rectangle";
import { useTranslations } from "next-intl"

const Budget = () => {
  const t = useTranslations("dashboard")
  return (
    <Box
      {...{
        name: t('quests.budget.title'),
        details: t('quests.start'),
      }}
    >
      <div className={styles.container}>
        <Rectangle />
      </div>
    </Box>
  );
};

export default Budget;
