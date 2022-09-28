import AuthHeader from "./navBar/NavHeader";
import styled from "styled-components";
import Display from "./display/";
import useUsers from "./API_services/useUsers";

export function App() {
  const { UserContextProvider } = useUsers();

  return (
    <AppLayoutDiv>
      <UserContextProvider>
        <AuthHeader />
        <main>
          <Display />
        </main>
      </UserContextProvider>
    </AppLayoutDiv>
  );
}

export default App;

const AppLayoutDiv = styled.div`
  background: #755b4b;
  height: 100vh;
  width: 100vw;
`;
