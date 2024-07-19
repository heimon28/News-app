import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider,  } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import Registration from './pages/Registration.jsx'
import './index.css'
import Blog from './pages/Blog.jsx'
import SinglePost from './pages/SinglePost.jsx'
import axios from 'axios'
import { Provider } from 'react-redux'
import MyEditor from './components/Editor/editor.jsx'
// import { store } from './store/store.js'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'logout',
        element: <Logout />
      },
      {
        path: 'registration',
        element: <Registration />
      },
      {
        path: '',
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'blog',
        element: <Blog/>,
   
      },{
        path: 'edit',
        element: <MyEditor/>
      },
      {
        path: 'single/:id',
        element: <SinglePost/>,
       loader:({params}) =>  fetch(`/api/v2/post/${params.id}`)
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <RouterProvider router={router}/>
    {/* </Provider> */}
  </React.StrictMode>,
)
