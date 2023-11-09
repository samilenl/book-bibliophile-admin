import { useRef } from "react"
import PropTypes from "prop-types"
import deleteTopic from "../utils/deleteTopic"


const DeleteModal = ({title, id, loadAnimate}) => {
    const modal = useRef(null)
    return (
      <>
        <button onClick={()=>modal.current.showModal()}>Delete Topic</button>
        <dialog ref={modal} >
          Are you sure you want to delete this topic?
          <div><p><strong> {title} </strong></p></div>
          <div>
            <button onClick={()=>modal.current.close()}>Cancel</button>
            <button onClick={(e)=> {
              e.preventDefault() 
              deleteTopic(id)
              modal.current.close()
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
    loadAnimate: PropTypes.func
}

export default DeleteModal