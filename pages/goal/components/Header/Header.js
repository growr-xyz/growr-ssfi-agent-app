import { Header } from "../../../../components";
import LeftArrow from "../../../../components/Icons/LeftArrow";
import styles from "./Header.module.css";

const GoalHeader = ({ onBackPress }) => (
  <Header>
    <div onClick={onBackPress} className={styles.backButton}>
      <LeftArrow />
    </div>
  </Header>
);

export default GoalHeader;
