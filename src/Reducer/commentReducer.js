

const recursiveDeleteNode = (comments,id)=>{
    for (let i = 0; i < comments.length; i++) {
        const currentItem = comments[i];
        if (currentItem.id === id) {
            comments.splice(i, 1);
          return comments;
        } else {
            recursiveDeleteNode(currentItem.comments, id);
        }
      }
      return comments;
}


const CommentReducer  =(state, action) => { 
switch(action.type){

    case 'POST_COMMENT':
        localStorage.setItem('state', JSON.stringify({...state, comments:[...state.comments,{...action.payload}]}))
        return {...state, comments:[{...action.payload}, ...state.comments]}
    
    case 'DELETE_COMMENT':
        const comments = state.comments;
        const FilteredComments = recursiveDeleteNode(comments,action.payload)
     
        localStorage.setItem('state', JSON.stringify({ ...state, comments: FilteredComments}))
        return { ...state, comments: FilteredComments}

    case 'EDIT_COMMENT':
        const { commentId, updatedComment } = action.payload
        state.comments.map(comments=>{
            if(comments.id==commentId){
                comments.comment = updatedComment
            }
            else{
                comments.comments.map(subComment=>{
                    if(subComment.id==commentId){
                        subComment.comment= updatedComment
                    }
                })
            }
            
        })
        localStorage.setItem('state', JSON.stringify(state))
        return state;
    
    case  'REPLY_COMMENT':
        const { comment, parentId } = action.payload
         state.comments.map(subComment=>{
            if(subComment.id==parentId){
                subComment.comments.push(comment)
            }
         })
        localStorage.setItem('state', JSON.stringify(state))
        return state
        
     case 'SORT_ASC':
        state.comments.sort(function (a, b) {
            return a.date-b.date
        });
        return state


     case 'SORT_DSC':
        state.comments.sort(function (a, b) {
            return b.date-a.date
        });
        return state
 
    default:
        localStorage.setItem('state', JSON.stringify(state))
        return state

    }



}

export default CommentReducer;