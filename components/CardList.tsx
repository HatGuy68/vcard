// components/CardList.tsx
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface CardData {
  id: string;
  cardNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  organization: string;
  cardType: string;
}

interface CardListProps {
  cards: CardData[];
  onDeleteCard: (id: string) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, onDeleteCard }) => {
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const generateVCard = (card: CardData) => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${card.firstName} ${card.lastName}
N;${card.lastName}; ${card.firstName};;;
TEL;TYPE=WORK,VOICE:${card.cardNumber}
ORG;CHARSET=UTF-8:${card.organization}
TITLE;CHARSET=UTF-8:${card.designation}
NOTE;CHARSET=UTF-8:${card.cardType} Card
END:VCARD`;
  };

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
  };

  const handleCloseProfile = () => {
    setSelectedCard(null);
  };

  return (
    <div>
        <div className='p-10'>
            {cards.map((card) => (
                <div
                key={card.id}
                className={`bg-[linear-gradient(to_right,#86663c,#ede06c,#86663c)] rounded-lg p-6 mb-6 w-80 cursor-pointer ${selectedCard?.id === card.id ? 'border-4 border-blue-500' : ''}`} // Add cursor pointer and highlight
                onClick={() => handleCardClick(card)} // Add click handler
                >
                {/* Card Content (same as before) */}
                <div className="flex justify-between items-center mb-10">
                    <span className="text-black">{card.cardType}</span>
                    <div className="w-16 h-16 border-dashed border-black"><QRCodeSVG value={generateVCard(card)} size={64} bgColor={'transparent'} /></div>
                </div>
                <div className="text-xl mb-3 text-black">{card.cardNumber}</div>
                <div className="text-lg text-black">{card.firstName} {card.lastName}</div>
                </div>
            ))}
        </div>
        <div>
            {/* Profile Popup */}
            {selectedCard && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 shadow-md w-96 text-black"> {/* Adjust width as needed */}
                    <div className="w-64 h-64 border-dashed border-black mb-6"><QRCodeSVG value={generateVCard(selectedCard)} size={256} bgColor={'transparent'} /></div>
                    <h2 className="text-xl font-bold mb-4">{selectedCard.firstName} {selectedCard.lastName}</h2>
                    <p className="text-lg mb-2">{selectedCard.cardNumber}</p>
                    <p className="text-lg mb-2">{selectedCard.designation} @ {selectedCard.organization}</p>
                    {/* Add more profile details here */}
                    <div className="flex flex-row items-center justify-around w-full">
                    <button
                        className="rounded-md px-4 py-2 text-red-500 hover:text-red-700"
                        onClick={() => onDeleteCard(selectedCard.id)}
                    >
                        Delete
                    </button>
                    <button className="rounded-md px-4 py-2" onClick={handleCloseProfile}>
                        Close
                    </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
  );
};

export default CardList;