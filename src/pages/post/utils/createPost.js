const createPost = async(post) => {
    const formData = new FormData()
    formData.append("title", post.title)
    formData.append("text", post.text)
    formData.append("image", post.image)
    const sTopics = []
    for (const topic of post.topics){
        sTopics.push(topic._id)
    }
    formData.append("topics", sTopics)
    const token = localStorage.getItem("token")
    const response = await fetch("http://localhost:3000/posts/create", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })

    const data = await response.json()
    console.log(data)
    window.location.replace("/posts")
}

export default createPost