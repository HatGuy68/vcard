// components/AddCardForm.tsx (Updated)
'use client';

import React, { useState } from 'react';

interface AddCardFormProps {
  onClose: () => void;
  onSave: (cardData: { cardNumber: string; firstName: string; lastName: string; email: string; designation: string; organization: string; cardType: string }) => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onClose, onSave }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [organization, setOrganization] = useState('');
  const [cardType, setCardType] = useState('Personal');

  const handleSave = () => {
    const newCardData = { cardNumber, firstName, lastName, email, designation, organization, cardType };
    onSave(newCardData);
    setCardNumber(''); // Clear form fields after save
    setFirstName('');
    setLastName('');
    setEmail('');
    setDesignation('');
    setOrganization('');
    setCardType('Personal');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-400 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Card</h2>
        {/* Add a select for card type */}
        <select
          className="border rounded-md px-3 py-2 mb-3 w-full text-gray-800"
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
        >
          <option value="Personal">Personal</option>
          <option value="Business">Business</option>
          {/* Add more options as needed */}
        </select>
        <input
          type="number"
          placeholder="Phone Number"
          className="border rounded-md px-3 py-2 mb-3 w-full text-gray-800"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <div className="flex flex-col md:flex-row">
        <input
          type="text"
          placeholder="First Name"
          className="border rounded-md px-3 py-2 mb-3 md:mr-3 text-gray-800"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          />
        <input
          type="text"
          placeholder="Last Name"
          className="border rounded-md px-3 py-2 mb-3 text-gray-800"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        </div>
        <input
          type="text"
          placeholder="Email"
          className="border rounded-md px-3 py-2 mb-3 w-full text-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex flex-col md:flex-row">
          <input
            type="text"
            placeholder="Designation"
            className="border rounded-md px-3 py-2 mb-3 md:mr-3 text-gray-800"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Organization"
            className="border rounded-md px-3 py-2 mb-3 text-gray-800"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </div>

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