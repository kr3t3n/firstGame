import React, { useState } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import Tooltip from './Tooltip';
import { formatDate } from '../utils/timeUtils';

const NewsPanel: React.FC = () => {
  const { state } = useGameState();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  if (!state.news || state.news.length === 0) {
    return (
      <div className="mb-4">
        <h3 className="font-medium mb-2 flex items-center">
          News
          <Tooltip content="Recent events that may affect market prices and trading conditions. Pay attention to these for better trading decisions!">
            <span className="text-xs text-gray-500 ml-2 cursor-help">ℹ️</span>
          </Tooltip>
        </h3>
        <p>No recent news.</p>
      </div>
    );
  }

  const currentNews = state.news[currentNewsIndex];

  const handleOlder = () => {
    setCurrentNewsIndex(prev => Math.min(prev + 1, state.news.length - 1));
  };

  const handleNewer = () => {
    setCurrentNewsIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2 flex items-center">
        News
        <Tooltip content="Recent events that may affect market prices and trading conditions. Pay attention to these for better trading decisions!">
          <span className="text-xs text-gray-500 ml-2 cursor-help">ℹ️</span>
        </Tooltip>
      </h3>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {currentNews.imageUrl && (
          <img src={currentNews.imageUrl} alt={currentNews.headline} className="w-full h-48 object-cover" />
        )}
        <div className="p-4">
          <h4 className="font-semibold text-lg mb-2">{currentNews.headline}</h4>
          <p className="text-gray-600 mb-2">{currentNews.body}</p>
          <p className="text-sm text-gray-500">{formatDate(new Date(currentNews.date))}</p>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <button
          onClick={handleOlder}
          disabled={currentNewsIndex === state.news.length - 1}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded-md text-sm transition duration-150 ease-in-out disabled:opacity-50"
        >
          ← Older
        </button>
        <button
          onClick={handleNewer}
          disabled={currentNewsIndex === 0}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded-md text-sm transition duration-150 ease-in-out disabled:opacity-50"
        >
          Newer →
        </button>
      </div>
    </div>
  );
};

export default NewsPanel;