import styled from 'styled-components';

export const Wrapper = styled.div`
  .spell {
    padding: 5px;
    margin: 5px;
    background-color: grey;
    min-width: 600px;
    align-items: center;
  }

  img {
    height: 30px;
    width: 30px;
    background: #222736;
    padding: 3px;
    border-radius: 50%;
  }

  .spell-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
  }
`;
