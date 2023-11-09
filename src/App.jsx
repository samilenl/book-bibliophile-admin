import SideBar from "./components/SideBar"
import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import checkUserAuth from "./utils/checkUserAuth"
import ScrollToTop from "./components/ScrollToTop"

const App = () => {
  // const [auth, setAuth] = useState(false)
  useEffect(() => {
    const protect = async() => {
      const isAuthenticated = await checkUserAuth();
        // setAuth(true)
      if (!isAuthenticated) {
        window.location.replace('/login');
      }
    } 
    protect()
  })

  return (
    <>
      {/* { auth === true &&  */}
        <ScrollToTop />
        <div className="container">
          <SideBar />
          <div className="content">
            <Outlet/>
          </div>
        </div>
      {/* } */}
      {/* <footer>COPYRIGHT © 2023 THE BOOKISH BIBLIOPHILE MEDIA LLC</footer> */} 
    </>
  )
}

export default App
