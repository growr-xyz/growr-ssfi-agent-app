import { useEffect } from "react";
import { useSelector } from 'react-redux'
import useProgressBar from "./useProgressBar";
import styles from "./ProgressBar.module.css";

const ProgressBar = () => {
  let { barContainerRef, progressBar } = useProgressBar();
  const step = useSelector(state => state.steps.step)
  const total = useSelector(state => state.steps.total)

  useEffect(() => {
    if (progressBar) {
      progressBar.animate(step / total);
    }
  }, [progressBar, step, total]);

  return (
    <div className={styles.container}>
      <div ref={barContainerRef} id="bar"></div>
    </div>
  );
};

export default ProgressBar;
