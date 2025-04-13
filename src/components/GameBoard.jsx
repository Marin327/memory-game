import React from "react";
import MemoryCard from "./MemoryCard";

const GameBoard = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-4 gap-4 justify-center items-center">
      {cards.map((card) => (
        <MemoryCard key={card.id} card={card} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default GameBoard;