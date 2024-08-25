import React, { useState } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const NewsPanel: React.FC = () => {
  const { state } = useGameState();
  const [isExpanded, setIsExpanded] = useState(true);

  if (!state) {
    return <div>Loading...</div>;
  }

  const formatDate = (date: Date | string) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    } else if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    }
    return 'Unknown Date';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">News & Events</h2>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-500">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className="space-y-4">
          {state.news.slice().reverse().map((item, index) => (
            <div key={index} className="border-b pb-2">
              <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPanel;