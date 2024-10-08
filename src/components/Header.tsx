import React from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { useAuth } from '../contexts/AuthContext';
import { formatDate } from '../utils/timeUtils';
import { FaQuestionCircle, FaHourglassEnd, FaRedo, FaSignOutAlt, FaGoogle } from 'react-icons/fa';

interface HeaderProps {
  onShowHelp: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowHelp }) => {
  const { state, endTurn, newGame } = useGameState();
  const { user, signIn, signOut } = useAuth();

  const buttonClass = "font-bold py-2 px-4 rounded h-10 flex items-center";
  const helpNewGameClass = `${buttonClass} bg-blue-500 hover:bg-blue-600 text-white`;
  const endTurnClass = `${buttonClass} bg-green-500 hover:bg-green-600 text-white`;
  const signOutClass = "text-gray-500 hover:text-gray-700 text-sm";
  const signInClass = "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow text-sm transition duration-150 ease-in-out";
  const iconButtonClass = "p-2 rounded-full hover:bg-gray-200";

  const handleNewGame = () => {
    newGame();
  };

  return (
    <header className="bg-white shadow-sm p-2 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/fbticon.svg" alt="Business Empire Icon" className="text-blue-600 text-xs mr-2 h-6" />
            <h1 className="text-lg font-bold">Business Empire</h1>
          </div>
          <div className="text-xl font-semibold hidden md:flex items-center">
            <svg className="w-6 h-6 mr-2 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {formatDate(state.currentDate)}
          </div>
          <div className="flex items-center space-x-2">
            {/* Desktop buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <button onClick={signOut} className={signOutClass}>
                  <FaSignOutAlt className="mr-1 inline" /> Sign Out
                </button>
              ) : (
                <button onClick={signIn} className={signInClass}>
                  <FaGoogle className="mr-1 inline text-red-500" /> Sign in with Google
                </button>
              )}
              <button onClick={onShowHelp} className={helpNewGameClass}>
                <FaQuestionCircle className="mr-1" /> Help
              </button>
              <button onClick={handleNewGame} className={helpNewGameClass}>
                <FaRedo className="mr-1" /> New Game
              </button>
              <button onClick={endTurn} className={endTurnClass}>
                <FaHourglassEnd className="mr-1" /> End Turn
              </button>
            </div>

            {/* Mobile buttons */}
            <div className="md:hidden flex items-center space-x-2">
              {user ? (
                <>
                  <button onClick={signOut} className={iconButtonClass}>
                    <FaSignOutAlt />
                  </button>
                  <button onClick={onShowHelp} className={iconButtonClass}>
                    <FaQuestionCircle />
                  </button>
                  <button onClick={handleNewGame} className={helpNewGameClass}>
                    <FaRedo className="mr-1" /> New
                  </button>
                  <button onClick={endTurn} className={endTurnClass}>
                    <FaHourglassEnd className="mr-1" /> End
                  </button>
                </>
              ) : (
                <button onClick={signIn} className={signInClass}>
                  <FaGoogle className="mr-1 inline text-red-500" /> Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;