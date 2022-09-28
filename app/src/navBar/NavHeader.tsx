import { HeaderLayout } from "./styles";

import AuthButtons from "./authButtons";

export default function NavHeader() {
  return (
    <HeaderLayout className="Nav notLogIn">
      <div className="navcontainer">
        <div>
          <figure>🍄</figure> <h1>Photon</h1>
        </div>

        <div className="authButtons">
          <AuthButtons />
        </div>
      </div>
    </HeaderLayout>
  );
}
