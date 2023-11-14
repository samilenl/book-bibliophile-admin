const deleteTopic = async(id) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`https://book-bilbliophile-api.up.railway.app/topics/${id}`, {
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
