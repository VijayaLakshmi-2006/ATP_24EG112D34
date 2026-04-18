import { createContext, useState } from "react";

export const Context = createContext();

function ContextProvider({ children }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <Context.Provider value={{ count, increment, decrement }}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;