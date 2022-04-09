import styles from "./Box.module.css";

const Box = ({ children, name, details, onClick = () => {} }) => (
  <div onClick={onClick} className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.childrenWrapper}>{children}</div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.details}>{details}</div>
      </div>
    </div>
  </div>
);

export default Box;
