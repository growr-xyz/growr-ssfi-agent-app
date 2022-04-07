import { useLayoutEffect, useState } from "react";

const useMobileView = () => {
  let [mobileView, setMobileView] = useState(false);

  useLayoutEffect(() => {
    let mediaMatch = window.matchMedia("(max-width: 1080px)");
    setMobileView(mediaMatch.matches);
    let eventCallBack = (event) => {
      setMobileView(event.matches);
    };
    mediaMatch.addEventListener("change", eventCallBack);

    return () => {
      mediaMatch.removeEventListener("change", eventCallBack);
    };
  }, []);

  return mobileView;
};

export default useMobileView;
