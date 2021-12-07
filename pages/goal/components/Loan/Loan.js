import styles from "./Loan.module.css";
import { Button } from "../../../../components";
import { useTranslations } from "next-intl";

const Loan = ({
  amount,
  nextInstalmentDue,
  due = new Date().toDateString(),
}) => {
  const t = useTranslations("dashboard");
  return (
    <div className={styles.container}>
      <h3>{t("loan.title")}</h3>
      <div className={styles.loanCard}>
        <h1>{amount}</h1>
        <h4>{t("loan.amount")}</h4>
        <h4>
          {t("loan.next_inst")} {nextInstalmentDue}
        </h4>
        <h4>
          {t("loan.due")} {due}
        </h4>
        <Button label={t("loan.repay")} style={styles.repay} />
      </div>
    </div>
  );
};

export default Loan;
