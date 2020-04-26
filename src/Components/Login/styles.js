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

  .login-window {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: #222736;
    border-radius: 2px;
    padding: 5px 30px 20px;
    text-align: center;
    color: #ffffff;
    margin: 0px 0px 250px;
    -webkit-box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
    box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
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
`;
