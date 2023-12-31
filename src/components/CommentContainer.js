import React, { useState, useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";
import commentContext from "../AppContext";
import CommentCard from "./CommentCard";
import Modal from "./Modal";



const CommentContainer = (props) => {
  const { dispatch } = useContext(commentContext);
  const [ replyMode, setReplyMode] = useState(false)
  const [ parentId, setParentId ] = useState('')
  const [ showEditModal, setShowEditModal] = useState(false)
  const [ sortASC, setSortASC] = useState(false)
  const { comments, className, type } = props



 const handleReply = (parentComment) => {
   setReplyMode(!replyMode)
   setParentId(parentComment.id)
   parentComment.replymode=replyMode
 }


 const handleCloseModal =(parentId)=>{
  setShowEditModal(!showEditModal)
  setParentId(parentId);
 }

const handleDeleteComment = (childId) =>{

    dispatch({type: 'DELETE_COMMENT', payload: childId })
 
}

const handleSortASC=()=>{
  dispatch({type:'SORT_ASC'})
  setSortASC(true)

}

const  handleSortDSC=()=>{
  dispatch({type: 'SORT_DSC'})
  setSortASC(false)
}

  
  return (
    <div className={className?className:"comment-container"}>
       { comments.length>0 && type !=='Reply'?   <p className="sort-by-date" >Sort By :Data & Time
        {sortASC? <IoIosArrowRoundDown className="arrow-sort" onClick={()=>{handleSortDSC()}}/>:<IoIosArrowRoundUp className="arrow-sort" onClick={()=>{handleSortASC()}} /> }</p>: <></>}
       {comments.map((child)=>{
        return (
   <>
 
    <div key={child.id}>
          
           <div className="comment-list-container" >
            <div className={type==='Reply'?'reply-date-name': 'comment-date-name'}>
            <p className="comment-name">{child.fullName}</p>
              <p>{JSON.stringify(child.date).slice(1,10)}</p>
            </div>
            
            <p className="comment-remark">{child.comment}</p>
            <MdDeleteOutline  className="delete-icon" onClick={()=>{handleDeleteComment(child.id)}}/>
            <div className="reply-edit-container">
               {type!=='Reply' &&  <p className="reply-text" onClick={()=>{handleReply(child)}}>Reply</p>}
                <p className="edit-text" onClick={()=>{handleCloseModal(child.id)}}>Edit</p>
              </div>
             
            </div>
            { child.comments.length!==0 && <CommentContainer comments={child.comments} className='reply-container' type='Reply'/>}
            {showEditModal&& <Modal  handleCloseModal={handleCloseModal} commentId={parentId} />}
            { child.replymode && <CommentCard type='Reply' parentId={parentId} handleReply={handleReply} /> }
          
          </div>
         
   </>
          
    
          
        )
       
       }

       
       )}
          
    </div>
  )
};

export default CommentContainer;
