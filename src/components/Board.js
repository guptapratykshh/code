import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import List from './List';
import './Board.css';

const Board = ({ 
  board, 
  onUpdateBoard, 
  onBackToDashboard, 
  isDarkMode, 
  onToggleDarkMode 
}) => {
  const [activeId, setActiveId] = useState(null);
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [query, setQuery] = useState('');

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    if (active.id !== over.id) {
      const activeCard = findCardById(active.id);
      const overCard = findCardById(over.id);
      
      if (activeCard && overCard && activeCard.listId !== overCard.listId) {
        // Moving card between lists
        moveCardBetweenLists(activeCard, overCard);
      } else if (activeCard && overCard && activeCard.listId === overCard.listId) {
        // Reordering cards within the same list
        reorderCardsInList(activeCard, overCard);
      }
    }
    
    setActiveId(null);
  };

  const findCardById = (cardId) => {
    for (const list of board.lists) {
      const card = list.cards.find(card => card.id === cardId);
      if (card) {
        return { ...card, listId: list.id };
      }
    }
    return null;
  };

  const moveCardBetweenLists = (activeCard, overCard) => {
    const updatedLists = board.lists.map(list => {
      if (list.id === activeCard.listId) {
        return {
          ...list,
          cards: list.cards.filter(card => card.id !== activeCard.id)
        };
      }
      if (list.id === overCard.listId) {
        const overIndex = list.cards.findIndex(card => card.id === overCard.id);
        const newCards = [...list.cards];
        newCards.splice(overIndex, 0, { ...activeCard, listId: list.id });
        return {
          ...list,
          cards: newCards
        };
      }
      return list;
    });
    
    onUpdateBoard({ ...board, lists: updatedLists });
  };

  const reorderCardsInList = (activeCard, overCard) => {
    const updatedLists = board.lists.map(list => {
      if (list.id === activeCard.listId) {
        const cardIds = list.cards.map(card => card.id);
        const oldIndex = cardIds.indexOf(activeCard.id);
        const newIndex = cardIds.indexOf(overCard.id);
        
        const newCards = [...list.cards];
        const [removed] = newCards.splice(oldIndex, 1);
        newCards.splice(newIndex, 0, removed);
        
        return {
          ...list,
          cards: newCards
        };
      }
      return list;
    });
    
    onUpdateBoard({ ...board, lists: updatedLists });
  };

  const addList = (e) => {
    e.preventDefault();
    if (newListTitle.trim()) {
      const newList = {
        id: Date.now().toString(),
        title: newListTitle.trim(),
        cards: []
      };
      onUpdateBoard({
        ...board,
        lists: [...board.lists, newList]
      });
      setNewListTitle('');
      setShowAddListForm(false);
    }
  };

  const updateList = (listId, updatedList) => {
    const updatedLists = board.lists.map(list =>
      list.id === listId ? updatedList : list
    );
    onUpdateBoard({ ...board, lists: updatedLists });
  };

  const deleteList = (listId) => {
    if (window.confirm('Are you sure you want to delete this list? All cards in this list will be deleted.')) {
      const updatedLists = board.lists.filter(list => list.id !== listId);
      onUpdateBoard({ ...board, lists: updatedLists });
    }
  };

  const allCardIds = board.lists.flatMap(list => list.cards.map(card => card.id));

  return (
    <div className="board">
      <header className="board-header">
        <div className="board-header-content">
          <button 
            className="btn btn-secondary"
            onClick={onBackToDashboard}
          >
            ← Back to Dashboard
          </button>
          <h1 className="board-title">{board.name}</h1>
          <div className="board-actions">
            <input
              className="input"
              placeholder="Search tasks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{minWidth:'220px'}}
            />
            <button 
              className={`btn btn-secondary ${isDarkMode ? 'dark-mode' : ''}`}
              onClick={onToggleDarkMode}
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </header>

      <main className="board-main">
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="lists-container">
            <SortableContext items={allCardIds} strategy={verticalListSortingStrategy}>
              {board.lists.map(list => (
                <List
                  key={list.id}
                  list={{...list, cards: list.cards.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase()))}}
                  onUpdateList={updateList}
                  onDeleteList={deleteList}
                  isDarkMode={isDarkMode}
                />
              ))}
            </SortableContext>
            
            {showAddListForm ? (
              <div className="add-list-form">
                <form onSubmit={addList}>
                  <input
                    type="text"
                    className="input"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    placeholder="Enter list title..."
                    autoFocus
                  />
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      Add List
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowAddListForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <button 
                className="add-list-btn"
                onClick={() => setShowAddListForm(true)}
              >
                + Add another list
              </button>
            )}
          </div>
          
          <DragOverlay>
            {activeId ? (
              <div className="drag-overlay">
                Dragging card...
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
};

export default Board;
