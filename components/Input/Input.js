import styles from "./Input.module.css";

const Input = ({
  error,
  name,
  value,
  type,
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
        type,
        placeholder,
        onChange,
        disabled,
      }}
    />
  );
};

export default Input;
