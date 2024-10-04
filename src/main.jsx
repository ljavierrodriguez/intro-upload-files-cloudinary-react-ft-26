import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'react-toastify/dist/ReactToastify.css';

import Layout from './Layout'
import GlobalContext from './context/GlobalContext'

ReactDOM.createRoot(document.querySelector('#root')).render(
  <GlobalContext>
    <Layout />
  </GlobalContext>
)