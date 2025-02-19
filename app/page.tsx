// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import AddCardButton from '@/components/AddCardButton';
import CardList from '@/components/CardList';
import EmptyCardPlaceholder from '@/components/EmptyCardPlaceholder';
import AddCardForm from '@/components/AddCardForm';

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

  const handleAddCardClick = () => {
    setShowAddCardForm(true);
  };

  const handleFormClose = () => {
    setShowAddCardForm(false);
  };

  const handleFormSave = (newCardData: Omit<CardData, 'id'>) => {
    const newCard: CardData = { ...newCardData, id: crypto.randomUUID() };
    setCards([...cards, newCard]);
    setShowAddCardForm(false);
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };


  return (
    <div className="bg-[linear-gradient(to_right,#314f51,#4d686a,#314f51)] flex flex-col items-center justify-start min-h-screen font-sans">
      {cards.length === 0 ? (
        <EmptyCardPlaceholder onAddClick={handleAddCardClick} /> 
      ) : (
        <CardList cards={cards} onDeleteCard={handleDeleteCard} />
      )}

      <AddCardButton onClick={handleAddCardClick} />

      {showAddCardForm && (
        <AddCardForm onClose={handleFormClose} onSave={handleFormSave} />
      )}
    </div>
  );
};

export default HomePage;
