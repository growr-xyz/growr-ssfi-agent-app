import styles from "./Answer.module.css";

function Answer({
  id,
  name,
  value,
  selected,
  onChange,
  mobileView,
  disabled = false,
  ...rest
}) {
  const disalbedStyle = disabled ? styles.disabled : "";

  const onClick = () => {
    if (!disabled) onChange({ id, ...rest });
  };

  if (mobileView) {
    return (
      <div
        onClick={onClick}
        className={`${styles.container}  ${disalbedStyle}`}
      >
        <button
          className={`${styles.button} ${
            id === selected ? styles.selected : ""
          }`}
        >
          {value}
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${styles.radioContainer} ${disalbedStyle}`}
    >
      <label className={styles.radioLabel} htmlFor={id}>
        <span
          className={`${styles.checkmark} ${
            id === selected ? styles.selected : ""
          }`}
        ></span>
        {value}
      </label>
    </div>
  );
}

export default Answer;
