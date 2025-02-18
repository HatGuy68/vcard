// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import AddCardForm from '@/components/AddCardForm';
import { QRCodeSVG } from 'qrcode.react';

interface CardData {
  id: string;
  cardNumber: string;
  name: string;
  cardType: string;
}

const HomePage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  useEffect(() => {
    const storedCards = localStorage.getItem('cards');
    if (storedCards) {
      try {
        const parsedCards = JSON.parse(storedCards);
        if (Array.isArray(parsedCards)) {
          setCards(parsedCards);
        } else {
          console.error("Invalid cards format in localStorage:", parsedCards);
        }
      } catch (error) {
        console.error("Error parsing cards from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const handlePlusClick = () => {
    setShowAddCardForm(true);
  };

  const handleFormClose = () => {
    setShowAddCardForm(false);
  };

  const handleFormSave = (newCardData: Omit<CardData, 'id'>) => {
    const newCard: CardData = { ...newCardData, id: crypto.randomUUID() }; // Generate unique ID
    setCards([...cards, newCard]);
    setShowAddCardForm(false);
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const generateVCard = (card: CardData) => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${card.name}
TEL;TYPE=WORK,VOICE:${card.cardNumber}
ORG;CHARSET=UTF-8:Konect
TITLE;CHARSET=UTF-8:${card.cardType} Card
END:VCARD`;
};

  return (
      <div className="bg-[linear-gradient(to_right,#314f51,#4d686a,#314f51)] flex flex-col items-center justify-content: flex-start; min-h-screen font-sans p-10">
        {/* Render multiple cards */}
        {cards.map((card) => ( // Correct: card, singular, inside map
          <div key={card.id} className="bg-[linear-gradient(to_right,#86663c,#ede06c,#86663c)] rounded-lg p-6 mb-6 w-80">
            <div className="flex justify-between items-center mb-10">
              <span className="text-black">{card.cardType}</span>
              <div className="w-16 h-16 border-dashed border-black"><QRCodeSVG value={generateVCard(card)} size={64} bgColor={'transparent'} /></div>
            </div>
            <div className="text-xl mb-3 text-black">{card.cardNumber}</div>
            <div className="text-lg text-black">{card.name}</div>
            {/* <button
              className="text-red-500 hover:text-red-700 mt-2"
              onClick={() => handleDeleteCard(card.id)}
            >
              Delete
            </button> */}
          </div>
        ))}

        {cards.length === 0 && ( // Only render message if cards.length === 0
          <div className='flex flex-col items-center justify-around min-h-screen font-sans p-6'>
            <div className="rounded-lg p-6 border-2 border-gray-300 border-dashed mb-6 w-80"> {/* Card Container */}
              <div className="flex justify-between items-center mb-10"> {/* Card Header */}
                <span className="text-gray-400">Personal</span>
                <div className="w-8 h-8 border-dashed border-gray-400"></div> {/* Square */}
              </div>
              <div className="text-xl mb-3 text-gray-500">XXX XXX XXXX</div> {/* Card Number */}
              <div className="text-lg text-gray-400">Your Name</div> {/* Card Name */}
            </div>
            
            <div className="text-3xl text-[#f2ebac] font-bold mb-8">Konect</div> {/* Konect Logo */}
            
            <span className="text-gray-400 mr-2">Create New Card</span>
          </div>
        )}

        <div className="fixed h-16 w-16 bottom-4 right-4 p-4 bg-red-200 flex items-center justify-center cursor-pointer rounded-full" onClick={handlePlusClick}> {/* Create Card Button */}
          <span className="text-2xl font-bold text-gray-800">+</span> {/* Plus Icon */}
        </div>

        {showAddCardForm && (
        <AddCardForm onClose={handleFormClose} onSave={handleFormSave} />
      )}
    </div>
  );
};

export default HomePage;
