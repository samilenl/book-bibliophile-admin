import { useRef } from "react"
import PropTypes from "prop-types"
import deleteUser from "../utils/deleteUser"


const DeleteModal = ({name, id, loadAnimate}) => {
    const modal = useRef(null)
    return (
      <>
        <button onClick={()=>modal.current.showModal()}>Delete User</button>
        <dialog ref={modal} >
          Are you sure you want to delete this user?
          <div><strong><p> {name} </p></strong></div>
          <div>
            <button onClick={()=>modal.current.close()}>Cancel</button>
            <button onClick={(e)=> {
              e.preventDefault() 
              deleteUser(id)
              modal.current.close()
              loadAnimate(true)
            } }>Delete</button>
          </div>
        </dialog>
      </>
    )
}

DeleteModal.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    loadAnimate: PropTypes.func
}

export default DeleteModal