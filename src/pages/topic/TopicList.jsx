import { useState, useEffect } from "react"
import CreateTopic from "./components/Create"
import UpdateTopic from "./components/Update"
import DeleteTopic from "./components/Delete"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const TopicList = () => {
  const [topics, setTopics] = useState({ all: [], isLoading: true })
  const [sending, setSending] = useState(false)

  
  useEffect( () => {
      async function fetchTopics () {
        try {
          const allPosts = await fetch(`http://localhost:3000/topics`)
          const infos = await allPosts.json()
          setTopics({
            all: infos,
            isLoading: false
          })

        } catch (error) {
          console.log(error)
        }
      }

      fetchTopics()
  }, [])


  return (
    <>
      <CreateTopic loadAnimate={setSending} />
      <div className="topic-list">
        { topics.isLoading ? <Skeleton count={7} height={50} /> :
          topics.all.map((topic) => {
            return (
              <div key={topic._id} className="">
                <h3>{topic.title}</h3>
                <div className="comment-show">
                  <UpdateTopic id={topic._id} value={topic.title} loadAnimate={setSending} />
                  <DeleteTopic id={topic._id} title={topic.title} loadAnimate={setSending} />
                </div>
              </div>
            )
          })
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

export default TopicList