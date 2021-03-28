import styled, { createGlobalStyle } from 'styled-components'

//import image
import BackgroundImage from './images/background.jpg'

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        background-color: #3c3c3c;
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
        background-image: url(${BackgroundImage});
        color: white;
    }
`

export const NextButtonWrapper = styled.div`
button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    background-image: linear-gradient(#002475, #002e94);
    border: 2px solid #a1a09e;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`