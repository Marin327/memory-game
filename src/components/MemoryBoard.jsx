// src/components/MemoryBoard.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Символите за картите
const symbols = ["🍕", "🚀", "🎩", "🌟", "🐱", "🎮", "🍎", "🐶"];

// Функция за разбъркване на картите
function shuffleDeck() {
  const doubled = [...symbols, ...symbols]; // Дублираме символите за картите
  return doubled
    .sort(() => Math.random() - 0.5) // Разбъркваме картите
    .map((symbol, index) => ({ id: index, symbol, matched: false })); // Връщаме карта с id, символ и състояние
}

function MemoryBoard({ setMoves, setIsWin, isRunning }) {
  const [deck, setDeck] = useState(shuffleDeck()); // Състояние на картите
  const [flipped, setFlipped] = useState([]); // Картите, които са обърнати
  const [matched, setMatched] = useState([]); // Състояние на съвпаденията
  const [lockBoard, setLockBoard] = useState(false); // За да блокираме избора на карти по време на анимация
  const [moves, setLocalMoves] = useState(0); // Локален брой ходове

  // Функция за кликване върху карта
  const handleCardClick = (index) => {
    if (lockBoard || flipped.includes(index) || !isRunning) return; // Ако картата е вече обърната или играта не тече, не правим нищо

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped); // Добавяме индекса на обърнатата карта

    // Когато имаме 2 обърнати карти
    if (newFlipped.length === 2) {
      setLockBoard(true); // Блокираме изборите, докато не приключи анимацията

      const [first, second] = newFlipped;
      if (deck[first].symbol === deck[second].symbol) {
        // Ако картите съвпадат, добавяме символа към списъка с "matched"
        setMatched((prev) => [...prev, deck[first].symbol]);
        setTimeout(() => {
          setFlipped([]); // Изчистваме обърнатите карти
          setLockBoard(false); // Разблокираме дъската
        }, 1000); // Време за анимация
      } else {
        setTimeout(() => {
          setFlipped([]); // Ако не съвпадат, изчистваме обърнатите карти
          setLockBoard(false); // Разблокираме дъската
        }, 1000); // Време за анимация
      }

      setLocalMoves((m) => m + 1); // Увеличаваме броя на ходовете
      setMoves((prevMoves) => prevMoves + 1); // Изпращаме броя на ходовете в родителския компонент
    }
  };

  return (
    <View style={styles.board}>
      {deck.map((card, index) => (
        <TouchableOpacity
          key={card.id}
          style={[
            styles.card,
            flipped.includes(index) && styles.flipped,
            matched.includes(card.symbol) && styles.matched,
          ]}
          onPress={() => handleCardClick(index)}
        >
          <Text style={styles.cardText}>
            {flipped.includes(index) || matched.includes(card.symbol) ? card.symbol : "❓"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  card: {
    width: 70,
    height: 70,
    margin: 5,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  flipped: {
    backgroundColor: "#ddd",
  },
  matched: {
    backgroundColor: "#4caf50", // зелен за съвпадналите карти
  },
  cardText: {
    fontSize: 24,
  },
});

export default MemoryBoard;
