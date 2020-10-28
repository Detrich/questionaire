import { NavLink } from "react-router-dom";
import './Home.css'

function Home() {
  return (
    <div className="Background">
      <div className='card-round'>
      <div className="top">Welcome!</div>
      <div className="welcome">Welcome to the Worlds Greatest Questionnaire!</div>
      <div className='directions'>
      <div>How to play:</div>
      <div>Click The start button below to start the game.</div>
      <div>You will be given a question and four different options to choose from.</div>
      <div>Select the correct question to raise your score.</div>
      <div>Be careful! If you miss three questions you will have to restart.</div>
      <div>Get all of the questions correct to win!</div>
      </div>
      <NavLink to="/play" className='round-button'>
        START
      </NavLink>
      </div>
    </div>
  );
}
export default Home;
