import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/home.jsx'
import AddInfo from './pages/addInfo.jsx'
import AllPatient from './pages/allPatient.jsx'
import EditInfo from './pages/editInfo.jsx'
import Info from './pages/info.jsx'
import EditVisit from './pages/editVisit.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-info",
        element: <AddInfo />,
      },
      {
        path: "/all-patient",
        element: <AllPatient />
      },
      {
        path: "/edit-info/:patientId",
        element: <EditInfo />
      },
      {
        path: "/info/:patientId",
        element: <Info />
      },
      {
        path: "/edit-visit/:patientId",
        element: <EditVisit />
      }
    ],
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
