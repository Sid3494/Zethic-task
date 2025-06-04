import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks([...tasks, { text: trimmed, completed: false }]);
    setInput('');
  };

  const handleToggleTask = (idx) => {
    setTasks(tasks.map((task, i) =>
      i === idx ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (idx) => {
    setTasks(tasks.filter((_, i) => i !== idx));
    if (editIdx === idx) {
      setEditIdx(null);
      setEditValue('');
    }
  };

  const handleStartEdit = (idx, text) => {
    setEditIdx(idx);
    setEditValue(text);
  };

  const handleSaveEdit = (idx) => {
    const trimmed = editValue.trim();
    if (!trimmed) return;
    setTasks(tasks.map((task, i) =>
      i === idx ? { ...task, text: trimmed } : task
    ));
    setEditIdx(null);
    setEditValue('');
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div id="Todo-form">
        <input
          type="text"
          value={input}
          placeholder="Enter a new item"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleAddTask(); }}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul id="taskList">
        {tasks.map((task, idx) => (
          <li
            key={idx}
            className={task.completed ? 'completed' : ''}
            style={{
              cursor: 'pointer',
              textDecoration: task.completed ? 'line-through' : 'none'
            }}
            onClick={() => { if (editIdx === null) handleToggleTask(idx); }}
          >
            {editIdx === idx ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onClick={e => e.stopPropagation()}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSaveEdit(idx);
                    if (e.key === 'Escape') { setEditIdx(null); setEditValue(''); }
                  }}
                  style={{ flex: 1, marginRight: '10px' }}
                  autoFocus
                />
                <button
                  onClick={e => { e.stopPropagation(); handleSaveEdit(idx); }}
                  style={{ marginRight: '5px' }}
                >
                  Save
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setEditIdx(null); setEditValue(''); }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <div>
                  <button
                    className="delete-btn"
                    onClick={e => { e.stopPropagation(); handleDeleteTask(idx); }}
                    style={{ marginLeft: '10px' }}
                  >
                    🗑
                  </button>
                  <button
                    className="update-btn"
                    onClick={e => { e.stopPropagation(); handleStartEdit(idx, task.text); }}
                    style={{ marginLeft: '5px' }}
                  >
                    ✏
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
