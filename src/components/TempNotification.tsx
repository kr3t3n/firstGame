import React, { useEffect } from 'react';

interface TempNotificationProps {
  message: string;
  onClose: () => void;
}

const TempNotification: React.FC<TempNotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  );
};

export default TempNotification;