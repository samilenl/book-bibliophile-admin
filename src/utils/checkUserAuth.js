const checkUserAuth = async() => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/check-auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      if (response.status === 401) {
        return false
      }
      const user = await response.json()
      console.log(user)
      if (user.authenticated) {
        console.log(true)
        return true
      } 
      else {
        return false
      }
    } 
    catch (error) {
      console.log(error)
    }
}

export default checkUserAuth