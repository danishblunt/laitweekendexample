import React from 'react'
// styles
import  { QuestionWrapper, ButtonWrapper } from './QuestionCard.styles'

type Props = {
  question: string
  answers: string[]
  callback: any
  userAnswer: any
  uncertainUser: boolean
}

const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer,
    uncertainUser,
    }) => (
        <div>
            <QuestionWrapper>
                <p dangerouslySetInnerHTML={{__html: question}}></p>
            </QuestionWrapper>
            <div>
                {answers.map(answer => (
                    <ButtonWrapper key={answer} 
                    uncertain={uncertainUser}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}>
                    <button value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                    </ButtonWrapper>
                ))}
            </div>
        </div>
    )

export default QuestionCard
