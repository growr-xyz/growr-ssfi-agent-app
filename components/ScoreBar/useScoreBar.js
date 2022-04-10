import progressBar from "progressbar.js";
import {
  useEffect,
  useRef,
} from "react";


const determineColor = (index) => {
  if (0.4 >= index) {
    return "#A9F3EA";
  }
  if (index > 0.4 && 0.8 >= index) {
    return "#6AE7DA";
  }
  return "#18D0BA";
};

const useScoreBar = ({
  duration,
  progressIndex,
  value,
  size
}) => {
  const scoreBarContainerRef = useRef(null);
  
  useEffect(() => {
    let toColor = determineColor(progressIndex);

    if (progressIndex) {
      if (progressIndex > 1) {progressIndex=1}
      let bar = new progressBar.SemiCircle(scoreBarContainerRef.current, {
        strokeWidth: 7,
        trailColor: "#eee",
        trailWidth: 7,
        easing: "easeInOut",
        duration,
        text: {
          alignToBottom: false,
          className: "score-bar-text",
        },
        from: { color: "#18D0BA" },
        to: { color: toColor },
        step: (state, bar) => {
          bar.path.setAttribute("stroke", state.color);
          if (value === 0) {
            bar.setText("");
          } else {
            bar.setText("$"+value);
          }

          if (size=="big") {
            bar.text.style.fontSize = "5rem";
            bar.text.style.bottom = "25px";
          } else {
            bar.text.style.fontSize = "2rem";
            bar.text.style.bottom = "5px";
          }
          
        },
      });
      bar.animate(progressIndex);
    }
  }, [progressIndex]);

  return {
    barContainerRef: scoreBarContainerRef,
  };
};

export default useScoreBar;