import React, { useContext } from "react";
import bemCssModules from "bem-css-modules";

import { default as DisplayStyles } from "./Display.module.scss";
import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(DisplayStyles);

const Display = () => {
  const { displayValue } = useContext(StoreContext);

  return (
    <div className={style()}>
      {displayValue !== null
        ? String(displayValue).indexOf(".") !== -1 &&
          String(displayValue).length - String(displayValue).indexOf(".") > 4
          ? Number(displayValue).toFixed(4)
          : displayValue
        : 0}
    </div>
  );
};

export default Display;
