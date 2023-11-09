import { useRef, useState } from "react"
import updateComment from "../utils/updateComment"
import PropTypes from "prop-types"
import "../../../assets/styles/Modal.css"

const Update = ({ comment, postId, loadAnimate }) => {
  const modal = useRef(null)
  const [text, setText ] = useState(comment.text)
  return (
    <>
      <button onClick={()=>modal.current.showModal()}>Update Comment</button>
      <dialog ref={modal}>
        <h3>Update Comment</h3>
        <div>
          <textarea type="text" id="title" defaultValue={text} onChange={(e)=>setText(e.target.value)}/>
        </div>
        <div>
          <button className="dbtn"  onClick={()=>modal.current.close()}>Cancel</button>
          <button  className="dbtn" onClick={(e)=>{
            e.preventDefault();
            text && 
            updateComment({ text, id: comment._id, postId })
            modal.current.close()
            loadAnimate(true)
          }}>Submit</button>
        </div>
      </dialog>
    </>
    
  )
}

Update.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  loadAnimate: PropTypes.func.isRequired
}

export default Update