import styles from "./Button.module.css";
// import { useTranslations } from "next-intl";

const Button = ({ label, onClick, disabled = false, loading }) => {
  // const commonT = useTranslations("common");

  // let activeLabel = !label ? commonT("continue") : label;
  let activeLabel = "Label";

  if (loading) {
    return (
      <button className={`${styles.button} ${styles.loading}`}>
        <div className={styles.loader}></div>
      </button>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={styles.button}>
      {activeLabel}
    </button>
  );
};

export default Button;
