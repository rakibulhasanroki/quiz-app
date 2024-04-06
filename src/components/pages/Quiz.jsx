import Answer from "../Answer.jsx";
import ProgressBar from "../ProgressBar";
import MiniPlayer from "../MiniPlayer";
import { useParams, useNavigate } from "react-router-dom";
import useQuestions from "../hooks/useQuestions.jsx";
import { useEffect, useReducer, useState } from "react";
import _ from "lodash";
import { getDatabase, ref, set } from "firebase/database";
import { UseAuth } from "../../context/AuthContext.jsx";
const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;

    case "answer":
      // eslint-disable-next-line no-case-declarations
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  const { currentUser } = UseAuth();
  const history = useNavigate();
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qen, dispatch] = useReducer(reducer, initialState);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }
  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  // next question
  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  }
  // prev Question
  function prevQuestion() {
    if (currentQuestion - 1 >= 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qen,
    });

    history(`/result/${id}`, {
      state: {
        qen: qen,
      },
    });
  }

  // Progress Bar
  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There is an error...</div>}
      {!loading && !error && qen && qen.length > 0 && (
        <>
          <h1>{qen[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answer
            input={true}
            options={qen[currentQuestion].options}
            handelChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            progress={percentage}
            submit={submit}
          />
          <MiniPlayer />
        </>
      )}
    </>
  );
}
