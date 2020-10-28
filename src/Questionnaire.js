import data from "./Apprentice_TandemFor400_Data.json";
import { useState } from "react";
import "./Questionnaire.css";

let res = [];
//question,incorrect,correct
function Questionnaire() {
  const [question, setQuestion] = useState(getRandomQuestion());
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [WrongAnswers, setWrongAnswers] = useState(["•", "•", "•"]);
  let defaultClassName = "ansButtons";

  //randomizes our questions to be mixed up.
  let set = new Set(question.incorrect).add(question.correct);
  let randomizeAnswers = [...set].sort(function (a, b) {
    return Math.random() - 0.5;
  });

  //selects a random question out of our data object(JSON)

  function getRandomQuestion(answer) {
    let objectkeys = Object.keys(data);
    let randomKey = objectkeys[Math.floor(Math.random() * objectkeys.length)];
    if (!res.includes(answer)) {
      //if our res does not have our answer in it, push it in
      res.push(answer);
      // if our res has the answer already in it
      if (res.includes(data[randomKey].correct)) {
        //while loop for when we already had the random key in our list to create a new number to push into the list
        while (res.includes(data[randomKey].correct)) {
          //redefine randomkey to select another number for us
          randomKey = objectkeys[Math.floor(Math.random() * objectkeys.length)];
        }
        res.push(data[randomKey].correct);
        return data[randomKey];
      }
    }
    return data[randomKey];

  }
  //when we click on one of the answers we search if our answer is correct, if not, it's a wrong answer
  function submit(answer) {
    if (question.correct === answer) {
      document.getElementById(question.correct).className = "CorrectAns";
      setTimeout(function () {
        setQuestion(getRandomQuestion(question.correct));
        setScore(score + 1);
      }, 800);
    } else {
      document.getElementById(answer).className = "WrongAns";
      document.getElementById(question.correct).className = "CorrectAns";
      setTimeout(function () {
        setQuestion(getRandomQuestion(question.correct));
        setWrong(wrong + 1);
        setWrongAnswers((WrongAnswers) => ["X", ...WrongAnswers.slice(0, -1)]);
        if (wrong === 2) {
          alert("Try again?");
          setScore(0);
          if (score > highscore) {
            setHighscore(score);
          }
          setWrong(0);
          setWrongAnswers(["•", "•", "•"]);
          res = [];
        }
      }, 800);
    }
  }
  return (
    <div className="App">
      <header className="Background">
        <div className="cardBackground">
          {question.question}
          <div className="buttonFormatting">
            {randomizeAnswers.map((answer) => (
              <button
                className={defaultClassName}
                key={answer}
                value={answer}
                onClick={() => submit(answer)}
                id={answer}
              >
                {answer}
              </button>
            ))}
          </div>
          <div className="score">
            <div>Score: {score}</div>
            <div> High: {highscore}</div>
          </div>
          <div className="WrongAnswers">
            <div className="container">
              {WrongAnswers.map((x, i) => (
                <div key={i} className="amountCorrect">
                  {x}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Questionnaire;