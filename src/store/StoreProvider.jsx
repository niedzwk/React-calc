import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [displayValue, setDisplayValue] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForFunction, setWaitingForFunction] = useState(false);
  const [activeOperation, setActiveOperation] = useState(null);
  const [result, setResult] = useState(0);
  const [wasEqual, setWasEqual] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        displayValue,
        setDisplayValue,
        waitingForFunction,
        setWaitingForFunction,
        previousValue,
        setPreviousValue,
        activeOperation,
        setActiveOperation,
        wasEqual,
        setWasEqual,
        result,
        setResult,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
