import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Board from './components/Board';
import './App.css';

function App() {
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBoards = localStorage.getItem('trello-boards');
    const savedDarkMode = localStorage.getItem('trello-dark-mode');
    
    if (savedBoards) {
      try {
        setBoards(JSON.parse(savedBoards));
      } catch (error) {
        console.error('Error parsing saved boards:', error);
      }
    }
    
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save boards to localStorage whenever boards change
  useEffect(() => {
    localStorage.setItem('trello-boards', JSON.stringify(boards));
  }, [boards]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('trello-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const createBoard = (name) => {
    const newBoard = {
      id: Date.now().toString(),
      name,
      lists: [
        {
          id: 'todo',
          title: 'To Do',
          cards: []
        },
        {
          id: 'in-progress',
          title: 'In Progress',
          cards: []
        },
        {
          id: 'done',
          title: 'Done',
          cards: []
        }
      ],
      createdAt: new Date().toISOString()
    };
    setBoards([...boards, newBoard]);
  };

  const deleteBoard = (boardId) => {
    setBoards(boards.filter(board => board.id !== boardId));
    if (currentBoard && currentBoard.id === boardId) {
      setCurrentBoard(null);
    }
  };

  const updateBoard = (updatedBoard) => {
    setBoards(boards.map(board => 
      board.id === updatedBoard.id ? updatedBoard : board
    ));
    if (currentBoard && currentBoard.id === updatedBoard.id) {
      setCurrentBoard(updatedBoard);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      {currentBoard ? (
        <Board
          board={currentBoard}
          onUpdateBoard={updateBoard}
          onBackToDashboard={() => setCurrentBoard(null)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      ) : (
        <Dashboard
          boards={boards}
          onCreateBoard={createBoard}
          onDeleteBoard={deleteBoard}
          onSelectBoard={setCurrentBoard}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}
    </div>
  );
}

export default App;
