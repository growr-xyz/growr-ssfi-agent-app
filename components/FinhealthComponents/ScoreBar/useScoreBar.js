import progressBar from "progressbar.js";
import { useEffect, useRef } from "react";

const determineColor = (index) => {
  if (0.4 >= index) {
    return "#E28EA8";
  }
  if (index > 0.4 && 0.8 >= index) {
    return "#E6E386";
  }
  return "#18D0BA";
};

const useScoreBar = ({ duration, progressIndex }) => {
  const scoreBarContainerRef = useRef(null);

  useEffect(() => {
    let toColor = determineColor(progressIndex);

    if (progressIndex) {
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
        from: { color: "#ED6A5A" },
        to: { color: toColor },
        step: (state, bar) => {
          bar.path.setAttribute("stroke", state.color);
          var value = Math.round(bar.value() * 100);
          if (value === 0) {
            bar.setText("");
          } else {
            bar.setText(value);
          }

          bar.text.style.fontSize = "6rem";
          bar.text.style.bottom = "30px";
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
