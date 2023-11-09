const deleteUser = async(id) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: {}
    })
    // const data = await response.json()
    window.location.replace("/users")
}

export default deleteUser
