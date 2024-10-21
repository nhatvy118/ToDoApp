import React, { useEffect, useRef, useState } from 'react';
import '../style/DialogAddTask.css';

function DialogAddTask({ onClose, onCreate, task, isDialog}) {
  const dialogRef = useRef(null);
  const [selectedPriority, setSelectedPriority] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTaskName(task.task_name);
      setTaskDescription(task.description);
      setSelectedPriority(task.priority);
    }
  }, [task]);



  useEffect(() => {
    const dialog = dialogRef.current;
    let isDragging = false;
    let startX, startY, initialX, initialY;

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = dialog.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        dialog.style.left = `${initialX + dx}px`;
        dialog.style.top = `${initialY + dy}px`;
        dialog.style.transform = 'none';
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    dialog.addEventListener('mousedown', handleMouseDown);

    return () => {
      dialog.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority);
  };
  const handleCreateClick = async () => {
    if (taskName && taskDescription && selectedPriority) {
      const taskData = {
        task_name: taskName,
        description: taskDescription,
        priority: selectedPriority,
      };
  
      if (task) {
        try {
          const response = await fetch(`http://127.0.0.1:8080/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
          });
    
          if (response.ok) {
            console.log("Success");
            task.task_name = taskName;
            task.description = taskDescription;
            task.priority = selectedPriority;
            isDialog(task);
          } else {
            console.error('Failed to update task:', response.statusText);
          }
        } catch (error) {
          console.error('Error updating task:', error);
        }
      } else {
        try {
          const response = await fetch('http://127.0.0.1:8080/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
          });
  
          if (response.ok) {
            const result = await response.json();
            console.log(result);
            onCreate(result); // Call onCreate with the new task
          } else {
            console.error('Failed to create task:', response.statusText);
          }
        } catch (error) {
          console.error('Error creating task:', error);
        }
      }
    }
  };
  return (
    <div ref={dialogRef} className="dialog-container">
      <h2 className="dialog-title">Create Todo</h2>
      <input
        type="text"
        placeholder="Task name"
        className="dialog-input"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <textarea
        placeholder="Add description"
        className="dialog-textarea"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <div className="dialog-priority-container">
        <button
          className={`dialog-priority-button ${selectedPriority === 'important' ? 'important' : ''}`}
          onClick={() => handlePriorityClick('important')}
        >
          Important
        </button>
        <button
          className={`dialog-priority-button ${selectedPriority === 'medium' ? 'medium' : ''}`}
          onClick={() => handlePriorityClick('medium')}
        >
          Medium
        </button>
        <button
          className={`dialog-priority-button ${selectedPriority === 'normal' ? 'normal' : ''}`}
          onClick={() => handlePriorityClick('normal')}
        >
          Normal
        </button>
      </div>
      <div className="dialog-button-container">
        <button className="dialog-button" onClick={handleCreateClick}>{task ? 'Update' : 'Create'}</button>
        <button className="dialog-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default DialogAddTask;
