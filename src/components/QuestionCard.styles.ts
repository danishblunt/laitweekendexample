import styled from 'styled-components'

export const QuestionWrapper = styled.div`
  max-width: 1100px;
  background-image: linear-gradient(#002475, #002e94);
  border-radius: 10px;
  border: 2px solid #a1a09e;
  padding: 20px;
  text-align: center;
  p {
    font-family: Calibri;
    color: white;
    font-size: 1rem;
  }
`

type ButtonWrapperProps = {
  correct: boolean
  userClicked: boolean
  uncertain: boolean
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;
  :hover {
    opacity: 0.8;
  }
  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    background: ${({ correct, userClicked, uncertain }) =>
      uncertain && userClicked ? 'linear-gradient(0deg, #ff9900, #ffad33)'
      :
      correct && !uncertain
        ? 'linear-gradient(0deg, #56FFA4, #59BC86)'
        : !correct && userClicked
        ? 'linear-gradient(0deg, #FF5656, #C16868)'
        : 'linear-gradient(0deg, #002475, #002e94)'};
    border: 2px solid #a1a09e;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`
