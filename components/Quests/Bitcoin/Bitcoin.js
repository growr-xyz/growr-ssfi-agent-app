import styles from "./Bitcoin.module.css";
import Box from "../../Box/Box";
import BitcoinIcon from "../../Icons/Bitcoin";
import { useTranslations } from "next-intl"

const Bitcoin = () => {
  const t = useTranslations("dashboard")
  return (
    <Box
      {...{ 
        name: t('quests.bitcoin.title'),
        details: t('quests.start')
      }}
    >
      <div className={styles.container}>
        <BitcoinIcon />
      </div>
    </Box>
  );
};

export default Bitcoin;
