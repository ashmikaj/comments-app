import { createContext, useReducer, useEffect } from 'react';
import {CommentReducer as reducer, initializer} from './Reducer/commentReducer';

const commentContext = createContext();

const getLocalData = () => {
  let state = localStorage.getItem("state");
  if (state == []) {
    return [];
  } else {
    return JSON.parse(state);
  }
};

const initialState = getLocalData()

const AppProvider = ({ children } )=>{


     const [ state, dispatch] = useReducer(reducer, initialState)
    

     useEffect(() => {
      localStorage.setItem("state", JSON.stringify(state));
    }, [state]);


    return <commentContext.Provider value={{state,dispatch}} >{children}</commentContext.Provider>
}


export default commentContext
export { AppProvider }

