import { useImmer } from "use-immer";

const useProgress = () => {
  let [progress, setProgress] = useImmer({
    step: 0,
    total: 2,
  });

  const increment = () => {
    setProgress((draft) => {
      draft.step += 1;
    });
  };

  const decrement = () => {
    setProgress((draft) => {
      if (!!draft.step) {
        draft.step -= 1;
      }

      return draft;
    });
  };

  const initTotal = (total) => {
    setProgress((draft) => {
      // add 2 for the first and the last screen
      draft.total = total + 2;
    });
  };

  return {
    progress,
    increment,
    decrement,
    initTotal,
  };
};

export default useProgress;
