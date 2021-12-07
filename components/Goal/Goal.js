import styles from "./Goal.module.css";
import ScoreBar from "../ScoreBar/index";
import Box from "../Box/Box";

const Goal = ({ name, details, progress, value }) => {
  return (
    <Box
      {...{
        name,
        details,
        progress,
        value
      }}
    >
      <div className={styles.progressBar}>
        <ScoreBar progressIndex={progress} value={value} />
      </div>
    </Box>
  );
};

export default Goal;
