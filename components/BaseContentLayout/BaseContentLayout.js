import styles from "./BaseContentLayout.module.css";
import Button from "../Button/Button";
// import ProgressHeader from "../ProgressHeader/ProgressHeader";

const BaseContent = ({ children, submitButtonProps, renderCustomButton }) => {
  return (
    <div className={styles.container}>
      {/* <ProgressHeader {...{
        progress: {
          step: progress.step,
          total: progress.total
        }
      }}
      /> */}
      <div className={styles.content}>{children}</div>
      <div>
        {submitButtonProps && (
          <div className={styles.submitContainer}>
            <Button {...submitButtonProps} />
            {renderCustomButton && renderCustomButton()}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseContent;
