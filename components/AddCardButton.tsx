// components/AddCardButton.tsx
import React from 'react';

interface AddCardButtonProps {
  onClick: () => void;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed h-16 w-16 bottom-4 right-4 p-4 bg-red-200 flex items-center justify-center cursor-pointer rounded-full" onClick={onClick}>
      <span className="text-2xl font-bold text-gray-800">+</span>
    </div>
  );
};

export default AddCardButton;