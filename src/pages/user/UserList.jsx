import { useState, useEffect } from "react"
import UpdateUser from "./components/Update"
import DeleteUser from "./components/Delete"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import "../../assets/styles/List.css"

const UserList = () => {
  const [users, setUsers] = useState({ all: [], isLoading: true })
  const [sending, setSending] = useState(false)

  
  useEffect( () => {
      async function fetchUsers () {
        const token = localStorage.getItem("token")
        try {
          const Users = await fetch(`https://book-bilbliophile-api.up.railway.app/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
          })
          const infos = await Users.json()
          setUsers({
            all: infos,
            isLoading: false
          })

        } catch (error) {
          console.log(error)
        }
      }

      fetchUsers()
  }, [])

  const authors = users.all.filter(author => author.isAdmin === true)
  const readers = users.all.filter(author => author.isAdmin === false)


  return (
    <>
      <div className="list-top1">
        <p className="post-list-hdr">
          All Users
        </p>
      </div>
      <Tabs className={"tabs-container"}>
        <TabList className={"tabs-list"}>
          <Tab className={"tab"}>All</Tab>
          <Tab className={"tab"}>Readers</Tab>
          <Tab className={"tab"}>Authors</Tab>
        </TabList>
        <TabPanel className={"tab-panel"}>
          { users.isLoading ? <Skeleton count={5} height={75} /> :
            users.all.map((user) => {
              return (
                <div key={user._id} className="one-user">
                  <h3>{user.name}</h3>
                  <span> {user.email} </span>
                  <h4>{user.isAdmin ? "Author" : "Reader"} </h4>
                  <div className="comment-show">
                    <UpdateUser id={user._id} value={user.name} admin={user.isAdmin} loadAnimate={setSending} />
                    <DeleteUser id={user._id} name={user.name} loadAnimate={setSending} />
                  </div>
                </div>
              )
            })
          }
        </TabPanel>
        <TabPanel className={"tab-panel"}>
          { users.isLoading ?<Skeleton count={5} height={75} loadAnimate={setSending} /> :
            readers.map((user) => {
              return (
                <div key={user._id} className="one-user">
                  <h3>{user.name}</h3>
                  <span> {user.email} </span>
                  <div className="comment-show">
                    <UpdateUser id={user._id} value={user.name} admin={user.isAdmin} loadAnimate={setSending} />
                    <DeleteUser id={user._id} name={user.name} loadAnimate={setSending} />
                  </div>
                </div>
              )
            })
          }
        </TabPanel>
        <TabPanel className={"tab-panel"}>
          { users.isLoading ? <Skeleton count={5} height={75} /> :
            authors.map((user) => {
              return (
                <div key={user._id} className="one-user">
                  <h3>{user.name}</h3>
                  <span> {user.email} </span>
                  <div className="comment-show">
                    <UpdateUser id={user._id} value={user.name} admin={user.isAdmin} loadAnimate={setSending} />
                    <DeleteUser id={user._id} name={user.name} loadAnimate={setSending} />
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

export default UserList