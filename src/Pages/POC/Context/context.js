import React from "react";
import PropTypes from "prop-types";

const ContextPOCContext = React.createContext();

function ContextPOCContextProvider({ children }) {
  const [counter, setCounter] = React.useState(0);
  const value = {
    counter,
    increment: () => {
      setCounter(counter + 1);
    },
  };

  return (
    <ContextPOCContext.Provider value={value}>
      {children}
    </ContextPOCContext.Provider>
  );
}
ContextPOCContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
export { ContextPOCContext, ContextPOCContextProvider };
