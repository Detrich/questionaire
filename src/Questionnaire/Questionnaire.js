import data from "../Apprentice_TandemFor400_Data.json";
import { useState } from "react";
import "./Questionnaire.css";

//result array
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
  // uses a set so that we don't have multiple answers generated
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
        //I know this probably isn't the fastest implementation but It works well for this example
        while (res.includes(data[randomKey].correct)) {
          //fetch a new randomKey
          randomKey = objectkeys[Math.floor(Math.random() * objectkeys.length)];
        }
        return data[randomKey];
      }
    }
    return data[randomKey];
  }

  function resetGame() {
    setScore(0);
    //sets new highscore
    if (score > highscore) {
      setHighscore(score);
    }
    //resets the wrong answers
    setWrong(0);
    setWrongAnswers(["•", "•", "•"]);
    //resets our result array
    res = [];
  }
  //when we click on one of the answers we search if our answer is correct, if not, it's a wrong answer
  function submit(answer) {
    //if our selection is the same as our answer
    if (question.correct === answer) {
      //changes the color of the button to green by updating the class name.
      document.getElementById(question.correct).className = "CorrectAns";
      setTimeout(function () {
        //sets the highscore === score when I get a new highscore(updates highscore on the spot when you reach a new highscore)
        if (score >= highscore) {
          //adds one to highscore
          setHighscore(highscore + 1);
        }
        //adds one to the score
        setScore(score + 1);

        //finds if we won the game, I took 3 off because we have three chances to fail.
        if (score === data.length - 3) {
          if (window.confirm("You win!!!, Would you like to restart?")) {
            resetGame();
          } else {
            window.location.href = '/'
          }
          //resets the question, passing in the correct answer so that we can see if we have had that answer before
          setQuestion(getRandomQuestion(question.correct));
          setScore(0);
          if (score > highscore) {
            setHighscore(score);
          }
          setWrong(0);
          setWrongAnswers(["•", "•", "•"]);
          res = [];
        } else {
          setQuestion(getRandomQuestion(question.correct));
        }
      }, 800);
    } else {
      document.getElementById(answer).className = "WrongAns";
      document.getElementById(question.correct).className = "CorrectAns";
      setTimeout(function () {
        setQuestion(getRandomQuestion(question.correct));
        setWrong(wrong + 1);
        setWrongAnswers((WrongAnswers) => ["X", ...WrongAnswers.slice(0, -1)]);

        if (wrong === 2) {
          if (window.confirm("Defeat... Would you like to restart?")) {
            resetGame();
          } else {
            window.location.href = '/'
          }
        }
      },
        800);
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
            <div>
              {score} out of {data.length - 2}
            </div>
            <div> High Score: {highscore}</div>
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
