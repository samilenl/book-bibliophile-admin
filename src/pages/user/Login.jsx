import { useState } from "react"
import "../../assets/styles/Login.css"

const Login = () => {
  const [user, setUser] = useState({email: "", password: ""})
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/login-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email, password: user.password })
      });
  
      const data = await response.json();
      if (data.message) {
        setMessage(data.message)
      }
      else if (data.token){
        localStorage.setItem("token", data.token)
        localStorage.setItem("id", data.user._id)
        // console.log(localStorage)
        window.location.replace("/")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="get-in">
        { message && <p className="get-in-error">{message}</p> }
        <label>
          Email
          <input type="email" name="email" onChange={(e)=>{setUser((prevState)=>({
            ...prevState,
            email: e.target.value
          }))}}/>
        </label>
        <label>
          Password
          <input type="password" name="password" onChange={(e)=>{setUser((prevState)=>({
            ...prevState,
            password: e.target.value
          }))}}/>
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login