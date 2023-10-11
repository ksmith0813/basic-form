import React from 'react'
import { createRoot } from 'react-dom/client'
import { Todos } from './components/todos'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Todos />
  </React.StrictMode>
)
