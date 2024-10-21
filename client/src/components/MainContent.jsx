// src/components/MainContent.js
import React from 'react';
import { useState,useEffect } from 'react';
import Header from './Header';
import TaskAdder from './TaskAdder';
import DialogAddTask from './DialogAddTask';
import '../style/MainContent.css';
import TaskItem from './TaskItem';

const MainContent = ({selectedStatus}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  useEffect(() => {
    fetchTasks(); 
  }, [selectedStatus]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/tasks', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data.filter((data) => data.status === selectedStatus));
      } else {
        console.error('Failed to fetch tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCreateTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    setIsDialogOpen(false);
  }; 
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8080/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((task) => task.id!== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  const handleUpdatetask = async (updatedTask) => {
    handleOpenDialog();
    setEditedTask(updatedTask);
  };
 
  const handleCloseDialogEdit = async(updatedTask) => {
    handleCloseDialog();
    setEditedTask(null);
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks[i].task_name = updatedTask.task_name;
        tasks[i].description = updatedTask.description;
        tasks[i].priority = updatedTask.priority;
        break;
      }
    }
  
  };
  const handleUpdateStatus = async (task) => {
    try{
      await fetch(`http://127.0.0.1:8080/tasks/status/${task.id}`, {
        method: 'PUT',
      });
      fetchTasks();
    }
    catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="main-content">
      <Header />
      {selectedStatus==='pending' &&(
        <TaskAdder onClick={handleOpenDialog} />
      )}

      {isDialogOpen && (
        <div className="dialog-overlay">
          <DialogAddTask onClose={handleCloseDialog} onCreate={handleCreateTask} task={editedTask} isDialog={handleCloseDialogEdit}/>
        </div>
      )}
      
      <div className="task-list"> 
        {tasks.map((task, index) => (
          <TaskItem 
            key={index} 
            task_name={task.task_name} 
            description={task.description} 
            priority={task.priority} 
            onDelete={() => handleDeleteTask(task.id)}
            onUpdate={() => handleUpdatetask(task)}
            upDateStatus={() => handleUpdateStatus(task)}/>
        ))}
      </div>
    </div>
 
  );
};

export default MainContent;
