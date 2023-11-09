import { useRef, useState } from "react"
import updateUser from "../utils/updateUser.js"
import PropTypes from "prop-types"

const Update = ({ id, value, admin, loadAnimate }) => {
  const modal = useRef(null)
  const [name, setName] = useState(value)
  const [status, setStatus] = useState(admin)
  return (
    <>
      <button onClick={()=>modal.current.showModal()}>Update User</button>
      <dialog ref={modal}>
        <h3>Update User</h3>
        <div>
          <input type="text" id="title" defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="user-role">
          <label htmlFor="role">User Role</label>
          <select name="" id="role" defaultValue={status} onChange={(e)=>setStatus(e.target.value)} >
              <option value={true}>Author</option>
              <option value={false}>Reader</option>
          </select>
        </div>
        <div>
          <button onClick={()=>modal.current.close()}>Cancel</button>
          <button onClick={(e)=>{
            e.preventDefault();
            name && 
            updateUser({name, isAdmin: status, id})
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
  admin: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  loadAnimate: PropTypes.func
}

export default Update