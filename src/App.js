// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MemoryBoard from "./components/MemoryBoard";
import ScorePanel from "./components/ScorePanel";
import Timer from "./components/Timer";
import WinMessage from "./components/WinMessage";
import ResetButton from "./components/ResetButton";

function App() {
  const [isRunning, setIsRunning] = useState(true); // Да започне таймерът
  const [moves, setMoves] = useState(0);
  const [isWin, setIsWin] = useState(false);

  const handleReset = () => {
    setIsWin(false);
    setMoves(0);
    setIsRunning(true);
  };

  const handleWin = () => {
    setIsWin(true);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-black text-white">
      <Header />
      <main className="flex-grow p-6 flex flex-col items-center">
        <ScorePanel moves={moves} />
        <Timer isRunning={isRunning} />
        <MemoryBoard
          setMoves={setMoves}
          setIsWin={handleWin}
          isRunning={isRunning}
        />
        <WinMessage isWin={isWin} />
        <ResetButton onReset={handleReset} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
