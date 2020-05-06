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
    width: 210px;
    margin: 5px 0px 9px;
    padding: 5px 0 3px;
    font-size: 0.8rem;
    color: #ffffff;
    background: #32384a;
    border-color: #ffffff;
    border: none;
    resize: none;
  }

  .checkbox-label {
    position: relative;
    margin: 10px 0 10px;

    input {
      opacity: 0;
      position: absolute;
      cursor: pointer;
    }
    input:checked ~ .custom-checkbox {
      background: #32384a;
      border-radius: 1px;

      -webkit-transform: rotate(0deg) scale(1);
      -ms-transform: rotate(0deg) scale(1);
      transform: rotate(0deg) scale(1);

      opacity: 1;
      border: 1px solid #ffffff;
    }

    input:checked ~ .custom-checkbox::after {
      -webkit-transform: rotate(45deg) scale(1);
      -ms-transform: rotate(45deg) scale(1);
      transform: rotate(45deg) scale(1);
      opacity: 1;
      border: 1px solid #ffffff;
      border-width: 0 2px 2px 0;
      background: transparent;
      border-radius: 1px;
      left: 5px;
      top: -3px;
      width: 4px;
      height: 9px;
    }

    .custom-checkbox {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 12px;
      width: 12px;
      background: #32384a;
      border-radius: 2px;
      border: 1px solid #ffffff;
    }

    .custom-checkbox::after {
      position: absolute;
      content: '';
      height: 0px;
      width: 0px;
      opacity: 1;
    }
  }
`;
