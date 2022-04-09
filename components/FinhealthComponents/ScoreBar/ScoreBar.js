import useScoreBar from "./useScoreBar";

const ScoreBar = ({ progressIndex, maxWidth = 320, duration = 1400 }) => {
  let { barContainerRef } = useScoreBar({ progressIndex, duration });

  return (
    <div style={{ maxWidth, padding: "30px 0px" }}>
      <div ref={barContainerRef} id="score-bar"></div>
    </div>
  );
};

export default ScoreBar;
