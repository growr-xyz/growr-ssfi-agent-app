import styles from "./LockIcon.module.css";
import Lock from "../Icons/Lock";

const LockIcon = () => {
  return (
    <div>
      <Lock
        {...{
          lockStyle: styles.lock,
          baseStyle: styles.base,
        }}
      />
    </div>
  );
};

export default LockIcon;
