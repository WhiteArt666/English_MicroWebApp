import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameState {
  currentLevel: string;
  currentLesson: number | null;
  score: number;
  streak: number;
  isInQuiz: boolean;
  questionsAnswered: number;
  totalQuestions: number;
}

interface GameContextType {
  gameState: GameState;
  startLesson: (lessonId: number) => void;
  endLesson: () => void;
  updateScore: (points: number) => void;
  nextQuestion: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 'A1',
    currentLesson: null,
    score: 0,
    streak: 0,
    isInQuiz: false,
    questionsAnswered: 0,
    totalQuestions: 0
  });

  const startLesson = (lessonId: number) => {
    setGameState(prev => ({
      ...prev,
      currentLesson: lessonId,
      isInQuiz: true,
      questionsAnswered: 0,
      score: 0
    }));
  };

  const endLesson = () => {
    setGameState(prev => ({
      ...prev,
      currentLesson: null,
      isInQuiz: false,
      questionsAnswered: 0,
      totalQuestions: 0
    }));
  };

  const updateScore = (points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points
    }));
  };

  const nextQuestion = () => {
    setGameState(prev => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + 1
    }));
  };

  const resetGame = () => {
    setGameState({
      currentLevel: 'A1',
      currentLesson: null,
      score: 0,
      streak: 0,
      isInQuiz: false,
      questionsAnswered: 0,
      totalQuestions: 0
    });
  };

  const value: GameContextType = {
    gameState,
    startLesson,
    endLesson,
    updateScore,
    nextQuestion,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
