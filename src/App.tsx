import React, { useState } from 'react'
import useSound from 'use-sound';
// functions
import {fetchQuestions} from './API'
// types
import {Difficulty , QuestionState} from './API'
// components
import QuestionCard from './components/QuestionCard'
//sound
import SoundURL from './sounds/sound.mp3'
// styles
import { GlobalStyle } from './App.styles'
import { NextButtonWrapper, TryagainButtonWrapper } from './App.styles'


const TOTAL_QUESTIONS = 5

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {
  // states
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [currentDifficulty, setCurrentDifficulty] = useState(0)
  const [uncertainUser, setUncertainUser] = useState(false)
  const [lostGame, setLostGame] = useState(false)

  const OutputMoney = (currentMoney: number) => {
    switch(currentMoney) {
      case 0:
        return 0
      case 1:
        return 100
      case 2:
        return 200
      case 3:
        return 500
      case 4:
        return 1000
      case 5:
        return 2000
      case 6:
        return 4000
      case 7:
        return 8000
      case 8:
        return 16000
      case 9:
        return 32000
      case 10:
        return 64000
      case 11:
        return 128000
      case 12:
        return 250000
      case 13:
        return 250000
      case 14:
        return 500000
      case 15:
        return 1000000
      default:
    }
  }


  const fetchAllQuestions = async (difficulty: string) => {
    if(difficulty === "easy"){
      const easyQuestions = await fetchQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      )
      return easyQuestions
    }else if(difficulty === "medium"){
      const mediumQuestions = await fetchQuestions(
        TOTAL_QUESTIONS,
        Difficulty.MEDIUM
      )
      return mediumQuestions
    }else{
      const hardQuestions = await fetchQuestions(
        TOTAL_QUESTIONS,
        Difficulty.HARD
      )
      return hardQuestions
    }
  } 

  const startQuiz = async () => {
    setLoading(true)
    setGameOver(false)
    const startingQUestions = await fetchAllQuestions("easy")
    setQuestions(startingQUestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setCurrentDifficulty(1)
    play({ id: 'easyMusic' })
    setLoading(false)
  }

    const [play, { stop }] = useSound(SoundURL, {
      volume: 0.5,
      sprite: {
        correctAnswer: [0, 5000],
        wrongAnswer: [5000, 3000],
        easyMusic: [8400, 163000],
        mediumMusic: [174200, 163000],
        hardMusic: [646000, 163000],
        lockinSound: [801000, 5000]
      },
    })

  const resetGame = () => {
    setLostGame(true)
    stop()
    setCurrentDifficulty(0)
    play({ id: 'wrongAnswer' })
  }

  const revealAnswer = (rightorwrong: boolean) => { 
    setUncertainUser(false)
    if(rightorwrong){
      stop()
      play({ id: 'correctAnswer' })
      setTimeout(()=>nextQuestion(), 5000);
      setScore(prev => prev+1)
    }else{
      resetGame()
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver && !uncertainUser) {
      // Users Answer
      const answer = e.currentTarget.value
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer
      // Add Score if answer is correct
      stop()
      play({ id: 'lockinSound' })
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
      setUncertainUser(true)
      if(correct) {
        setTimeout(()=>revealAnswer(true), 5000);
      }else{
        setTimeout(()=>revealAnswer(false), 5000);
      }
    }
  }

  const nextQuestion = async () => {
    // move on to the next question
    const nextQuestion = number +1
    if(nextQuestion === TOTAL_QUESTIONS && currentDifficulty === 3){
      setGameOver(true)
    }else if(nextQuestion === TOTAL_QUESTIONS && currentDifficulty < 3){
      setCurrentDifficulty(currentDifficulty+1)
      setNumber(0)
      if(currentDifficulty === 2){
        const startingQUestions = await fetchAllQuestions("medium")
        setQuestions(startingQUestions)
        setTimeout(()=>play({ id: 'mediumMusic' }), 5000);
      }else{
        const startingQUestions = await fetchAllQuestions("hard")
        setQuestions(startingQUestions)
        setTimeout(()=>play({ id: 'hardMusic' }), 5000);
      }
    }else{
      switch(currentDifficulty) {
        case 1:
          play({ id: 'easyMusic' })
          break;
        case 2:
          play({ id: 'mediumMusic' })
          break;
        case 3:
          play({ id: 'hardMusic' })
          break;
        default:
          stop()
      } 
      setNumber(nextQuestion)
    }

  }

  return (
    <>
    <GlobalStyle/>
      <div className="App">
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <NextButtonWrapper>
            <h1>React Quiz</h1>
            <button className="start" onClick={startQuiz}>start</button>
          </NextButtonWrapper>
        ) : null }
        {!gameOver && <p className="money">Money:${OutputMoney(score)}</p> }
        {loading  && <p>Loading Questions...</p>}
        {lostGame && <div>
          <TryagainButtonWrapper>
            <h1>GAME OVER</h1>
            <button className="start" onClick={startQuiz}>Try again!</button>
          </TryagainButtonWrapper>
        </div>}
        {!loading && !gameOver && (<QuestionCard 
          uncertainUser={uncertainUser}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />)}
      </div>
    </>
  )
}

export default App
