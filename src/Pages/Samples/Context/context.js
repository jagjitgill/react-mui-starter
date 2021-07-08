import React from "react";
import PropTypes from "prop-types";

const SampleContext = React.createContext();

function SampleContextProvider({ children }) {
  const [counter, setCounter] = React.useState(0);
  const value = {
    counter,
    increment: () => {
      setCounter(counter + 1);
    },
  };

  return (
    <SampleContext.Provider value={value}>{children}</SampleContext.Provider>
  );
}
SampleContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
export { SampleContext, SampleContextProvider };
