import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ 
  boards, 
  onCreateBoard, 
  onDeleteBoard, 
  onSelectBoard, 
  isDarkMode, 
  onToggleDarkMode 
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

  const handleCreateBoard = (e) => {
    e.preventDefault();
    if (newBoardName.trim()) {
      onCreateBoard(newBoardName.trim());
      setNewBoardName('');
      setShowCreateForm(false);
    }
  };

  const handleDeleteBoard = (boardId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this board? This action cannot be undone.')) {
      onDeleteBoard(boardId);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Task Manager</h1>
          <div className="header-actions">
            <button 
              className={`btn btn-secondary ${isDarkMode ? 'dark-mode' : ''}`}
              onClick={onToggleDarkMode}
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              + Create Board
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="boards-container">
          {boards.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-content">
                <h2>Welcome to Task Manager!</h2>
                <p>Create your first board to get started organizing your tasks.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateForm(true)}
                >
                  Create Your First Board
                </button>
              </div>
            </div>
          ) : (
            <div className="boards-grid">
              {boards.map(board => (
                <div 
                  key={board.id} 
                  className="board-card"
                  onClick={() => onSelectBoard(board)}
                >
                  <div className="board-card-header">
                    <h3 className="board-title">{board.name}</h3>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={(e) => handleDeleteBoard(board.id, e)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="board-stats">
                    <span className="stat">
                      {board.lists.reduce((total, list) => total + list.cards.length, 0)} tasks
                    </span>
                    <span className="stat">
                      {board.lists.length} lists
                    </span>
                  </div>
                  <div className="board-preview">
                    {board.lists.slice(0, 3).map(list => (
                      <div key={list.id} className="list-preview">
                        <span className="list-title">{list.title}</span>
                        <span className="card-count">{list.cards.length}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showCreateForm && (
        <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Create New Board</h2>
              <button 
                className="modal-close"
                onClick={() => setShowCreateForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateBoard}>
              <div className="form-group">
                <label htmlFor="boardName">Board Name</label>
                <input
                  id="boardName"
                  type="text"
                  className="input"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  placeholder="Enter board name..."
                  autoFocus
                  required
                />
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
