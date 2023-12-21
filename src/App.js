import React, { useContext, useEffect, useState } from 'react';
import CommentCard from './components/CommentCard';
import CommentContainer from './components/CommentContainer';
import commentContext from './AppContext';
import './App.css';

function App() {
  const { state } = useContext(commentContext);
  const { comments } = state

  const data = JSON.parse(localStorage.getItem('state'))
  const abc = data.comments


  
  return (
    <div className="App">
        <CommentCard type='Comment'  />
        <CommentContainer  comments={abc} />
    </div>


 
  
    
  );

  };


export default App;
