import styles from "./Input.module.css";

const Input = ({
  error,
  name,
  value,
  placeholder,
  onChange,
  disabled,
}) => {
  return (
    <input
      {...{
        className: `${styles.input} ${error && styles.error} ${
          disabled && styles.disabled
        }`,
        name,
        value,
        placeholder,
        onChange,
        disabled,
      }}
    />
  );
};

export default Input;
