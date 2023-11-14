const updateUser = async(user) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`https://book-bilbliophile-api.up.railway.app/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({name: user.name, isAdmin: user.isAdmin})
    })
    // const data = await response.json()
    window.location.replace("/users")
}

export default updateUser