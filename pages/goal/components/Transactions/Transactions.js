import styles from "./Transactions.module.css";

const transactions = [];

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h3>Transactions</h3>
      <div className={styles.transactions}>
        <h4>30/11</h4>
        <div className={styles.transaction}>
          <div>Loan disbursed</div>
          <b>+$1200</b>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
