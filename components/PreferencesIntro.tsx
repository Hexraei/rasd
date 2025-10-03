
import React from 'react';

interface PreferencesIntroProps {
    onNext: () => void;
}

const PreferencesIntro: React.FC<PreferencesIntroProps> = ({ onNext }) => {
    return (
        <div className="flex flex-col justify-start min-h-screen p-8 text-left bg-white relative">
            <div className="mb-12">
                <img src="./images/logo/redmoon_logo.png" 
                     alt="REDMOON" 
                     className="w-48 h-24 md:w-64 md:h-32 object-contain" />
            </div>
            
            <div className="space-y-8 max-w-2xl">
                <h1 className="text-4xl md:text-5xl text-black font-light">
                    Time to personalize it <span className="font-semibold text-[#8B0909]">even more</span>
                </h1>
                
                <div className="text-black text-sm max-w-lg space-y-4">
                    <p>
                        Please answer the 8 questions to help us create the perfect T-shirts for MIT
                    </p>
                </div>
                
                <button 
                    onClick={onNext}
                    className="text-black text-lg underline hover:no-underline bg-transparent border-none p-0 cursor-pointer small-caps tracking-wider"
                    style={{textDecoration: 'underline', textUnderlineOffset: '4px'}}>
                    ANSWER THE QUESTIONS &gt;
                </button>
            </div>
            
            <div className="absolute bottom-8 left-8 right-8">
                <p className="text-black text-sm max-w-md font-medium">
                    We value your data and privacy. All information collected is used solely to enhance our products and services.
                </p>
            </div>
        </div>
    );
};

export default PreferencesIntro;