const updateComment = async(comment) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://localhost:3000/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({text: comment.text})
    })
    // const data = await response.json()
    window.location.replace(`/posts/${comment.postId}/comments`)
}

export default updateComment