import "../../../assets/styles/Modal.css"
import { useRef } from "react"
import PropTypes from "prop-types"
import deletePost from "../utils/deletePost"
import "../../../assets/styles/Modal.css"

const DeleteModal = ({title, id, loadAnimate}) => {
    const modal = useRef(null)
    return (
      <>
        <button onClick={()=>modal.current.showModal()}>Delete Post</button>
        <dialog ref={modal} >
          Are you sure you want to delete this post?
          <div>
            <p> <strong> {title} </strong> </p>
          </div>
          
          <div>
            <button onClick={()=>modal.current.close()}>Cancel</button>
            <button onClick={(e)=> {
                e.preventDefault() 
                modal.current.close()
                deletePost(id)
                loadAnimate(true)
            } }>Delete</button>
          </div>
        </dialog>
      </>
    )
}

DeleteModal.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    loadAnimate: PropTypes.func.isRequired
}

export default DeleteModal