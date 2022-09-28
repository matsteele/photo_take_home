import styled from "styled-components";
import { colors } from "../util/colors";

export const HeaderLayout = styled.nav`
  background-color: white;
  display: flex;
  justify-content: flex-end;

  div {
    display: flex;
  }
  .navcontainer {
    width: 100%;
    padding-right: 50px;
    padding-left: 50px;
    justify-content: space-between;
  }
  figure {
    display: flex;
    align-items: center; p
  }

  h1 {
    color: ${colors.lightRed} ;
  }

  .authButtons {
    align-items: center;
  }
`;

export const AuthBoxContainer = styled.div`
  position: relative;

  button {
    height: 30px;
    color: ${colors.lightRed};
    border-color: ${colors.lightRed} !important;
  }

  .selectedButton {
    background: white;

    button {
      color: white;
    }
  }

  .notSelectedButton {
    background: ${colors.lightRedTransparent};
  }
  form {
    button {
      background: white;
      &:hover {
        background: ${colors.lightRed};
        color: white;
      }
    }
  }

  .dropdwn {
    p {
      color: white;
      font-weight: bold;
    }
    h1{
      color:white
    }
    padding: 10px;
    width: 140px;
    background-color: ${colors.lightRed};
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 43px;
    right: 18px;
    justify-content: space-evenly;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;

    input {
      color: white;
    }
    label {
      color: white;
    }
    .MuiInputBase-root {
      background: transparent;
      text {
        color: white;
      }
      &:before {
        border-bottom: 2px solid white;
      }
      &:after {
        border-bottom: 2px solid white;
      }
    }
    .MuiFormControlLabel-root {
      padding-left: 1px;
      span {
        color: white;
      }
    }
  }
`;
