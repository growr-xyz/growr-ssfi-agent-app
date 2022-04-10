import progressBar from "progressbar.js";
import {
  useEffect,
  useRef,
} from "react";

const useProgressBar = () => {
  const progressBarContainerRef = useRef(null);
  const progressBarRef = useRef();

  useEffect(() => {
    progressBarRef.current = new progressBar.Line(
      progressBarContainerRef.current,
      {
        strokeWidth: 2,
        easing: "easeInOut",
        duration: 500,
        color: '#18D0BA',
        trailColor: "#EDEDED",
        trailWidth: 2,
        svgStyle: { width: "100%", height: "100%" },
      }
    );
  }, [progressBarRef]);

  const bar = progressBarRef?.current;

  return {
    barContainerRef: progressBarContainerRef,
    progressBar: bar,
  };
};

export default useProgressBar;
