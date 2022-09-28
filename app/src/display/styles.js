import styled from "styled-components";
import { colors } from "../util/colors";
export const DislayLayout = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  width: 100vw;
  .display-container {
    display: flex;
    flex-direction: column;

    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    width: 900px;
    height: 900px;
  }
  .table {
    background-color: white;
    border-radius: 20px;
    padding: 25px;
  }
  .scriptsDisplay {
    height: 300px;
    width: 400px;
  }
  .tableHeader {
    header {
      h1 {
        color: white;
      }
      display: flex;
      justify-content: space-between;
      .buttons {
        display: flex;
        width: 200px;
        justify-content: space-around;
        .delete {
            background: ${colors.lightRed};
        }
        .add {
          background: ${colors.lightGreen};
        }
        button {
          color: white;
          width: 20px;
          height: 20px;
          padding: 0;
        }
      }
    }
  }
  .patientsDisplay {
    height: 400px;
    width: 540px;
    form {
      display: flex;
      flex-direction: column;
      button{
        background: ${colors.lightGreen};
      }
    }
  }
`;
