import styles from "./Input.module.css";

const Input = ({
  id,
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
        id,
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
