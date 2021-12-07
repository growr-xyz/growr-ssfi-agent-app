import moment from "moment";
import styles from "./Loan.module.css";
import { Button } from "../../../../components";
import { useTranslations } from "next-intl";

const Loan = ({
  amount,
  nextInstalmentDue,
  due = moment().format('MM/DD/YYYY'),
}) => {
  const t = useTranslations("dashboard");
  const nextDue = nextInstalmentDue.split('"')[1]

  return (
    <div className={styles.container}>
      <h3>{t("loan.title")}</h3>
      <div className={styles.loanCard}>
        <h1>${amount}</h1>
        <h4>{t("loan.amount")}</h4>
        <h4>
          {t("loan.next_inst")} {moment(nextDue).format('MM/DD/YYYY')}
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
