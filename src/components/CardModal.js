import React, { useState, useEffect } from 'react';
import './CardModal.css';

const CardModal = ({ card, onUpdateCard, onDeleteCard, onClose, isDarkMode }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
  }, [card]);

  const handleSave = () => {
    if (title.trim()) {
      onUpdateCard({
        ...card,
        title: title.trim(),
        description: description.trim()
      });
      onClose();
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      onDeleteCard();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal card-modal ${isDarkMode ? 'dark-mode' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Card</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-content">
          <div className="form-group">
            <label htmlFor="cardTitle">Title</label>
            <input
              id="cardTitle"
              type="text"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title..."
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cardDescription">Description</label>
            <textarea
              id="cardDescription"
              className="input textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter card description..."
              rows="6"
            />
          </div>
          
          <div className="card-meta">
            <small className="text-muted">
              Created: {new Date(card.createdAt).toLocaleDateString()}
            </small>
          </div>
        </div>
        
        <div className="modal-footer">
          <div className="footer-actions">
            <button 
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete Card
            </button>
          </div>
          <div className="form-actions">
            <button 
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleSave}
              disabled={!title.trim()}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
