import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CardModal from './CardModal';
import './Card.css';

const Card = ({ card, onUpdateCard, onDeleteCard, isDarkMode }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleUpdateCard = (updatedCard) => {
    onUpdateCard(card.id, updatedCard);
  };

  const handleDeleteCard = () => {
    onDeleteCard(card.id);
    setShowModal(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`card ${isDragging ? 'dragging' : ''} ${isDarkMode ? 'dark-mode' : ''}`}
        onClick={handleCardClick}
      >
        <div className="card-content">
          <h4 className="card-title">{card.title}</h4>
          {card.description && (
            <p className="card-description">{card.description}</p>
          )}
        </div>
        <div className="card-actions">
          <button 
            className="btn btn-danger btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCard();
            }}
            title="Delete card"
          >
            ×
          </button>
        </div>
      </div>

      {showModal && (
        <CardModal
          card={card}
          onUpdateCard={handleUpdateCard}
          onDeleteCard={handleDeleteCard}
          onClose={() => setShowModal(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
};

export default Card;
