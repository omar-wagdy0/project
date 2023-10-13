import React, { createContext, useState } from 'react'

export let counterContext = createContext()


export  function CounterContextProvider(props) {
    let [counter , setCounter] = useState(0)
    
    function increaseCounter()
    {
        setCounter(counter+1)
    }

    return (
      <counterContext.Provider value={{counter , increaseCounter}}>
        {props.children}
      </counterContext.Provider>
  )
  
}
