import { useState, useEffect } from 'react'
import axios from 'axios';
import Sidebar from './Sidebar.jsx'
import '../style/App.css'
import MainContent from './MainContent.jsx';

function App() {
  return (
    <div className="app">
      <Sidebar className="Sidebar"/>
      <MainContent className="MainContent"/>
    </div>
  )
}

export default App
