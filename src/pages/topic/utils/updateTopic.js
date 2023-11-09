const updateTopic = async(topic) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://localhost:3000/topics/${topic.id}`, {
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