import { parseJwt } from "@/utils/vcUtils";
import styles from "./Credentials.module.css";

const credentialsLabels = {
  avgMonthlyIncome: "Average Monthly Income",
  savingPercent: "Saving Percent",
  hasKYC: "Has KYC",
  citizenship: "Citizenship",
  avgMonthlyRest: "Avg Monthly Rest",
  age: "Age",
};

const visibleCredentials = [
  "avgMonthlyIncome",
  "savingPercent",
  "hasKYC",
  "citizenship",
  "avgMonthlyRest",
  "age",
];

const extractCredential = (credential) => {
  let [key, value] = Object.entries(credential.vc.credentialSubject)[0];
  let label = credentialsLabels[key];

  return {
    label,
    key,
    value,
  };
};

const filterCredential = ({ key }) =>
  visibleCredentials.findIndex((value) => value == key);

const Credential = ({ credentials, from }) => {
  let parsedCredentials = credentials
    .map(parseJwt)
    .map(extractCredential)
    .filter(filterCredential);
  console.log("parsedCredentials", parsedCredentials);

  return (
    <div className={styles.container}>
      <h2>Credentials</h2>
      <div className={styles.from}>
        <svg
          width="23"
          height="29"
          viewBox="0 0 23 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 1L19.593 4L23 4.414L20.5 6.667L21 10L18 8.125L15 10L15.5 6.667L13 4.414L16.5 4L18 1Z"
            fill="black"
          />
          <path
            d="M17.7169 12.249L15.7794 11.751C15.4321 13.0893 14.6959 14.2946 13.6638 15.2147C12.6318 16.1348 11.3502 16.7283 9.981 16.9204C8.61178 17.1124 7.21636 16.8944 5.97101 16.2937C4.72567 15.6931 3.68629 14.7368 2.98417 13.5457C2.28206 12.3547 1.94872 10.9822 2.02626 9.60174C2.1038 8.22129 2.58875 6.89479 3.41983 5.78983C4.25092 4.68486 5.39085 3.85101 6.69563 3.39361C8.0004 2.93621 9.41147 2.87579 10.7506 3.21997L11.2496 1.28348C9.29792 0.776559 7.23252 0.940479 5.38526 1.74889C3.53801 2.55731 2.01616 3.96328 1.06428 5.74086C0.112401 7.51845 -0.214242 9.56444 0.136843 11.55C0.487928 13.5356 1.49635 15.3456 3.00007 16.689V29L9.00007 25L15.0001 29V16.7078C16.3281 15.5241 17.2739 13.9719 17.7169 12.249V12.249ZM13.0001 25.2627L9.00007 22.5962L5.00007 25.2627V18.05C6.24109 18.6735 7.6105 18.9987 8.99934 18.9998C10.3882 19.0008 11.7581 18.6777 13.0001 18.0562V25.2627Z"
            fill="black"
          />
        </svg>

        <h2>From Finastra</h2>
      </div>
      {parsedCredentials.map(({ label, value, key }) => {
        return (
          <div className={styles.credential} key={key}>
            <div>
              <b>{label}:</b>
            </div>
            <div>{value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Credential;
