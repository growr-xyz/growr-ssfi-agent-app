import { useState } from "react";

const useStaticQuestion = ({ questions, setData }) => {
  let [staticQuestions] = useState(questions);
  let [staticQuestionIndex, setStaticQuestionIndex] = useState(0);

  const onAnswer = (answer) => {
    let { pool, id: questionId } = staticQuestions[staticQuestionIndex];
    setData((draft) => {
      if (!draft.static[pool]) {
        draft.static[pool] = {};
      }
      draft.static[pool][questionId] = answer;
    });
    if (staticQuestionIndex !== staticQuestions.length - 1) {
      setStaticQuestionIndex(++staticQuestionIndex);
    }
  };

  const getPrev = () => {
    setStaticQuestionIndex((staticQuestionIndex -= 1));
  };

  return {
    staticQuestion: staticQuestions[staticQuestionIndex],
    isFinal: staticQuestions.length - 1 === staticQuestionIndex,
    isFirst: staticQuestionIndex === 0,
    questionIndex: staticQuestionIndex + 1,
    onAnswer,
    getPrevStatic: getPrev,
  };
};

export default useStaticQuestion;
