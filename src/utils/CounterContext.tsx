import React, { createContext, useContext, useState } from 'react';

const counterContext = createContext<null | {count: number, setCount: (value: (((prevState: number) => number) | number)) => void}>(null);

export const CounterContextProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [count, setCount] = useState(0)
  return <counterContext.Provider value={{count, setCount}}>
    {children}
  </counterContext.Provider>
}

export const useCounterContext = () => {
  const context = useContext(counterContext);
  if (context === null) {
    throw new Error('Cannot use a context without a provider');
  }
  return context;
}