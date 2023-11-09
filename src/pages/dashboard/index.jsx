import { useEffect, useState } from "react"
import "../../assets/styles/Dashboard.css"
import ChartComponent from "./ChartComponent"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import editImg from "../../assets/images/square-edit-outline-active.svg"
import { Link } from "react-router-dom"

const Index = () => {

  const [user, setUser] = useState({info: {}, weekly: {}, number: {}, posts: {recentPosts:[], commentCount:[]}, isLoading: true})

  useEffect(()=>{
    const fetchUser = async() => {
      const id = localStorage.getItem("id")
      const token = localStorage.getItem("token")
      const thisUser = await fetch(`http://localhost:3000/users/${id}`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
      const posts = await fetch(`http://localhost:3000/posts/recent`)
      const recentPosts =  await posts.json()
      const data = await thisUser.json()

      setUser({
        info: data.user,
        weekly: {
          comments: data.weeklyCommentCounts, 
          posts: data.weeklyPostCounts, 
          users: data.weeklyUserCounts
        },
        number: {
          comments: data.numberOfComments, 
          posts: data.numberOfPublicPosts, 
          users: data.numberOfUsers, 
          drafts: data.numberOfPrivatePosts
        },
        posts: recentPosts,
        isLoading: false
      })
    }
    fetchUser()
  }, [])

  return (
    <>
      <div className="top1">
        <Link to={'/create-post'}>
          <p className="create-post">
            <img src={editImg} alt="" />
            Create a new post
          </p>
        </Link>
        <p  className="dash-user-info">
          {user.info.name 
          ? <><span>{user.info.name}</span> <span>Admin</span></>
          : <Skeleton /> 
          }
        </p>
      </div>
      <div className="top2">
        <h1>Dashboard</h1>
        { user.info.name 
          ? <p>Good to have you back, {user.info.name.split(" ")[0]}. Let{"'"}s write some more!</p>
          : <Skeleton height={30}/>
        }
      </div>
      <div className="stats-cards">
        <div>
          <div className="stats-info">
            <p>Users</p>
            <p>{user.number.users ||  <Skeleton />}</p>
          </div>
          <div className="chart-container">
            {user.weekly.users
            ? <ChartComponent 
                background="rgb(255, 0, 0)" 
                fill={"rgb(255, 0, 0, 0.2)"} 
                dataset={user.weekly.users} 
                label={"Registered"}
              /> 
            :  <Skeleton height={100} />
            }
          </div>
        </div>
        <div>
          <div className="stats-info">
            <p>Comments</p>
            <p>{user.number.comments ||  <Skeleton />}</p>
          </div>
          <div className="chart-container">
            {user.weekly.comments
            ? <ChartComponent 
                background="rgb(128, 0, 128)" 
                fill={"rgb(128, 0, 128, 0.2)"} 
                dataset={user.weekly.comments} 
                label={"Comments"}
              /> 
            : <Skeleton height={100} />
            }
          </div>
        </div>
        <div>
          <div className="stats-info">
            <p>Posts</p>
            <p>{user.number.posts ||  <Skeleton />}</p>
          </div>
          <div className="chart-container">
            {user.weekly.posts
            ? <ChartComponent 
                background="rgb(0, 0, 255)" 
                fill={"rgb(0, 0, 255, 0.2)"} 
                dataset={user.weekly.posts} 
                label={"Created"}
              /> 
            : <Skeleton height={100} />
            }
          </div>
        </div>
        {/* <div>
          <p>Drafts</p>
          <p>{user.number.drafts || "loading..."}</p>
        </div> */}
      </div>
      <div className="some-posts">
        <p>Recently Updated Posts</p>
          { user.posts.recentPosts.length > 0
            ? user.posts.recentPosts.map((post,index) => {
              return(<Link to={`/posts/${post._id}`} key={post._id}><div  className="dash-post">
                  <p>{post.title}</p>
                  <p>({user.posts.commentCount[index].count} Comment{user.posts.commentCount[index].count !== 1 && "s"})</p>
              </div></Link>)
            })
            : <Skeleton count={6} className="" height={50} />
          }
      </div>
    </>
  )
}

export default Index