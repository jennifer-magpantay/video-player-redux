import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Player } from "./components/Player";

import "./styles/app.scss";

export const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Player />
      </Main>
    </>
  );
};
