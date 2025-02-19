// components/EmptyCardPlaceholder.tsx
import React from 'react';

interface EmptyCardPlaceholderProps {
    onAddClick: () => void;
}

const EmptyCardPlaceholder: React.FC<EmptyCardPlaceholderProps> = ({onAddClick}) => {
    return (
        <div className='flex flex-col items-center justify-around min-h-screen font-sans p-6'>
            <div className="rounded-lg p-6 border-2 border-gray-300 border-dashed mb-6 w-80">
                <div className="flex justify-between items-center mb-10">
                    <span className="text-gray-400">Personal</span>
                    <div className="w-8 h-8 border-dashed border-gray-400"></div>
                </div>
                <div className="text-xl mb-3 text-gray-500">XXX XXX XXXX</div>
                <div className="text-lg text-gray-400">Your Name</div>
            </div>

            <div className="text-3xl text-[#f2ebac] font-bold mb-8">Konect</div>
        </div>
    );
};

export default EmptyCardPlaceholder;