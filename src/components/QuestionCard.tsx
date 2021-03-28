import React from 'react'
// styles
import  { QuestionWrapper, ButtonWrapper } from './QuestionCard.styles'

type Props = {
  question: string
  answers: string[]
  callback: any
  userAnswer: any
}

const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer,
    }) => (
        <div>
            <QuestionWrapper>
                <p dangerouslySetInnerHTML={{__html: question}}></p>
            </QuestionWrapper>
            <div>
                {answers.map(answer => (
                    <ButtonWrapper key={answer} 
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}>
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                    </ButtonWrapper>
                ))}
            </div>
        </div>
    )

export default QuestionCard
