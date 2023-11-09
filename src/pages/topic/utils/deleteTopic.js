const deleteTopic = async(id) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://localhost:3000/topics/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: {}
    })
    // const data = await response.json()
    window.location.replace("/topics")
}

export default deleteTopic
