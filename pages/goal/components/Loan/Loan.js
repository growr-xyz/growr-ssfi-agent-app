import styles from "./Loan.module.css";
import { Button } from "../../../../components";

const Loan = ({
  amount,
  nextInstalmentDue,
  due = new Date().toDateString(),
}) => {
  return (
    <div className={styles.container}>
      <h3>Loan</h3>
      <div className={styles.loanCard}>
        <h1>{amount}</h1>
        <h4>outstanding loan amount</h4>
        <h4>Next installment {nextInstalmentDue}</h4>
        <h4>Due on {due}</h4>
        <Button label="Repay" style={styles.repay} />
      </div>
    </div>
  );
};

export default Loan;
