import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Card from './Card';
import './List.css';

const List = ({ list, onUpdateList, onDeleteList, isDarkMode }) => {
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.title);

  const { setNodeRef } = useDroppable({
    id: `list-${list.id}`,
  });

  const cardIds = list.cards.map(card => card.id);

  const addCard = (e) => {
    e.preventDefault();
    if (newCardTitle.trim()) {
      const newCard = {
        id: Date.now().toString(),
        title: newCardTitle.trim(),
        description: '',
        createdAt: new Date().toISOString()
      };
      onUpdateList({
        ...list,
        cards: [...list.cards, newCard]
      });
      setNewCardTitle('');
      setShowAddCardForm(false);
    }
  };

  const updateCard = (cardId, updatedCard) => {
    const updatedCards = list.cards.map(card =>
      card.id === cardId ? updatedCard : card
    );
    onUpdateList({ ...list, cards: updatedCards });
  };

  const deleteCard = (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const updatedCards = list.cards.filter(card => card.id !== cardId);
      onUpdateList({ ...list, cards: updatedCards });
    }
  };

  const handleTitleEdit = (e) => {
    e.preventDefault();
    if (editedTitle.trim() && editedTitle.trim() !== list.title) {
      onUpdateList({ ...list, title: editedTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleDeleteList = () => {
    onDeleteList(list.id);
  };

  return (
    <div className="list" ref={setNodeRef}>
      <div className="list-header">
        {isEditingTitle ? (
          <form onSubmit={handleTitleEdit} className="title-edit-form">
            <input
              type="text"
              className="input title-input"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              autoFocus
            />
          </form>
        ) : (
          <h3 
            className="list-title"
            onClick={() => setIsEditingTitle(true)}
          >
            {list.title}
          </h3>
        )}
        <div className="list-actions">
          <span className="card-count">{list.cards.length}</span>
          <button 
            className="btn btn-danger btn-sm"
            onClick={handleDeleteList}
            title="Delete list"
          >
            ×
          </button>
        </div>
      </div>

      <div className="list-content">
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {list.cards.map(card => (
            <Card
              key={card.id}
              card={card}
              onUpdateCard={updateCard}
              onDeleteCard={deleteCard}
              isDarkMode={isDarkMode}
            />
          ))}
        </SortableContext>

        {showAddCardForm ? (
          <form onSubmit={addCard} className="add-card-form">
            <textarea
              className="input card-textarea"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="Enter a title for this card..."
              autoFocus
              rows="3"
            />
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Add Card
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setShowAddCardForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button 
            className="add-card-btn"
            onClick={() => setShowAddCardForm(true)}
          >
            + Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
