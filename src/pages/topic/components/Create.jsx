import { useRef} from "react"
import createTopic from "../utils/createTopic.js"
import editImg from "../../../assets/images/square-edit-outline-active.svg"
import PropTypes from "prop-types"

const Create = ({loadAnimate}) => {
  const modal = useRef(null)
  const title = useRef(null)
  return (
    <>
    <div>
      <button className="create-post create-topic" onClick={()=>modal.current.showModal()}>
        <img  src={editImg} alt="" />
        Create Topic
        </button>
    </div>
      <dialog ref={modal}>
        <h3>Create Topic</h3>
        <div>
          <input type="text" id="title" ref={title} placeholder="Title"/>
        </div>
        <div>
          <button onClick={()=>modal.current.close()}>Cancel</button>
          <button onClick={(e)=>{
            e.preventDefault();
            title && 
            createTopic({title: title.current.value})
            modal.current.close()
            loadAnimate(true)
          }}>Submit</button>
        </div>
      </dialog>
    </>

  )
}

Create.propTypes = {
  loadAnimate: PropTypes.func
}

export default Create