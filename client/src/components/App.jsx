import { useState, useEffect } from 'react'
import axios from 'axios';
import Sidebar from './Sidebar.jsx'
import '../style/App.css'
import MainContent from './MainContent.jsx';

function App() {
  const [selectedStatus, setSelectedStatus] = useState('pending')
  const handleStatusSelect = (status) => {
    setSelectedStatus(status)
  }
  return (
    <div className="app">
      <Sidebar className="Sidebar"
        onSelect={handleStatusSelect}
        selectedStatus={selectedStatus} 
      />
      <MainContent className="MainContent"
        selectedStatus={selectedStatus}
      />
    </div>
  )
}

export default App
