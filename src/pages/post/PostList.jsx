import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OptionModal from "./components/OptionModal";
import editImg from "../../assets/images/square-edit-outline-active.svg"
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import "../../assets/styles/List.css"

const PostList = () => {
  const [posts, setPost] = useState({ all: [], isLoading: true })
  const [sending, setSending] = useState(false)
  
  useEffect( () => {
      async function fetchPosts () {
        const token = localStorage.getItem("token")
        try {
          const allPosts = await fetch(`http://localhost:3000/posts-admin`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
          const infos = await allPosts.json()

          for (const post of infos.allPosts) {
            post.published ? post.status = "Public" : post.status = "Private"

            infos.commentCount.forEach((commentC) => {
              if (commentC._id === post._id) {
                post.commentCount  = commentC.count
              }
            })
          }

          setPost({
            all: infos.allPosts,
            isLoading: false
          })

        } catch (error) {
          console.log(error)
        }
      }

      fetchPosts()
  }, [])

  const privatePosts = posts.all.filter(post => post.status === "Private")
  const publicPosts = posts.all.filter(post => post.status === "Public")
 

  return (
    <>
      <div className="list-top1">

          <p className="post-list-hdr">
            All Posts
          </p>
          <Link to={'/create-post'}>
              <p className="create-post pCrt">
                <img src={editImg} alt="" />
                Create a new post
              </p>
          </Link>
        </div>
      <Tabs className={"tabs-container"}>
        <TabList className={"tabs-list"}>
          <Tab className={"tab"}>Private</Tab>
          <Tab className={"tab"}>Public</Tab>
        </TabList>
        <TabPanel className={"tab-panel"}>
        { posts.isLoading ? <Skeleton count={6} height={70}/> :
          privatePosts.map((post, index) => {
            return (
                <div key={index} className="post-list-item">
                  <Link  to={`/posts/${post._id}`}>
                    <h3>{post.title}</h3>
                    {/* <span> {post.status} </span> */}
                  </Link>    
                  <div className="list-other">               
                    <span> {post.commentCount} {post.commentCount === 1 ? "Comment": "Comments"} </span>
                    <OptionModal post={post} status={post.status} id={post._id} loadAnimate={setSending} />
                  </div> 
                </div>
              
            )
          })    
        }
        </TabPanel>
        <TabPanel className={"tab-panel"}>
        { posts.isLoading ? <Skeleton count={6} height={70}/> :
          publicPosts.map((post, index) => {
            return (
              <div key={index} className="post-list-item">
                <Link to={`/posts/${post._id}`}>
                    <h3>{post.title}</h3>
                    {/* <span> {post.status} </span> */}
                </Link>
                <div className="list-other">
                  <span> {post.commentCount} {post.commentCount === 1 ? "Comment": "Comments"} </span>
                  <OptionModal post={post} status={post.status} id={post._id} loadAnimate={setSending} />
                </div>
                
              </div>
            )
          })
        }
        </TabPanel>
     </Tabs>
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

export default PostList