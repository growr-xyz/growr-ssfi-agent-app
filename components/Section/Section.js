import styles from "./Section.module.css";

const Section = ({ label, children, render }) => (
  <div className={styles.container}>
    <div className={styles.labelContainer}>
      <h3 className={styles.label}>{label}</h3>
      {render ? render() : null}
    </div>
    <div className={styles.widgetContainer}>{children}</div>
  </div>
);

export default Section;
