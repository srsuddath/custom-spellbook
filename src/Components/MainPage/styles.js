import styled from 'styled-components';

export const Wrapper = styled.div`
  .background {
    align-items: center;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    text-align: center;
  }

  aside {
    align-items: center;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-evenly;
    background-image: linear-gradient(#4873eb, #2a4ba5);
    padding: 5px 30px 20px;
    text-align: center;
    color: #ffffff;
  }
  main {
    align-items: center;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-evenly;
    background-image: linear-gradient(#d1dbf5, #a2b5e9);
    padding: 5px 30px 20px;
    text-align: center;
    color: #ffffff;
  }
  .window {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    max-width: 600px;
    justify-content: space-evenly;
    background-color: #ffffff;
    padding: 5px 30px 20px;
    text-align: center;
    color: #ffffff;
    margin: 0px 0px 250px;
  }

  .inputs {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .input-box {
    border: 2px;
    margin: 4px;
    padding: 8px 18px;
    border-radius: 5px;
  }
  .spacer {
    height: 30%;
    width: 100%;
  }

  h2 {
    padding: 5px 5px 2px;
    margin: 10px;
    color: #ffffff;
  }
  h4 {
    padding: 5px 5px 2px;
    margin: 0px;
    color: #ffffff;
  }
  hr {
    width: 90%;
    color: #ffffff;
  }
  textarea {
    resize: none;
  }
  .spell-form {
    background-color: #445da1;
    display: flex;
    flex-direction: column;
  }

  .spell {
    padding: 5px;
    margin: 5px;
    background-color: grey;
  }
`;
