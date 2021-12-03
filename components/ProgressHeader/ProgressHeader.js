import { useDispatch } from 'react-redux'
import { decrementStep } from '../../redux/steps'
import ProgressBar from "../ProgressBar/ProgressBar";
import LeftArrow from "../Icons/LeftArrow";
import styles from "./ProgressHeader.module.css";

const Header = () => {
  const dispatch = useDispatch()
  const onBackPress = () => dispatch(decrementStep())

  return (
    <div className={styles.container}>
      <div onClick={onBackPress} className={styles.backButton}>
        <LeftArrow />
      </div>
      <ProgressBar />
    </div>
  );
};

export default Header;
