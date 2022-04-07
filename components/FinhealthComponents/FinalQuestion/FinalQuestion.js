import BaseContentLayout from "../../BaseContentLayout/BaseContentLayout";
import { useState } from "react";
import styles from "./FinalQuestion.module.css";
import { useTranslations } from "next-intl";
import Lock from "../../LockIcon/LockIcon";

let finalStepConfig = {
  name: "finalQuestion",
  questions: [
    {
      id: "location",
      options: [
        {
          id: "a",
          value: "largeTown",
        },
        {
          id: "b",
          value: "smallTown",
        },
        {
          id: "c",
          value: "village",
        },
      ],
    },
    {
      id: "income",
      options: [
        {
          id: "a",
          value: "low",
        },
        {
          id: "b",
          value: "min",
        },
        {
          id: "c",
          value: "high",
        },
      ],
    },
    {
      id: "age",
      options: [
        {
          id: "a",
          value: "0-18",
        },
        {
          id: "b",
          value: "18-30",
        },
        {
          id: "c",
          value: "30-45",
        },
        {
          id: "d",
          value: "45-65",
        },
        {
          id: "e",
          value: "65+",
        },
      ],
    },
  ],
};

const FinalQuestion = ({ onAnswer }) => {
  const t = useTranslations("common.finalQuestions");

  let [localState, setLocalState] = useState({
    location: "",
    income: "",
    age: "",
  });
  let { questions } = finalStepConfig;

  const onSelect = (id, value) => {
    setLocalState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const isDisabled = () => Object.values(localState).every((item) => !!item);

  return (
    <BaseContentLayout
      {...{
        submitButtonProps: {
          label: t(`nextButton`),
          onClick: () => {
            onAnswer(localState);
          },
          disabled: !isDisabled(),
        },
      }}
    >
      <div>
        <h1>{t(`label`)}</h1>
        {t(`description`)
          .split("\n")
          .map((message, index) => {
            return (
              <div className={styles.descriptionContainer} key={index}>
                <p className={styles.description} key={index}>
                  {message}
                </p>
                {index === 1 && <Lock />}
              </div>
            );
          })}
        <div className={styles.questionsContainer}>
          {questions.map(({ options, id: questionId }) => {
            return (
              <div className={styles.question} key={questionId}>
                <p className={styles.questionLabel}>
                  {t(`questions.${questionId}.label`)}
                </p>
                <div className={styles.optionsContainer}>
                  {options.map(({ id: answerId, value }) => {
                    let isSelected = localState[questionId] === value;
                    let buttonClassName = `${styles.option} ${
                      isSelected ? styles.selected : ""
                    }`;
                    return (
                      <button
                        className={buttonClassName}
                        key={answerId}
                        onClick={() => {
                          onSelect(questionId, value);
                        }}
                      >
                        {t(`questions.${questionId}.answers.${answerId}`)}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BaseContentLayout>
  );
};

export default FinalQuestion;
