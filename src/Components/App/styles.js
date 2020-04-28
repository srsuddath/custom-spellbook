import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: #222736;
    -webkit-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.2);
    color: #ffffff;
    padding: 0 20px;

    h1 {
      margin: 5px;
      padding: 5px;
      font-size: 1rem;
      color: #ffffff;
    }

    div{
      flex: 1;
    }

    .user-info{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      
      p{
        margin: 0;
      }

      button{
        margin: 0 0 0 15px;
        padding: 5px 15px;
      }
    }

  }

  .message {
    margin: 50px 0px 25px;
    padding: 0px 20px;
    color: #ffffff;
    min-height: 15px;
    font-size: 0.8rem;
  }
`;
