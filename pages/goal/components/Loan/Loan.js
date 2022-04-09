import moment from "moment";
import styles from "./Loan.module.css";
import { Button } from "../../../../components";
import { useTranslations } from "next-intl";

const Loan = ({
  amount,
  totalAmount,
  totalInterest,
  repaidAmount,
  nextInstallmentAmount,
  nextInstallmentTimestamp,
  repay
}) => {
  const t = useTranslations("dashboard");
  // const nextDue = nextInstallmentTimestamp?.split('"')[1]

  return (
    <div className={styles.container}>
      <h3>{t("loan.title")}</h3>
      <div className={styles.loanCard}>
        <h1>${parseFloat(totalAmount - totalInterest - repaidAmount).toFixed(2)}</h1>
        <h4>{t("loan.amount")}</h4>
        <h4>
          {t("loan.next_inst")} ${parseFloat(nextInstallmentAmount).toFixed(2)}
        </h4>
        <h4>
          {t("loan.due")} {moment(nextInstallmentTimestamp).format('DD/MM/YYYY')}
        </h4>
        <Button label={t("loan.repay")} style={styles.repay} onClick={repay} />
      </div>
    </div>
  );
};

export default Loan;
