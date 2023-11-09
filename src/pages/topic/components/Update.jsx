import { useRef, useState } from "react"
import updateTopic from "../utils/updateTopic.js"
import PropTypes from "prop-types"

const Update = ({ id, value, loadAnimate }) => {
  const modal = useRef(null)
  const [title, setTitle] = useState(value)
  return (
    <>
      <button onClick={()=>modal.current.showModal()}>Update Topic</button>
      <dialog ref={modal}>
        <h3>Update Topic</h3>
        <div>
          <input type="text" id="title" defaultValue={title} onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div>
          <button onClick={()=>modal.current.close()}>Cancel</button>
          <button onClick={(e)=>{
            e.preventDefault();
            title && 
            updateTopic({title: title, id})
            modal.current.close()
            loadAnimate(true)
          }}>Submit</button>
        </div>
      </dialog>
    </>
    
  )
}

Update.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  loadAnimate: PropTypes.func
}

export default Update