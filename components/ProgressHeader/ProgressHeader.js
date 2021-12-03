import { useDispatch } from 'react-redux'
import { decrementStep } from '../../redux/steps'
import ProgressBar from "../ProgressBar/ProgressBar";
import LeftArrow from "../Icons/LeftArrow";
import styles from "./ProgressHeader.module.css";

const Header = ({ progress }) => {
  const dispatch = useDispatch()
  const onBackPress = () => dispatch(decrementStep())

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
