const updatePost = async(post, status, id) => {
    const formData = new FormData()
    formData.append("title", post.title)
    formData.append("published", status)
    formData.append("text", post.text)
    if (post.file) {
      formData.append("image", post.file)
    }
    const sTopics = []
    for (const topic of post.topics){
        sTopics.push(topic._id)
    }
    formData.append("topics", sTopics)
    const token = localStorage.getItem("token")
    const response = await fetch(`https://book-bilbliophile-api.up.railway.app/posts/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })

    // const data = await response.json()
    window.location.replace("/posts")
}

export default updatePost