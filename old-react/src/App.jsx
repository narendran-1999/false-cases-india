import React from 'react'
import Content from './components/Content'
import Sidebar from './components/Sidebar/Sidebar'

const App = () => {
  return (
    <div className='app-container'>
      <Sidebar />
      <Content />
    </div>
  )
}

export default App