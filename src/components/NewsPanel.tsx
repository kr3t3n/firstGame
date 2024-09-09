import React, { useState } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { NewsItem } from '../types';
import { formatDate as formatDateUtil } from '../utils/timeUtils';

interface NewsPanelProps {
  tooltip: React.ReactNode;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ tooltip }) => {
  const { state } = useGameState();
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  if (!state) {
    return <div>Loading...</div>;
  }

  const formatDate = (date: Date | string) => {
    if (date instanceof Date) {
      return formatDateUtil(date);
    } else if (typeof date === 'string') {
      return formatDateUtil(new Date(date));
    }
    return 'Unknown Date';
  };

  const currentNews: NewsItem | undefined = state.news[currentNewsIndex];

  const handleOlderNews = () => {
    if (currentNewsIndex < state.news.length - 1) {
      setCurrentNewsIndex(currentNewsIndex + 1);
    }
  };

  const handleNewerNews = () => {
    if (currentNewsIndex > 0) {
      setCurrentNewsIndex(currentNewsIndex - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold flex items-center">
          News & Events
          {tooltip}
        </h2>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-500">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && currentNews && (
        <>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">{formatDate(currentNews.date)}</p>
              <h3 className="font-bold">{currentNews.title}</h3>
              <p>{currentNews.body}</p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleOlderNews}
              disabled={currentNewsIndex === state.news.length - 1}
              className="text-blue-500 disabled:text-gray-400"
            >
              <FaChevronLeft /> Older
            </button>
            <button
              onClick={handleNewerNews}
              disabled={currentNewsIndex === 0}
              className="text-blue-500 disabled:text-gray-400"
            >
              Newer <FaChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsPanel;