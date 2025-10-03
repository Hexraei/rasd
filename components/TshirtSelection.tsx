
import React from 'react';
import { TSHIRT_DESIGNS } from '../constants';
import type { TshirtDesign } from '../types';

interface TshirtSelectionProps {
    selectedTShirts: string[];
    setSelectedTShirts: React.Dispatch<React.SetStateAction<string[]>>;
    onNext: () => void;
}

const TshirtCard: React.FC<{
    tshirt: TshirtDesign;
    isSelected: boolean;
    onToggle: (id: string) => void;
}> = ({ tshirt, isSelected, onToggle }) => {
    return (
        <div className="group">
            <div className="relative aspect-[4/5] overflow-hidden no-rounded">
                <img src={tshirt.frontImage} alt={tshirt.designName} className="w-full h-full object-cover no-rounded transition-transform duration-300 group-hover:scale-105" />
            </div>
            <button 
                onClick={() => onToggle(tshirt.id)}
                className={`w-full no-rounded small-caps text-sm py-2 mt-2 transition-colors ${isSelected ? 'bg-gray-400 text-black' : 'bg-black text-white hover:bg-gray-800'}`}>
                {isSelected ? 'Unselect' : 'Select'}
            </button>
        </div>
    );
};

const TshirtSelection: React.FC<TshirtSelectionProps> = ({ selectedTShirts, setSelectedTShirts, onNext }) => {
    
    const handleToggleTShirt = (id: string) => {
        setSelectedTShirts(prev => 
            prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
        );
    };

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8 bg-white min-h-screen">
            <div className="mb-4 text-center">
                <div className="mb-0">
                    <img src="./images/logo/redmoon_logo.png" 
                         alt="REDMOON" 
                         className="w-48 h-24 md:w-64 md:h-32 object-contain mx-auto" />
                </div>
                
                <h2 className="text-lg md:text-xl text-[#8B0909] mb-4 font-light">OFFICIAL SURVEY</h2>
                
                <p className="text-black text-sm md:text-base max-w-3xl mx-auto mb-4">
                    Join the REDMOON wardrobe. Shape MIT's fashion identity. Select your preferred designs from our curated collection of <span className="font-semibold">fifteen exclusive T-shirts</span>.
                </p>
                
                <p className="text-black text-xs md:text-sm">
                    Your selections help us create the perfect REDMOON collection for MIT.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
                {TSHIRT_DESIGNS.map(tshirt => (
                    <TshirtCard 
                        key={tshirt.id} 
                        tshirt={tshirt} 
                        isSelected={selectedTShirts.includes(tshirt.id)}
                        onToggle={handleToggleTShirt}
                    />
                ))}
            </div>

            <div className="text-center">
                <button 
                    onClick={onNext}
                    disabled={selectedTShirts.length === 0}
                    className="bg-black text-white px-8 py-4 text-lg hover:bg-gray-800 no-rounded font-thin w-full max-w-2xl small-caps disabled:opacity-50 disabled:cursor-not-allowed">
                    Finalize My Opinions
                </button>
            </div>
        </div>
    );
};

export default TshirtSelection;