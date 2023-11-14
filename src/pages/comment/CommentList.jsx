import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import UpdateComment from "./components/Update"
import DeleteComment from "./components/Delete"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'


const CommentList = () => {
    const { id } = useParams()
  const [comments, setComments] = useState({ all: [], post:{}, isLoading: true })
  const [sending, setSending] = useState(false)

  
  useEffect( () => {
      const fetchComments = async() => {
        const token = localStorage.getItem("token")
        try {
          const allPosts = await fetch(`https://book-bilbliophile-api.up.railway.app/posts/${id}/comments`,  {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
          })
          const infos = await allPosts.json()
          setComments({
            all: infos.comments,
            post: infos.post,
            isLoading: false
          })

        } catch (error) {
          console.log(error)
        }
      }

      fetchComments()
  }, [id])


  return (
    <>
        <h1>Comments for - <span>{comments.isLoading ? <Skeleton /> : comments.post && comments.post.title}</span></h1>
        <div className="comment-list">{ comments.isLoading ? <Skeleton count={3} />:
            (comments.all.length > 0) 
            ?  
            comments.all.map((comment, index) => {
            return (
                <div key={index} className="post-comment">
                  <div className="comment-info">
                    <p>{comment.text}</p>
                    <p><i>by</i> {comment.user.name} </p>
                  </div>
                  <div className="comment-show">
                    <UpdateComment comment={comment} postId={id} loadAnimate={setSending} />
                    <DeleteComment comment={comment} postId={id} loadAnimate={setSending} />
                  </div>
                </div>
            )
            })
            : 
            <p>There are no comments </p>
        }
        </div>
        { sending ?
            <div className="spinner-wrapper">
              <div className="spinner">
              <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
              </div>
              </div>
            </div> 
      : ''}
    </>
  )
}

export default CommentList