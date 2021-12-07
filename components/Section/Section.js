import styles from "./Section.module.css";

const Section = ({ label, children }) => (
  <div className={styles.container}>
    <h3 className={styles.label}>{label}</h3>
    <div className={styles.widgetContainer}>{children}</div>
  </div>
);

export default Section;
