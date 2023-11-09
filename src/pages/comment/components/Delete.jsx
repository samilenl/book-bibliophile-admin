import { useRef } from "react"
import PropTypes from "prop-types"
import deleteComment from "../utils/deleteComment"


const DeleteModal = ({comment, postId, loadAnimate }) => {
    const modal = useRef(null)
    return (
      <>
        <button onClick={()=>modal.current.showModal()}>Delete Comment</button>
        <dialog ref={modal} >
          Are you sure you want to delete this comment by 
            <p> 
            <strong>{comment.user.name}</strong> ?
            </p>
            <div>
              <button onClick={()=>modal.current.close()}>Cancel</button>
              <button onClick={(e)=> {
                e.preventDefault() 
                deleteComment(comment._id, postId)
                modal.current.close()
                loadAnimate(true)
              } }>Delete</button>
            </div>
        </dialog>
      </>
    )
}

DeleteModal.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    loadAnimate: PropTypes.func.isRequired
}

export default DeleteModal