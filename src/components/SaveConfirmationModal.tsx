import React from 'react';

interface SaveConfirmationModalProps {
  onClose: () => void;
}

const SaveConfirmationModal: React.FC<SaveConfirmationModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
        <h2 className="text-xl font-bold mb-4">Game Saved</h2>
        <p className="mb-4">Your game has been saved successfully.</p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SaveConfirmationModal;