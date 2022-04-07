import Head from "next/head";
import useSteps from "../../hooks/useSteps";
import styles from "./Finhealth.module.css";
import ProgressHeader from "../../components/FinhealthComponents/ProgressHeader";
import CommonQuestion from "../../components/FinhealthComponents/CommonQuestion";
import InitialQuestion from "../../components/FinhealthComponents/InitialQuestion";
import FinalQuestion from "../../components/FinhealthComponents/FinalQuestion/FinalQuestion";
import Score from "../../components/FinhealthComponents/Score";
import Page from "../../components/Page/Page";
import { useTranslations } from "next-intl";
import LeftArrow from "../../components/Icons/LeftArrow";

import staticQuestions from "../../questions-config/static.json";
import { useRouter } from "next/router";

const Finhealth = ({ config, locale }) => {
  const router = useRouter();
  const {
    step,
    data,
    progress,
    staticQuestion,
    dynamicQuestion,
    onAnswer,
    onBackPress,
    onHouseholdSelect,
    onFinalAnswer,
  } = useSteps({
    config,
  });
  const staticT = useTranslations("static");
  //   const dynamicT = useTranslations("dynamic");

  const onBackOverride = () => {
    if (step === "household") {
      router.replace("/dashboard");
      return;
    }
    onBackPress();
  };

  const renderHeader = () => {
    if (step === "score") return undefined;
    // eslint-disable-next-line react/display-name
    return (
      <div onClick={onBackOverride} className={styles.backButton}>
        <LeftArrow />
      </div>
    );
  };

  return (
    <Page renderHeader={renderHeader}>
      {step !== "score" && (
        <ProgressHeader
          {...{
            progress,
            onBackPress: onBackOverride,
          }}
        />
      )}

      {step === "household" && <InitialQuestion onSelect={onHouseholdSelect} />}
      {step === "static" && (
        <CommonQuestion
          {...{ question: staticQuestion, onAnswer, translate: staticT }}
        />
      )}
      {/* {step === "dynamic" && !!dynamicQuestion && (
        <CommonQuestion
          {...{ question: dynamicQuestion, onAnswer, translate: dynamicT }}
        />
      )} */}
      {step === "final" && <FinalQuestion onAnswer={onFinalAnswer} />}
      {step === "score" && <Score data={data} lang={locale} />}
    </Page>
  );
};

export default Finhealth;

export async function getStaticProps({ locale }) {
  return {
    props: {
      config: {
        static: staticQuestions,
        // dynamic: dynamicQuestions,
      },
      messages: {
        static: require(`../../locales/${locale}/static.json`),
        // static: require(`../locales/${locale}/static.json`),
        // dynamic: require(`../locales/${locale}/dynamic.json`),
        common: require(`../../locales/${locale}/common.json`),
      },
      locale,
    },
  };
}
