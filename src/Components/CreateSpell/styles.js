import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  width: 100%;

  .spell-title {
    padding: 5px 5px 2px;
    margin: 10px 0px 7px;
    color: #ffffff;
    font-size: 1rem;
    width: 210px;
    border-radius: 1px;
  }

  h3 {
    margin: 5px;
    padding: 5px;
    font-size: 1.2rem;
    color: #ffffff;
    width: 100%;
    text-align: center;
  }
  button {
    margin: 10px 0 10px;
  }

  .label {
    padding: 5px 2px 5px 2px;
    margin: 0 8px 5px 0;
    font-size: 0.7rem;
    color: #ffffff;
  }

  .casting-modifiers {
    margin: 4px 0px 0px;
  }

  .spell-components {
    margin: 4px 0px 0px;
  }

  .spell-description {
    width: 400px;
    height: 150px;
    margin: 5px 0px 9px;
    padding: 7px 0 3px;
    font-size: 0.8rem;
    color: #ffffff;
    background: transparent;
    border-color: #ffffff;
    border: 1px solid #3a4054;
    border-radius: 1px;
    resize: none;
  }

  .new-spell-form {
    align-items: center;
    display: flex;
    flex-direction: column;
    background: #222736;
    border-radius: 2px;
    padding: 5px 20px 20px;
    text-align: center;
    justify-content: start;
    color: #ffffff;
    margin: 0px 0px 20px;
    -webkit-box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
    box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
    min-width: 255px;
  }

  .go-home {
    margin: 10px 0 0 0;
  }
`;
