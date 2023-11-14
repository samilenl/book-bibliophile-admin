const checkUserAuth = async() => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`https://book-bilbliophile-api.up.railway.app/check-auth`, {
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