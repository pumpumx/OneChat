import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Route , RouterProvider , createBrowserRouter , createRoutesFromElements} from 'react-router-dom'
import RouteAuthProvider from './auth/RouteAuthProvider.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path='/' element={<Home />} >
        </Route>
        <Route element={<RouteAuthProvider />}> //Protected Routes
            <Route path='/chat-app' element={<Chat/>}/>
            <Route path='/private-chat' element={<PrivateChat/>}/>
        </Route>
    </>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}>
    <App />
    </RouterProvider>
  </StrictMode>
)
