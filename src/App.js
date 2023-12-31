import React, { useContext } from 'react';
import CommentCard from './components/CommentCard';
import CommentContainer from './components/CommentContainer';
import commentContext from './AppContext';
import './App.css';

function App() {
  const { state } = useContext(commentContext);
  const { comments } = state
  
  
  return (
    <div className="App">
        <CommentCard type='Comment'  />
        <CommentContainer  comments={comments} />
    </div>


 
  
    
  );

  };


export default App;
