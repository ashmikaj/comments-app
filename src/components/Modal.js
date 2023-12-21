import React, { useContext, useState } from "react"
import '../App.css'
import commentContext from "../AppContext";

const Modal = (props) => {
    const { dispatch } = useContext(commentContext)
    const [updatedComment, setUpdatedComment] = useState('')
    const { handleCloseModal, commentId } = props


    const handleSaveComment = (commentId)=>{
        if(updatedComment!=='')
        dispatch({type:'EDIT_COMMENT', payload: { commentId: commentId, updatedComment: updatedComment }})
        handleCloseModal()
    }
  return (
    <div className="model-wrapper">
      <div className="modal-container">
        <p className='edit-header'>Edit</p>
        <input  placeholder='Type your comment' className="update-input" value={updatedComment} onChange={(event)=>{setUpdatedComment(event.target.value)}}></input>
        <div style={{display:'flex', flexDirection:'row', gap: '2rem', alignSelf:'end'}}>
        <p  className='edit-text' onClick={()=>{handleSaveComment(commentId)}}>save </p>
        <p className='edit-text' onClick={()=>{handleCloseModal()}}> close</p>
        </div>
       

      </div>
    </div>
  )
};

export default Modal;
