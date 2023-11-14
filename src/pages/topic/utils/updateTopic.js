const updateTopic = async(topic) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`https://book-bilbliophile-api.up.railway.app/topics/${topic.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({title: topic.title})
    })
    // const data = await response.json()
    window.location.replace("/topics")
}

export default updateTopic