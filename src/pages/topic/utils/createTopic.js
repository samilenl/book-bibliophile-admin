const createTopic = async(topic) => {
    const token = localStorage.getItem("token")
    const response = await fetch("https://book-bilbliophile-api.up.railway.app/topics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(topic)
    })
    // const data = await response.json()
    window.location.replace("/topics")
}

export default createTopic