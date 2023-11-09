import { useState } from "react"
import PropTypes from "prop-types"
import updatePost from "../utils/updatePost";
import { Link } from "react-router-dom";
import three_dots from "../../../assets/images/three-dots3.svg"
import DeleteModal from "./DeleteModal.jsx"


const OptionModal = ({post, status, id, loadAnimate}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = (e) => {
      if (!e.target.closest("xyz") && !e.target.closest("more-options")){
        setIsHovered(false);
      }
    };
    return(
      <div className="xyz" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
        <div className="three-dots">
          <img src={three_dots} alt="" />
        </div>
        <div className={isHovered ? "more-options show-cont" : "more-options"} >
          {
            status === "Private" 
            ? 
            <button onClick={(e)=>{
              e.preventDefault()
              updatePost(post, true, id)
              loadAnimate(true)
            }}>Publish Post</button> 
            :
            <button onClick={(e)=>{
              e.preventDefault()
              updatePost(post, false, id)
              loadAnimate(true)
            }}>Hide Post</button>
          }
            <DeleteModal title={post.title} id={id} loadAnimate={loadAnimate} />
          <Link to={`/posts/${id}/comments`}><button>View Comments</button></Link>
        </div>
      </div>
    )

}

OptionModal.propTypes = {
    post: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    loadAnimate: PropTypes.func.isRequired
}

export default OptionModal