
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Stage } from './types';
import type { RegistrationData, SurveyAnswers } from './types';
import Landing from './components/Landing';
import TshirtSelection from './components/TshirtSelection';
import PreferencesIntro from './components/PreferencesIntro';
import Questions from './components/Questions';
import RegistrationIntro from './components/RegistrationIntro';
import Registration from './components/Registration';
import Completed from './components/Completed';
import Loading from './components/Loading';
import { 
    trackError,
    logSurveyStart,
    submitTshirtSelection,
    logPreferencesIntroClick,
    submitQuestionAnswers,
    logRegistrationIntroClick,
    submitRegistrationData,
} from './services/api';

const App: React.FC = () => {
    const [stage, setStage] = useState<Stage>(Stage.Landing);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedTShirts, setSelectedTShirts] = useState<string[]>([]);
    const [answers, setAnswers] = useState<SurveyAnswers>({});
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        name: '',
        phone: '',
        personalEmail: '',
        universityEmail: '',
    });
    const [ipAddress, setIpAddress] = useState<string>('');

    // Use a ref to store the survey ID so it persists across re-renders without causing them.
    const surveyIdRef = useRef<string | null>(null);

    // Generate a unique survey ID and fetch IP address when the component mounts.
    useEffect(() => {
        if (!surveyIdRef.current) {
            surveyIdRef.current = `survey_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
        }

        const fetchIp = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIpAddress(data.ip);
            } catch (error) {
                console.error('Failed to fetch IP address', error);
                setIpAddress('unknown'); // Fallback
            }
        };
        fetchIp();

        // Add a global error handler to catch unhandled exceptions
        const handleError = (event: ErrorEvent) => {
            if (surveyIdRef.current) {
                trackError(surveyIdRef.current, event.message, event.error?.stack);
            }
        };
        window.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    const handleStageChange = useCallback((newStage: Stage, delay: number = 2000) => {
        setLoading(true);
        setTimeout(() => {
            setStage(newStage);
            setLoading(false);
        }, delay);
    }, []);

    const handleCompleteSurvey = useCallback(async () => {
        if (!surveyIdRef.current || !ipAddress) {
            console.error("Survey ID or IP Address not found.");
            return;
        }
        setLoading(true);

        try {
            await submitRegistrationData(ipAddress, surveyIdRef.current, registrationData);
            handleStageChange(Stage.Completed, 1000);
        } catch (error) {
            console.error("Failed to submit registration data:", error);
            trackError(surveyIdRef.current, 'RegistrationSubmissionFailed', error instanceof Error ? error.stack : String(error));
            alert("There was an error submitting your registration. Please try again.");
            setLoading(false); // Stop loading on error
        }
    }, [ipAddress, registrationData, handleStageChange]);


    const renderStage = () => {
        if (loading || (stage !== Stage.Landing && !ipAddress)) {
            return <Loading />;
        }

        switch (stage) {
            case Stage.Landing:
                return <Landing onNext={() => { 
                            if (ipAddress && surveyIdRef.current) logSurveyStart(ipAddress, surveyIdRef.current);
                            handleStageChange(Stage.TshirtSelection); 
                        }} />;
            case Stage.TshirtSelection:
                return <TshirtSelection 
                            selectedTShirts={selectedTShirts} 
                            setSelectedTShirts={setSelectedTShirts} 
                            onNext={() => {
                                if (ipAddress && surveyIdRef.current) submitTshirtSelection(ipAddress, surveyIdRef.current, selectedTShirts);
                                handleStageChange(Stage.PreferencesIntro, 2000);
                            }} 
                        />;
            case Stage.PreferencesIntro:
                return <PreferencesIntro onNext={() => {
                            if (ipAddress && surveyIdRef.current) logPreferencesIntroClick(ipAddress, surveyIdRef.current);
                            handleStageChange(Stage.Questions);
                        }} />;
            case Stage.Questions:
                return <Questions 
                            answers={answers}
                            setAnswers={setAnswers}
                            onNext={() => {
                                if (ipAddress && surveyIdRef.current) submitQuestionAnswers(ipAddress, surveyIdRef.current, answers);
                                handleStageChange(Stage.RegistrationIntro);
                            }} 
                        />;
            case Stage.RegistrationIntro:
                return <RegistrationIntro onNext={() => {
                            if (ipAddress && surveyIdRef.current) logRegistrationIntroClick(ipAddress, surveyIdRef.current);
                            handleStageChange(Stage.Registration);
                        }} />;
            case Stage.Registration:
                return <Registration 
                            registrationData={registrationData}
                            setRegistrationData={setRegistrationData}
                            onNext={handleCompleteSurvey}
                        />;
            case Stage.Completed:
                return <Completed ipAddress={ipAddress} surveyId={surveyIdRef.current} />;
            default:
                return <Landing onNext={() => {
                            if (ipAddress && surveyIdRef.current) logSurveyStart(ipAddress, surveyIdRef.current);
                            handleStageChange(Stage.TshirtSelection);
                        }} />;
        }
    };

    return (
        <div className="min-h-screen bg-white text-black">
            {renderStage()}
        </div>
    );
};

export default App;
