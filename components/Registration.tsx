
import React, { useMemo } from 'react';
import type { RegistrationData } from '../types';

interface RegistrationProps {
    registrationData: RegistrationData;
    setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
    onNext: () => Promise<void>; // Changed to support async operation
}

const Registration: React.FC<RegistrationProps> = ({ registrationData, setRegistrationData, onNext }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setRegistrationData(prev => ({...prev, [id]: value }));
    };

    const isFormValid = useMemo(() => {
        const { name, phone, personalEmail, universityEmail } = registrationData;
        const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        return (
            name.trim() !== '' &&
            phone.trim() !== '' &&
            isEmailValid(personalEmail) &&
            universityEmail.endsWith('@student.annauniv.edu') // As per placeholder
        );
    }, [registrationData]);

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8 bg-white min-h-screen">
            <div className="mb-4 text-center">
                <div className="mb-0">
                    <img src="./images/logo/redmoon_logo.png" 
                         alt="REDMOON" 
                         className="w-48 h-24 md:w-64 md:h-32 object-contain mx-auto" />
                </div>
                
                <h2 className="text-lg md:text-xl text-[#8B0909] mb-4 font-light">OFFICIAL SURVEY</h2>
                
                <p className="text-black text-sm max-w-lg mx-auto mb-4">
                    Fill this to complete your registration
                </p>
                
                <p className="text-black text-sm max-w-lg mx-auto mb-6">
                    Your <span className="font-semibold">BADGE OF COMMUNAL</span> will be sent directly to your personal email address.
                </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <label htmlFor="name" className="text-black font-light small-caps">Full Name *</label>
                    <input type="text" id="name" value={registrationData.name} onChange={handleChange} className="w-full border border-[#8B0909] bg-white text-black px-3 py-2 mt-1 no-rounded focus:border-[#8B0909] focus:ring-0" required />
                </div>

                <div>
                    <label htmlFor="phone" className="text-black font-light small-caps">Phone Number *</label>
                    <input type="tel" id="phone" value={registrationData.phone} onChange={handleChange} className="w-full border border-[#8B0909] bg-white text-black px-3 py-2 mt-1 no-rounded focus:border-[#8B0909] focus:ring-0" required />
                </div>

                <div>
                    <label htmlFor="personalEmail" className="text-black font-light small-caps">Personal Email *</label>
                    <input type="email" id="personalEmail" value={registrationData.personalEmail} onChange={handleChange} className="w-full border border-[#8B0909] bg-white text-black px-3 py-2 mt-1 no-rounded focus:border-[#8B0909] focus:ring-0" required />
                </div>

                <div>
                    <label htmlFor="universityEmail" className="text-black font-light small-caps">University Email *</label>
                    <input type="email" id="universityEmail" value={registrationData.universityEmail} onChange={handleChange} placeholder="student.annauniv.edu" className="w-full border border-[#8B0909] bg-white text-black px-3 py-2 mt-1 text-sm no-rounded focus:border-[#8B0909] focus:ring-0" required />
                </div>

                <button 
                    onClick={onNext}
                    disabled={!isFormValid}
                    className="bg-black text-white px-8 py-4 text-lg hover:bg-gray-800 no-rounded w-full font-bold small-caps disabled:opacity-50 disabled:cursor-not-allowed">
                    COMPLETE SURVEY
                </button>
            </div>
        </div>
    );
};

export default Registration;