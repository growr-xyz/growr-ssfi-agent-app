import { useEffect } from "react";
import useProgressBar from "./useProgressBar";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ step, total }) => {
  let { barContainerRef, progressBar } = useProgressBar();

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
