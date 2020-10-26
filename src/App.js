import data from "./Apprentice_TandemFor400_Data.json";
import { useState, useEffect } from "react";
import "./App.css";

//question,incorrect,correct
function App() {
  const [question,setQuestion] = useState(getRandomQuestion());
  const [score, setScore] = useState(0);
  function getRandomQuestion() {
    let objectkeys = Object.keys(data);
    let randomKey = objectkeys[Math.floor(Math.random() * objectkeys.length)];
    return data[randomKey];
  }
  function wrongAnswer() {
    alert("Wrong Answer");
    setQuestion(getRandomQuestion())
  }
  function rightAnswer(){
    alert("Correct!")
    setQuestion(getRandomQuestion())
    setScore(score+1)

  }
  return (
    <div className="App">
      <header className="Background">
        <div className="cardBackground">
        {question.question}
        <div className="buttonFormatting">
          {question.incorrect.map((answer) => (
            <button className="ansButtons" onClick={wrongAnswer}>
              {answer}
            </button>
          ))}
          <button
            className="ansButtons"
            onClick={rightAnswer}
          >
            {question.correct}
          </button>
        </div>
        <div className="score">Score: {score}</div>

        </div>
      </header>
    </div>
  );
}

export default App;
