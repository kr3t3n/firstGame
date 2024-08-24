import React, { useState, useEffect } from 'react';
import { useGameState } from '../contexts/GameStateContext';

const NewsPanel: React.FC = () => {
  const { state } = useGameState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  if (state.news.length === 0) {
    return null;
  }

  const currentNews = state.news[currentNewsIndex];

  const goToPreviousNews = () => {
    setCurrentNewsIndex((prevIndex) => 
      prevIndex < state.news.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const goToNextNews = () => {
    setCurrentNewsIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div className="mb-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div 
        className="bg-gray-800 text-white p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-bold">Breaking News</h2>
        <span>{isExpanded ? '▼' : '▶'}</span>
      </div>
      {isExpanded && (
        <div className="p-4">
          <div className="mb-4 text-2xl font-bold text-red-600">{currentNews.headline}</div>
          {currentNews.imageUrl && (
            <img src={currentNews.imageUrl} alt="News illustration" className="w-full h-48 object-cover mb-4 rounded" />
          )}
          <div className="text-sm text-gray-600 mb-2">
            {new Date(currentNews.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <p className="mt-2 text-gray-800">{currentNews.body}</p>
          <div className="mt-4 flex justify-between">
            <button 
              onClick={goToPreviousNews} 
              disabled={currentNewsIndex >= state.news.length - 1}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              ← Older
            </button>
            <button 
              onClick={goToNextNews} 
              disabled={currentNewsIndex <= 0}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Newer →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPanel;