import styles from "./Page.module.css";

const Page = ({ children, renderHeader, styles: styleOverrides = {} }) => {
  const stylesObj = {
    wrap: [styles.wrap],
    container: [styles.container],
  };

  if (Object.keys(styleOverrides).length) {
    Object.entries(styleOverrides).forEach(([key, value]) => {
      stylesObj[key].push(value);
    });
  }

  return (
    <div className={stylesObj.wrap.join(" ")}>
      {renderHeader?.()}
      <div className={stylesObj.container.join(" ")}>{children}</div>
    </div>
  );
};

export default Page;
