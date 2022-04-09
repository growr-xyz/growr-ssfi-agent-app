import { useState, useEffect } from "react";
import { useImmer, Updater } from "use-immer";
import useStaticQuestion from "./useStaticQuestions";
// import useDynamicQuestion from "./useDynamicQuestion";
import useProgress from "./useProgress";

const defaultState = {
  householdType: "",
  static: {},
  //   dynamic: {},
  final: {
    location: "",
    income: "",
    age: "",
  },
};

const useSteps = ({ config }) => {
  //   const plausible = usePlausible();
  let [data, setData] = useImmer(defaultState);

  const {
    staticQuestion,
    questionIndex,
    isFinal: isFinalStatic,
    isFirst: isFirstStatic,
    onAnswer: onStaticAnswer,
    getPrevStatic,
  } = useStaticQuestion({
    questions: config.static,
    setData,
  });

  // dynamic question
  //   let {
  //     isAvailable,
  //     isFinal: isFinalDynamic,
  //     isFirst: isFirstDynamic,
  //     totalQuestions,
  //     dynamicQuestion,
  //     onAnswer: onDynamicAnswer,
  //     getPrevDynamic,
  //   } = useDynamicQuestion({
  //     config: config.dynamic,
  //     data,
  //     setData,
  //   });

  let { decrement, increment, initTotal, progress } = useProgress();

  let [step, setStep] = useState("household");

  useEffect(() => {
    // init progress steps based on all available questions
    // if (isAvailable) {
    //   initTotal(totalQuestions + config.static.length);
    // } else {
    // }
    initTotal(config.static.length);
  }, []);

  const onHouseholdSelect = (value) => {
    setData((draft) => {
      draft.householdType = value;
      return draft;
    });
    increment();
    setStep("static");
  };

  const onFinalAnswer = (data) => {
    setData((draft) => {
      draft.final = data;
    });
    increment();
    setStep("score");
  };

  const onAnswer = (answer) => {
    if (step === "static") {
      onStaticAnswer(answer);
      //   plausible(`OnboardingFinHealth${questionIndex}`);
      if (isFinalStatic) {
        // if (isAvailable) {
        //   setStep("dynamic");
        // } else {
        // }
        setStep("final");
      }
      increment();
      return;
    }

    // if (step === "dynamic") {
    //   onDynamicAnswer(answer);
    //   if (isFinalDynamic) {
    //     setStep("final");
    //   }
    //   increment();
    // }
  };

  const onBackPress = () => {
    decrement();
    if (step === "static") {
      if (!isFirstStatic) {
        getPrevStatic();
      } else {
        setStep("household");
      }
      return;
    }
    // if (step === "dynamic") {
    //   if (!isFirstDynamic) {
    //     getPrevDynamic();
    //   } else {
    //     setStep("static");
    //   }
    // }
    if (step === "final") {
      //   if (isAvailable) {
      //     setStep("dynamic");
      //   } else {
      // }
      setStep("static");
    }
  };

  return {
    step,
    data,
    progress,
    staticQuestion,
    // dynamicQuestion,
    onAnswer,
    onHouseholdSelect,
    onFinalAnswer,
    onBackPress,
  };
};

export default useSteps;
