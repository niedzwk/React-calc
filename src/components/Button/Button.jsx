import React from "react";
import bemCssModules from "bem-css-modules";

import { default as ButtonStyles } from "./Button.module.scss";

const style = bemCssModules(ButtonStyles);

const Button = (props) => {
  const { content } = props;

  const specialClass = {
    "is-equal": props.isEqual,
    "is-number": props.isNumber,
    "is-operation": props.isOperation,
  };

  const handleOnClick = () => {
    props.onClick(content);
  };

  return (
    <button className={style(specialClass)} onClick={handleOnClick}>
      {content}
    </button>
  );
};

export default Button;
