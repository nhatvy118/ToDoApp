// src/components/MainContent.js
import React from 'react';
import { useState } from 'react';
import Header from './Header';
import TaskAdder from './TaskAdder';
import '../style/MainContent.css';

const MainContent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="main-content">
      <Header />
      <TaskAdder onClick={handleOpenDialog} />
      {isDialogOpen && (
        <DialogAddTask onClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default MainContent;
