
import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="text-center animate-pulse">
                <img 
                    src="./images/logo/loader.png" 
                    alt="REDMOON Loading" 
                    className="w-16 h-8 md:w-20 md:h-10 object-contain mx-auto"
                />
            </div>
        </div>
    );
};

export default Loading;