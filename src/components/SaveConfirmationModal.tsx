import React, { useEffect } from 'react';

interface SaveConfirmationModalProps {
  onClose: () => void;
}

const SaveConfirmationModal: React.FC<SaveConfirmationModalProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm w-full">
        <p className="text-center text-lg font-medium">Game saved successfully!</p>
      </div>
    </div>
  );
};

export default SaveConfirmationModal;