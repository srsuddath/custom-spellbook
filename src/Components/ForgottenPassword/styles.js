import styled from 'styled-components';

export const Wrapper = styled.div`
  .window {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: #222736;
    border-radius: 2px;
    padding: 5px 20px 20px;
    text-align: center;
    color: #ffffff;
    margin: 0px 0px 250px;
    -webkit-box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
    box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
    min-width: 255px;

    h2 {
      padding: 5px 5px 2px;
      margin: 10px 0px 20px;
      color: #ffffff;
      font-size: 1.2rem;
    }

    .link {
      background: none;
      box-shadow: none;
      transition: color 0.2s ease;
      &:hover {
        color: #ce6857;
      }
    }

    .action-button {
      margin: 10px 0px 20px;
      padding: 6px 0px;
      width: 100%;
    }

    input {
      width: 100%;
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 0px;
      }
    }
  }
`;
