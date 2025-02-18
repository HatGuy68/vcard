// components/AddCardForm.tsx (Updated)
'use client';

import React, { useState } from 'react';

interface AddCardFormProps {
  onClose: () => void;
  onSave: (cardData: { cardNumber: string; name: string; cardType: string }) => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onClose, onSave }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [cardType, setCardType] = useState('Personal');

  const handleSave = () => {
    const newCardData = { cardNumber, name, cardType };
    onSave(newCardData);
    setCardNumber(''); // Clear form fields after save
    setName('');
    setCardType('Personal');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Add New Card</h2>
        <input
          type="text"
          placeholder="Card Number"
          className="border rounded-md px-3 py-2 mb-3 w-full"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          className="border rounded-md px-3 py-2 mb-3 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Add a select for card type */}
        <select
          className="border rounded-md px-3 py-2 mb-3 w-full"
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
        >
          <option value="Personal">Personal</option>
          <option value="Business">Business</option>
          {/* Add more options as needed */}
        </select>

        <div className="flex justify-end">
          <button
            className="bg-gray-300 rounded-md px-4 py-2 mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="bg-blue-500 text-white rounded-md px-4 py-2" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCardForm;