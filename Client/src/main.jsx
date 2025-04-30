import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RouteAuthProvider from './auth/RouteAuthProvider.jsx'
import { LazyLogin } from './components/LazyComp.jsx'
import WithSuspense from './components/WithSuspense.jsx'
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={WithSuspense(LazyLogin)} >
      </Route>
      <Route path='/register' element={<App />} />
      <Route element={<RouteAuthProvider />}> //Protected Routes
        {/* <Route path='/register' element={<Chat/>}/> */}
        {/* <Route path='/private-chat' element={<PrivateChat/>}/> */}
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
