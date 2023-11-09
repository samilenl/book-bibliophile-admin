import { NavLink, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "../assets/styles/SideBar.css"
import logo from "../assets/images/logo.svg"

const SideBar = () => {

  const [isOpen, setIsOpen] = useState(false)


  const logout = async() => {
    localStorage.removeItem("token")
    window.location.replace("/login")
  }

  useEffect(()=>{
    window.addEventListener("click", (e)=>{
      if (!e.target.closest(".side-bar")) {
        setIsOpen(false)
      }
    })
  },[])


  return (
    <div className="side-bar">
        <Link to={"/"}>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </Link>
        <div className="main-nav">
          <NavLink to={"/"} className={"side-bar-nav dashboard"}>
            Dashboard
          </NavLink>
          <NavLink to={"/posts"} className={"side-bar-nav posts"}>
            Posts
          </NavLink>
          <NavLink to={"/topics"} className={"side-bar-nav topics"}>
            Topics
          </NavLink>
          <NavLink to={"/users"} className={"side-bar-nav users"}>
            Users
          </NavLink>
          <button onClick={logout} className={"logout"}>Logout</button>
        </div>
        <div className={`nav-icon-5 ${isOpen ? 'open' : ''}`} onClick={()=>setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {
          isOpen && <div className="mobile-menu">
              <NavLink to={"/"} className={"side-bar-nav dashboard"}>
                Dashboard
              </NavLink>
              <NavLink to={"/posts"} className={"side-bar-nav posts"}>
                Posts
              </NavLink>
              <NavLink to={"/topics"} className={"side-bar-nav topics"}>
                Topics
              </NavLink>
              <NavLink to={'/create-post'} className={"side-bar-nav create"}>
                {/* <p className="create-post"> */}
                  {/* <img src={editImg} alt="" /> */}
                  Create a new post
                {/* </p> */}
              </NavLink>
              <NavLink to={"/users"} className={"side-bar-nav users"}>
                Users
              </NavLink>
              <button onClick={logout} className={"logout"}>Logout</button>
          </div>
        }
    </div>
  )
}

export default SideBar