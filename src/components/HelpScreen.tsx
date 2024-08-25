import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaChevronDown, FaChevronUp, FaDollarSign, FaBolt, FaShoppingCart, FaExchangeAlt, FaMapMarkedAlt, FaNewspaper, FaChartLine, FaUserCircle, FaGoogle, FaSave, FaArrowUp, FaArrowDown, FaEquals } from 'react-icons/fa';

interface HelpScreenProps {
  onClose: () => void;
}

const HelpScreen: React.FC<HelpScreenProps> = ({ onClose }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const faqSections = [
    {
      title: 'Game Objective',
      content: 'Your goal is to become the wealthiest merchant by buying low, selling high, and managing your resources effectively. Travel between towns, trade goods, and upgrade your skills to maximize profits.'
    },
    {
      title: 'Game Interface',
      content: (
        <>
          <p>The game interface consists of several key sections:</p>
          <ul className="list-disc pl-5 mt-2">
            <li><FaUserCircle className="inline mr-2" /> Character Sheet: Shows your money, energy, and skills</li>
            <li><FaShoppingCart className="inline mr-2" /> Inventory: Displays the goods you currently own</li>
            <li><FaMapMarkedAlt className="inline mr-2" /> Travel Map: Allows you to move between towns</li>
            <li><FaNewspaper className="inline mr-2" /> News Panel: Provides important updates that may affect markets</li>
            <li><FaExchangeAlt className="inline mr-2" /> Global Trade Network: Shows prices and trends across all towns</li>
          </ul>
        </>
      )
    },
    {
      title: 'Resources',
      content: (
        <>
          <p><FaDollarSign className="inline mr-2" /> Money: Used to buy goods and upgrade skills. Earn more by selling goods at a profit.</p>
          <p><FaBolt className="inline mr-2" /> Energy: Consumed when traveling or upgrading skills. Replenishes each turn.</p>
        </>
      )
    },
    {
      title: 'Trading',
      content: (
        <>
          <p>To trade:</p>
          <ol className="list-decimal pl-5 mt-2">
            <li>Go to the Current Town Market section</li>
            <li>Click "Buy" to purchase goods (if you have enough money and energy)</li>
            <li>Travel to another town where the goods might be more valuable</li>
            <li>Click "Sell" to sell goods from your inventory</li>
          </ol>
          <p className="mt-2">Tip: Pay attention to market trends and news events that might affect prices!</p>
        </>
      )
    },
    {
      title: 'Market Trends',
      content: (
        <>
          <p>Each good has two trend indicators:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Price Change Arrow: Shows short-term price movement</li>
            <li>Market Sentiment Arrow: Indicates mid-term market direction</li>
          </ul>
          <p className="mt-2">Trend indicators:</p>
          <ul className="list-none pl-5 mt-2">
            <li><span className="text-green-700 font-bold">▲</span> Significant increase</li>
            <li><span className="text-green-500">▲</span> Slight increase</li>
            <li><span className="text-black">≈</span> Stable</li>
            <li><span className="text-red-500">▼</span> Slight decrease</li>
            <li><span className="text-red-700 font-bold">▼</span> Significant decrease</li>
          </ul>
          <p className="mt-2">Example: ▲|▼ means the price increased recently, but the market sentiment is bearish.</p>
        </>
      )
    },
    {
      title: 'Traveling',
      content: 'Use the Travel Map to move between towns. Each journey consumes energy. Choose your destinations wisely based on potential profits and your current energy levels.'
    },
    {
      title: 'Skills',
      content: (
        <>
          <p>Upgrade your skills to gain advantages:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Negotiation: Improves buying and selling prices</li>
            <li>Logistics: Increases inventory capacity and reduces travel costs</li>
            <li>Market Knowledge: Provides better market information and trend predictions</li>
          </ul>
          <p className="mt-2">Skills cost money and energy to upgrade. Plan your upgrades strategically!</p>
        </>
      )
    },
    {
      title: 'News and Events',
      content: 'Pay attention to the News Panel for important updates. Events can be city-specific, global, or related to technological advancements. These events can significantly impact market conditions and prices.'
    },
    {
      title: 'Technological Advancements',
      content: 'As the game progresses through different historical periods (1800-2000+), new goods become available. Keep an eye out for new trading opportunities as technology evolves!'
    },
    {
      title: 'Economic Cycles',
      content: 'The game simulates economic booms and busts. Adapt your strategy to thrive in changing economic conditions.'
    },
    {
      title: 'End Turn',
      content: 'Click the "End Turn" button to advance time, replenish energy, and update market conditions. Use this strategically to take advantage of market changes or to recover energy.'
    },
    {
      title: 'Autosaving and Google Account',
      content: (
        <>
          <p><FaSave className="inline mr-2" /> Autosaving: Your game progress is automatically saved after every action you take in the game.</p>
          <p><FaGoogle className="inline mr-2" /> Google Account: Your game is linked to your Google account. This allows you to:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Resume your game from any device by signing in with the same Google account.</li>
            <li>Have your progress automatically synced and saved in real-time.</li>
            <li>Ensure your game data is securely stored and associated with your account.</li>
          </ul>
          <p className="mt-2">Note: You don't need to manually save your game. As long as you're signed in, your progress is continuously saved and can be accessed from any device.</p>
        </>
      )
    }
  ];

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">How to Play</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>
        {faqSections.map((section, index) => (
          <div key={index} className="mb-4 border-b pb-2">
            <button
              className="flex justify-between items-center w-full text-left font-semibold"
              onClick={() => toggleSection(section.title)}
            >
              {section.title}
              {openSection === section.title ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openSection === section.title && (
              <div className="mt-2 text-gray-700">
                {typeof section.content === 'string' ? <p>{section.content}</p> : section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpScreen;