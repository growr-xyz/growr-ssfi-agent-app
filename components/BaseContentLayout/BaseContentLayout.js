import styles from "./BaseContentLayout.module.css";
import Button from "../Button/Button";
import ProgressHeader from "../ProgressHeader/ProgressHeader";
// import ProgressBar from "@/components/ProgressBar";
// import { ReactNode } from "react";

const BaseContent = ({
  children,
  submitButtonProps,
  renderCustomButton,
  activeStep,
  totalSteps,
  onBackPress
}) => {
  return (
    <div className={styles.container}>
      <ProgressHeader {...{
        progress : {
          step: activeStep,
          total: totalSteps
        },
        onBackPress
      }}  />
      <div className={styles.content}>{children}</div>
      <div>
        {submitButtonProps && (
          <div className={styles.submitContainer}>
            <Button {...submitButtonProps} />
            <div className={styles.customButton}>
              {renderCustomButton && renderCustomButton()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseContent;
