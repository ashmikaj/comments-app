import React, { useReducer, useState, useContext, useId, useEffect } from "react"
import commentContext from "../AppContext";

const CommentCard = (props) => {
  const { dispatch} = useContext(commentContext);
  const { type, parentId, handleReply } = props; 
  const [ newComment, setNewComment ] =  useState({
    fullName:'',
    comment:'',
    id:'',
    date: ''
  })

  const handlePost=(type)=>{
    
    if(newComment.fullName!=="" && newComment.comment!=="")
    switch (type) {
     case 'Comment':
      dispatch({type: 'POST_COMMENT', payload: newComment})
      break;
     case 'Reply':
      dispatch({type: 'REPLY_COMMENT', payload: {comment: newComment, parentId: parentId}})
      handleReply('')
      break;
    }

    setNewComment({
      fullName: '',
      comment: '',
      id:'',
      date:''
    })
  
  }

  return (
    <div className={ type==='Comment'?'comment-card-container':'reply-card-container'}>
    <p className={type==='Comment'?"comment-type": 'reply-type'}>{type}</p>
    <input className='name-input' name='name' type = 'text' placeholder='Name' id='name' value={newComment.fullName} onChange={(event)=>{  setNewComment({...newComment, fullName: event.target.value})}} />
    <input className='comment-input' name = 'coment' type="text" placeholder='comment' id='comment' value={newComment.comment} onChange={(event)=>{setNewComment({...newComment, comment: event.target.value, id: Math.random(), isParent: type=="Comment"?true:false, comments:[], date: new Date()})}}></input>
    <button className='post-button' onClick={()=> {handlePost(type)}}> POST</button>
    </div>
  )
};

export default CommentCard;
