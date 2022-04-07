import styles from "./InitialQuestion.module.css";
import { useState } from "react";
import BaseContentLayout from "../../BaseContentLayout/BaseContentLayout";
import PersonIcon from "../../Icons/PersonIcon";
import HouseholdIcon from "../../Icons/HouseholdIcon";
import { useSpring, animated } from "react-spring";
import { useTranslations } from "next-intl";
import Link from "next/link";

const iconMap = {
  person: PersonIcon,
  household: HouseholdIcon,
};

let initialQuestion = {
  answers: [
    {
      id: "person",
      icon: "person",
      value: "a",
    },
    {
      id: "family",
      icon: "household",
      value: "b",
    },
  ],
};

const InitialQuestion = ({ onSelect }) => {
  const t = useTranslations("common.initialQuestion");
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  let [localValue, setLocalValue] = useState("");
  let { answers } = initialQuestion;
  const onChange = (value) => {
    setLocalValue(value);
  };

  let isSelected = (id) => id === localValue;

  return (
    <BaseContentLayout
      {...{
        submitButtonProps: {
          label: t("nextButton"),
          onClick: () => {
            onSelect(localValue);
          },
          disabled: !localValue,
        },
      }}
    >
      <div className={styles.content}>
        <h1>{t(`label`)}</h1>
        <div className={styles.answers}>
          <div className={styles.answersContainer}>
            {answers.map(({ value, icon, id }) => {
              let IconComponent = iconMap[icon];

              let buttonClassName = `${styles.button} ${
                isSelected(id) ? styles.selected : ""
              }`;

              return (
                <animated.div key={id} style={props}>
                  <div className={styles.answer}>
                    <button
                      className={buttonClassName}
                      onClick={() => onChange(id)}
                    >
                      <IconComponent />
                    </button>
                    <span className={styles.btnLabel}>
                      {t(`answers.${value}`)}
                    </span>
                  </div>
                </animated.div>
              );
            })}
          </div>
        </div>
      </div>
    </BaseContentLayout>
  );
};

export default InitialQuestion;
