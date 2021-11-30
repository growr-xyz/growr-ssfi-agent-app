import ProgressBar from "../ProgressBar/ProgressBar";
import LeftArrow from "../Icons/LeftArrow";
import styles from "./ProgressHeader.module.css";

const Header = ({ progress, onBackPress }) => {
  return (
    <div className={styles.container}>
      <div onClick={onBackPress} className={styles.backButton}>
        <LeftArrow />
      </div>
      <ProgressBar {...progress} />
    </div>
  );
};

export default Header;
