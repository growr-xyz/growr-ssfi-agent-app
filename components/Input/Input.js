import styles from "./Input.module.css";

const Input = ({
  id,
  error,
  name,
  value,
  type,
  placeholder,
  onChange = () => {},
  disabled,
  prefix = "",
}) => {
  const onLocalChange = (e) => {
    e.target.value = e.target.value.replace(prefix, "");
    onChange(e);
  };
  return (
    <input
      {...{
        className: `${styles.input} ${error && styles.error} ${
          disabled && styles.disabled
        }`,
        id,
        name,
        value: `${prefix}${value}`,
        type,
        placeholder,
        onChange: onLocalChange,
        disabled,
      }}
    />
  );
};

export default Input;
