import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RouteAuthProvider from './auth_api/RouteAuthProvider.jsx'
import { LazyLogin , lazyMainChat} from './components/LazyComp.jsx'
import WithSuspense from './components/WithSuspense.jsx'
import PrivateChat from './components/privateChat/PrivateChat.js'
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={WithSuspense(LazyLogin)} >
      </Route>
      <Route path='/register' element={<App/>} />
      <Route element={<RouteAuthProvider />}> //Protected Routes
        <Route path='/app' element={WithSuspense(lazyMainChat)}/>
        {/* <Route path='/private-chat' element={<PrivateChat/>}/> */}
      </Route>
      <Route path='/private' element={<PrivateChat/>} />
    </>
  )
)
createRoot(document.getElementById('root')).render(
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
)
