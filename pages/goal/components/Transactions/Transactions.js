import styles from "./Transactions.module.css";
import moment from "moment";

const transactions = [];

const Transactions = (loan) => {
  return (
    <div className={styles.container}>
      <h3>Transactions</h3>
      {(!loan?.repaymentHistory || loan.repaymentHistory.length === 0) ? <p>No repayment transactions.</p> :
      loan.repaymentHistory?.map((transaction, index) => (
        <div key={index} className={styles.transactions}>
          <h4>{moment(transaction.timestamp).format('DD/MM/YYYY')}</h4>
          <div className={styles.transaction}>
            <div>Repayment</div>
            <b>{parseFloat(transaction.amount).toFixed(2)}</b>
          </div>
        </div>))}
    </div>
  );
};

export default Transactions;
