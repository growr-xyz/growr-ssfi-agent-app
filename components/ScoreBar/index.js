import useScoreBar from "./useScoreBar";

const ScoreBar = ({
  progressIndex,
  value,
  size,
  maxWidth = 320,
  duration = 1400,
}) => {
  let { barContainerRef } = useScoreBar({ progressIndex, duration, value, size });

  return (
    <div style={{ maxWidth, padding: "10px 0px" }}>
      <div ref={barContainerRef} id="score-bar"></div>
    </div>
  );
};

export default ScoreBar;