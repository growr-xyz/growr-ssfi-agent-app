import styles from "./Page.module.css";

const Page = ({ children, renderHeader }) => {
  return (
    <div className={styles.wrap}>
      {renderHeader?.()}
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Page;
