import { createContext, useReducer } from 'react';
import reducer from './Reducer/commentReducer';

const commentContext = createContext();

const intialState = {
    comments: []
}


const AppProvider = ({ children } )=>{
     const [ state, dispatch] = useReducer(reducer, intialState)
    return <commentContext.Provider value={{state,dispatch}} >{children}</commentContext.Provider>
}


export default commentContext
export { AppProvider }

