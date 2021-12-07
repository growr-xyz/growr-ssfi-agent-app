import styles from "./Widget.module.css";

const Widget = ({ balance, currency }) => {
  return (
    <div className={styles.container}>
      <h1>{balance}</h1>
      <h4>{currency}</h4>
    </div>
  );
};

export default Widget;
