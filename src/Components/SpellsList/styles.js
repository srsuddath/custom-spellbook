import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  width: 100%;

  .spell {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    background: transparent;
    width: 100%;
    align-items: center;
    flex-direction: column;
    color: #ffffff;
    border-bottom: 1px solid #3a4054;

    &:first-of-type {
      margin-top: 20px;
      border-top: 1px solid #3a4054;
    }

    .icon-button {
      background: none;
      box-shadow: none;
      padding: 0;
      margin: 0;
      height: 14px;
      width: 14px;

      path {
        transition: fill 0.3s ease;
      }
      &:hover path {
        fill: #ffffff;
      }
    }

    button {
      padding: 6px 10px;
    }
  }

  svg {
    height: 25px;
    width: 25px;
    padding: 5px;
    border-radius: 50%;
    margin: 0 2px;
    -webkit-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
    fill: #96a3dd;
    transition: box-shadow 0.3s ease, background 0.3s ease;
    overflow: visible;
    background: #434069; /* Old browsers */
    background: -moz-linear-gradient(
      90deg,
      #373d51 1%,
      #434069 100%
    ); /*FF3.6-15 */
    background: -webkit-linear-gradient(
      90deg,
      #373d51 1%,
      #434069 100%
    ); /*Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      90deg,
      #373d51 1%,
      #434069 100%
    ); /*W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  }

  .spell-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
  }

  .spell-reference {
    display: flex;
    align-items: center;
    flex: 1;

    .reference-icon {
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      color: #96a3dd;
      font-size: 0.6rem;
      border-radius: 50%;
      margin: 0 2px;
      padding: 2px;
      height: 23px;
      width: 23px;
      background: #434069; /* Old browsers */
      background: -moz-linear-gradient(
        90deg,
        #373d51 1%,
        #434069 100%
      ); /*FF3.6-15 */
      background: -webkit-linear-gradient(
        90deg,
        #373d51 1%,
        #434069 100%
      ); /*Chrome10-25,Safari5.1-6 */
      background: linear-gradient(
        90deg,
        #373d51 1%,
        #434069 100%
      ); /*W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    }

    .bigger-text {
      font-size: 0.8rem;
    }
  }
  .spell-title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;
  }
  .spell-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
  }
  .spell-other-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    margin: 0 2px;

    button {
      margin: 0 2px;
    }
  }

  .header-button {
    margin: 0 0 7px;
  }

  .chevron {
    transform: rotate(270deg);
  }

  .rotate {
    transform: rotate(90deg);
  }
  .spell-details {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 10px;
  }
  .top-spell-details {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 0.8rem;
    margin: 10px 0 10px;
  }
  .lower-spell-details {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 0.8rem;
  }
  .spell-description {
    margin: 5px 0 9px 50px;
    padding: 7px 0 3px;
    font-size: 0.8rem;
    text-align: left;
    color: #ffffff;
    background: transparent;
    border: none;
    white-space: pre-wrap;
  }
  .hidden {
    display: none;
  }
`;
