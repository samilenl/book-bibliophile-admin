const deleteComment = async(id, postId) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://localhost:3000/comments/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: {}
    })
    // const data = await response.json()
    window.location.replace(`/posts/${postId}/comments`)
}

export default deleteComment
