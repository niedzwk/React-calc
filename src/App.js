import Display from "./components/Display/Display";
import MainKeyboard from "./components/MainKeyboard/MainKeyboard";
import bemCssModules from "bem-css-modules";

import { default as AppStyles } from "./App.module.scss";
import StoreProvider from "./store/StoreProvider";

const style = bemCssModules(AppStyles);

function App() {
  return (
    <StoreProvider>
      <div className={style()}>
        <Display />
        <MainKeyboard />
      </div>
    </StoreProvider>
  );
}

export default App;
