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
    font-size: 1.2rem;
    width: 100%;
    border-top: 1px solid #3a4054;
  }

  button {
    margin: 0 0 10px;
  }
  .end-form-span {
    width: 100%;
    border-top: 1px solid #3a4054;
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
`;
