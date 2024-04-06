import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../hooks/useAnswers";
import _ from "lodash";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const location = useLocation();
  const { qen } = location.state || {};
  const { loading, error, answers } = useAnswers(id);

  function calculate() {
    let score = 0;

    // Ensure answers and qen are both available and have the same length
    if (answers && qen && answers.length === qen.length) {
      answers.forEach((question, index1) => {
        const correctIndexes = [];
        const checkedIndexes = [];

        // Determine correct indexes and checked indexes
        question.options.forEach((option, index2) => {
          if (option.correct) {
            correctIndexes.push(index2);
          }
          if (qen[index1].options[index2].checked) {
            checkedIndexes.push(index2);
            option.checked = true;
          }
        });

        if (_.isEqual(correctIndexes, checkedIndexes)) {
          score += 5;
        }
      });
    }

    return score;
  }

  const useScore = calculate();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There is an error</div>}
      {!loading && !error && answers.length > 0 && (
        <>
          <Summary score={useScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
