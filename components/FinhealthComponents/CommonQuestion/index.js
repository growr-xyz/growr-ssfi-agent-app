import Answer from "../Answer";
import { useEffect, useLayoutEffect, useState } from "react";
import useMobileView from "../../../hooks/useMobileView";
import BaseContentLayout from "../../BaseContentLayout/BaseContentLayout";

import { useTrail, animated } from "react-spring";
import { useTranslations } from "next-intl";

function CommonQuestion({ question, onAnswer, translate }) {
  let [localValue, setLocalValue] = useState(null);
  const commonT = useTranslations("common");
  let mobileView = useMobileView();
  let { id: questionId, answers, label, description } = question;

  let [initTime, setInitTime] = useState(0);

  const [trail, answersApi] = useTrail(answers.length, () => ({
    opacity: 0,
    y: 0,
  }));

  useLayoutEffect(() => {
    answersApi.set({ opacity: 0, y: 0 });

    answersApi.start({
      opacity: 1,
      y: 0,
      delay: 0,
    });
  }, [question, answersApi]);

  useEffect(() => {
    // clear local state when question changes
    setLocalValue(null);

    // set time for initialization for question
    let time = performance.now();
    setInitTime(time);
  }, [question]);

  const onChange = (localAnswer) => {
    setLocalValue(localAnswer);
  };

  const onContinue = () => {
    let answerTime = performance.now();
    if (localValue) {
      localValue.timeElapsed = Math.round(answerTime - initTime);
      onAnswer(localValue);
    }
    setInitTime(0);
  };

  return (
    <BaseContentLayout
      {...{
        submitButtonProps: {
          label: commonT("continue"),
          onClick: onContinue,
          disabled: !localValue,
        },
      }}
    >
      <div>
        <h1>{label && translate(`${questionId}.label`)}</h1>
        <h4>{description && translate(`${questionId}.description`)}</h4>
        <div>
          {trail.map((style, index) => {
            let { value, ...rest } = answers[index];

            return (
              <animated.div style={style} key={value}>
                <Answer
                  {...{
                    value: translate(`${questionId}.answers.${value}`),
                    name: questionId,
                    selected: localValue?.id,
                    onChange,
                    mobileView,
                    ...rest,
                  }}
                />
              </animated.div>
            );
          })}
        </div>
      </div>
    </BaseContentLayout>
  );
}

export default CommonQuestion;
