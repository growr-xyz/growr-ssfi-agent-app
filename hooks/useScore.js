import { useState, useEffect } from "react";

const useScore = (data) => {
  let [score, setScore] = useState(0);
  let [poolScores, setPoolScores] = useState([]);

  useEffect(() => {
    if (data) {
      let poolScoresArray = Object.entries(data).reduce((acc, entries) => {
        let [pool, questions] = entries;
        let answersArray = Object.values(questions);
        let totalPoints = 0;
        answersArray.forEach(({ points }) => {
          totalPoints += points;
        });

        acc.push({ pool, score: totalPoints / answersArray.length / 100 });

        return acc;
      }, []);
      let totalScore = poolScoresArray.reduce((a, b) => a + b.score, 0);

      let finHealthScore = totalScore / poolScoresArray.length;
      if (finHealthScore === 0) finHealthScore = 0.01;
      setScore(finHealthScore);
      setPoolScores(poolScoresArray);
    }
  }, [data]);

  return {
    score,
    poolScores,
  };
};

export default useScore;
