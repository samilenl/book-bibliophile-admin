import App from './App.jsx'
import Dashboard from "./pages/dashboard/index.jsx"
import PostList from './pages/post/PostList.jsx'
import PostCreate from './pages/post/Create.jsx'
import PostUpdate from './pages/post/Update.jsx'
import CommentList from "./pages/comment/CommentList.jsx"
import TopicList from './pages/topic/TopicList.jsx'
import UserList from './pages/user/UserList.jsx'
import Login from './pages/user/Login.jsx'
import { createBrowserRouter } from "react-router-dom"
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
        {
            index: true, 
            element: <Dashboard />
        },
        {
            path: "/posts", 
            element: <PostList />
        },
        {
            path: "/create-post", 
            element: <PostCreate /> 
        },
        {
            path: "/posts/:id/comments", 
            element: <CommentList /> 
        },
        {
            path: "/posts/:id", 
            element: <PostUpdate /> 
        },
        {
            path: "/topics", 
            element: <TopicList />
        },
        {
            path: "/users", 
            element: <UserList />
        },
      ]
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  }

])

export default router