import React, { useEffect, useState } from 'react'
import questionsData from "./data.json"
import "./home.css"
import check_img from "./check.png"

const Home = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [answerDisabled, setAnswerDisabled] = useState(false);
  
    useEffect(() => {
      const currentQuestion = questionsData[currentQuestionIndex];
      const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
      const shuffled = shuffleArray(allAnswers);
      setShuffledAnswers(shuffled);
    }, [currentQuestionIndex]);
  
    const handleAnswerClick = (answer) => {
        if (!answerDisabled) {
            setAnswerDisabled(true);
            if (answer === questionsData[currentQuestionIndex].correct_answer) {
              setScore((prevScore) => prevScore + 1);
            }
            setSelectedAnswer(answer);
            setShowResult(true);
          }
    };
  
    const handleNextQuestion = () => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer('');
      setShowResult(false);
      setAnswerDisabled(false);
    };
  
  
    const currentQuestion = questionsData[currentQuestionIndex];

  return (
    <div className='quiz-container'>
      {currentQuestionIndex === questionsData.length-1 ? 
       (
        <div className='scores'>
          <h2>Test Completed!</h2>
          <div>
            <img src={check_img} alt='' style={{width:"50px",height:"50px"}}/>
          </div>
          <h4>Your Score : {score} / {questionsData.length}</h4>
          <p>Thank you. Your test submitted succefully</p>
        </div>
      )
      :
      (
        <>
          <div id="top-bar" style={{width:`${(currentQuestionIndex + 1)*5}%`}}></div>
          <div id="main-test">
            <div className='que-container'>
                <p className='que_heading'>Question {currentQuestionIndex + 1} of {questionsData.length}</p>
                <p className='p_categaory'>{questionsData[currentQuestionIndex].category}</p>
                <div id="difficulty-stars" >
                    {[...Array(5).keys()].map((starIndex) => (
                        <span
                        key={starIndex}
                        className={starIndex < getDifficultyStars(currentQuestion.difficulty) ? 'star-black' : 'star-gray'}
                        >
                        &#9733;
                        </span>
                    ))}
                </div>
            </div>
            <div>
                <p className='quetion'>{currentQuestion.question}</p>
                <ul className='option-list'>
                {shuffledAnswers.map((answer, index) => (
                    <li key={index} onClick={() => handleAnswerClick(answer)}
                    style={{
                        cursor: answerDisabled ? 'not-allowed' : 'pointer',
                        background: answer === selectedAnswer && showResult
                        ? (answer === currentQuestion.correct_answer ? 'green' : 'red')
                        : 'transparent',
                    }}>
                    <div>
                        {answer}
                    </div>
                    </li>
                ))}
                </ul>
            </div>
            <div className='show-result-container'>
                {showResult && (
                    <div>
                    {selectedAnswer === currentQuestion.correct_answer ? (
                        <p className='p_categaory' style={{color:"green"}}>Correct!</p>
                    ) : (
                        <p className='p_categaory' style={{color:"red"}}>Sorry. Please try again.</p>
                    )}
                    <button onClick={handleNextQuestion} className='next-que-btn'>Next Question</button>
                    </div>
                )}
            </div>
          </div>

          <div className='score-bar'>
            <div className='score-bars-percent'>
                <p>Score : {score*5}</p>
                <p>Max Score : {(score*5)+(questionsData.length-currentQuestionIndex-1)*5}</p>
            </div>
            <div className='bar'>
                <div style={{width:`${score*5}%`,background:"black",height:"15px"}}></div>
                <div style={{width:`${(score*5)+(questionsData.length-currentQuestionIndex-1)*5}%`,background:"rgba(0, 0, 0, 0.331)",height:"15px"}}></div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const getDifficultyStars = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'hard':
        return 3;
      case 'medium':
        return 2;
      case 'easy':
        return 1;
      default:
        return 0;
    }
  };
const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
export default Home