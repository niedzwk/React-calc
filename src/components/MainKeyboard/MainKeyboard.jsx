import React, { useContext } from "react";
import Button from "../Button/Button";
import bemCssModules from "bem-css-modules";

import { default as MainKeyboardStyles } from "./MainKeyboard.module.scss";
import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(MainKeyboardStyles);

const MainKeyboard = () => {
  const { displayValue } = useContext(StoreContext);
  const { setDisplayValue } = useContext(StoreContext);
  const { waitingForFunction } = useContext(StoreContext);
  const { setWaitingForFunction } = useContext(StoreContext);
  const { previousValue } = useContext(StoreContext);
  const { setPreviousValue } = useContext(StoreContext);
  const { activeOperation } = useContext(StoreContext);
  const { setActiveOperation } = useContext(StoreContext);
  const { wasEqual } = useContext(StoreContext);
  const { setWasEqual } = useContext(StoreContext);

  const addCharacter = (content) => {
    if (waitingForFunction === false || wasEqual) {
      setDisplayValue(content);
      setWaitingForFunction(true);
      setWasEqual(false);
    } else if (waitingForFunction === true) {
      setDisplayValue((prev) => prev + content);
    }
  };

  function doingFunction(operand) {
    if (operand === "+") addition();
    else if (operand === "-") substract();
    else if (operand === "*") multiply();
    else if (operand === "/") divide();
  }

  const operation = (operationSign) => {
    if (activeOperation !== null && waitingForFunction)
      doingFunction(activeOperation);
    else setPreviousValue(Number(displayValue));
    setActiveOperation(operationSign);
    setWaitingForFunction(false);
  }

  // const addNumber = () => {
  //   if (activeOperation !== null && waitingForFunction)
  //     doingFunction(activeOperation);
  //   else setPreviousValue(Number(displayValue));
  //   setActiveOperation("+");
  //   setWaitingForFunction(false);
  // };

  // const substractNumber = () => {
  //   if (activeOperation !== null && waitingForFunction)
  //     doingFunction(activeOperation);
  //   else setPreviousValue(Number(displayValue));
  //   setActiveOperation("-");
  //   setWaitingForFunction(false);
  // };

  // const multiplyNumber = () => {
  //   if (activeOperation !== null && waitingForFunction)
  //     doingFunction(activeOperation);
  //   else setPreviousValue(Number(displayValue));
  //   setActiveOperation("*");
  //   setWaitingForFunction(false);
  // };

  // const divideNumber = () => {
  //   if (activeOperation !== null && waitingForFunction)
  //     doingFunction(activeOperation);
  //   else setPreviousValue(Number(displayValue));
  //   setActiveOperation("/");
  //   setWaitingForFunction(false);
  // };

  const square = () => {
    setDisplayValue((prev) => Math.sqrt(Number(prev)));
  };

  const power = () => {
    setDisplayValue((prev) => Number(prev) ** 2);
  };

  const fraction = () => {
    setDisplayValue((prev) => 1 / Number(prev));
  };

  const percent = () => {
    if (activeOperation === "+" || activeOperation === "-")
      setDisplayValue((prev) => previousValue * 0.01 * prev);
    else if (activeOperation === "*" || activeOperation === "/")
      setDisplayValue((prev) => 0.01 * prev);
    else setDisplayValue(0);
  };

  const clearCurrentValue = () => {
    setDisplayValue(0);
    setWaitingForFunction(false);
    setActiveOperation(null);
  };

  const clearAll = () => {
    setDisplayValue(null);
    setPreviousValue(null);
    setWaitingForFunction(false);
    setActiveOperation(null);
  };

  const changeSign = () =>
    Number(displayValue) > 0
      ? setDisplayValue((prev) => String(0 - Math.abs(Number(prev))))
      : setDisplayValue((prev) => String(0 + Math.abs(Number(prev))));

  const addComma = () => {
    if (displayValue === null) {
      setDisplayValue("0.");
      setWaitingForFunction(true);
    } else if (!String(displayValue).includes("."))
      setDisplayValue((prev) => prev + ".");
  };

  function addition() {
    const result = Number(displayValue) + previousValue;
    setDisplayValue(result);
    setPreviousValue(result);
  }

  const substract = () => {
    const result = previousValue - Number(displayValue);
    setDisplayValue(result.toString());
    setPreviousValue(result);
  };

  const multiply = () => {
    const result = Number(displayValue) * previousValue;
    setDisplayValue(result.toString());
    setPreviousValue(result);
  };

  const divide = () => {
    const result = previousValue / Number(displayValue);
    setDisplayValue(result.toString());
    setPreviousValue(result);
  };

  const deleteCharacter = () => {
    setDisplayValue((prev) =>
      displayValue !== null && displayValue.length ? prev.slice(0, -1) : ""
    );
  };

  const equal = () => {
    if (activeOperation !== null) doingFunction(activeOperation);
    setWasEqual(true);
    setPreviousValue(null);
    setWaitingForFunction(false);
    setActiveOperation(null);
  };

  return (
    <div className={style()}>
      <Button content="%" onClick={percent} isOperation />
      <Button content="CE" onClick={clearCurrentValue} isOperation />
      <Button content="C" onClick={clearAll} isOperation />
      <Button
        content={<i className="fas fa-backspace"></i>}
        onClick={deleteCharacter}
        isOperation
      />
      <Button content="1/x" onClick={fraction} isOperation />
      <Button content="x^2" onClick={power} isOperation />
      <Button content="sqrt" onClick={square} isOperation />
      <Button content="/" onClick={()=>operation("/")} isOperation />
      <Button content="7" onClick={addCharacter} isNumber />
      <Button content="8" onClick={addCharacter} isNumber />
      <Button content="9" onClick={addCharacter} isNumber />
      <Button content="X" onClick={()=>operation("*")} isOperation />
      <Button content="4" onClick={addCharacter} isNumber />
      <Button content="5" onClick={addCharacter} isNumber />
      <Button content="6" onClick={addCharacter} isNumber />
      <Button content="-" onClick={()=>operation("-")} isOperation />
      <Button content="1" onClick={addCharacter} isNumber />
      <Button content="2" onClick={addCharacter} isNumber />
      <Button content="3" onClick={addCharacter} isNumber />
      <Button content="+" onClick={()=>operation("+")} isOperation />
      <Button content="+/-" onClick={changeSign} isNumber />
      <Button content="0" onClick={addCharacter} isNumber />
      <Button content="," onClick={addComma} isNumber />
      <Button content="=" onClick={equal} operationType="equal" isEqual />
    </div>
  );
};

export default MainKeyboard;
