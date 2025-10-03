
import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import type { SurveyAnswers } from '../types';

interface QuestionsProps {
    answers: SurveyAnswers;
    setAnswers: React.Dispatch<React.SetStateAction<SurveyAnswers>>;
    onNext: () => void;
}

const ProgressBar: React.FC<{ current: number, total: number }> = ({ current, total }) => {
    return (
        <div className="grid grid-cols-8 gap-2 max-w-2xl mx-auto mb-8">
            {Array.from({ length: total }).map((_, index) => (
                <div 
                    key={index} 
                    className={`h-1 transition-colors ${index < current ? 'bg-[#8B0909]' : 'bg-black opacity-20'}`}
                ></div>
            ))}
        </div>
    );
};

const Questions: React.FC<QuestionsProps> = ({ answers, setAnswers, onNext }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [textAnswer, setTextAnswer] = useState('');
    
    const currentQuestion = QUESTIONS[currentIndex];

    const handleAnswer = (answer: string) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onNext();
        }
    };
    
    const handleTextSubmit = () => {
        if(textAnswer.trim()){
            handleAnswer(textAnswer.trim());
        }
    }

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8 bg-white min-h-screen">
            <div className="mb-4 text-center">
                <div className="mb-0">
                    <img src="./images/logo/redmoon_logo.png" 
                         alt="REDMOON" 
                         className="w-48 h-24 md:w-64 md:h-32 object-contain mx-auto" />
                </div>
                
                <h2 className="text-lg md:text-xl text-[#8B0909] mb-4 font-light">OFFICIAL SURVEY</h2>
                
                <ProgressBar current={currentIndex + 1} total={QUESTIONS.length} />
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="text-center">
                    <h3 className="text-xl md:text-2xl text-black mb-8 font-light">
                        {currentQuestion.question}
                    </h3>
                    {currentQuestion.isText ? (
                        <div className="space-y-4">
                            <textarea 
                                placeholder="Enter your answer here..."
                                value={textAnswer}
                                onChange={(e) => setTextAnswer(e.target.value)}
                                className="w-full border border-[#8B0909] bg-white text-black px-3 py-2 min-h-[120px] no-rounded focus:outline-none focus:ring-0"
                            ></textarea>
                            <button 
                                onClick={handleTextSubmit}
                                disabled={!textAnswer.trim()}
                                className="bg-black text-white px-8 py-4 hover:bg-gray-800 no-rounded w-full small-caps disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                PROCEED TO FINAL STAGE
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {currentQuestion.options.map(option => (
                                <button 
                                    key={option}
                                    onClick={() => handleAnswer(option)}
                                    className="question-option bg-black text-white px-8 py-4 hover:bg-gray-800 no-rounded w-full text-left small-caps transition-transform hover:translate-x-1"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Questions;