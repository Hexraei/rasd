
export enum Stage {
    Landing = 'LANDING',
    TshirtSelection = 'TSHIRT_SELECTION',
    PreferencesIntro = 'PREFERENCES_INTRO',
    Questions = 'QUESTIONS',
    RegistrationIntro = 'REGISTRATION_INTRO',
    Registration = 'REGISTRATION',
    Completed = 'COMPLETED',
}

export interface TshirtDesign {
    id: string;
    designName: string;
    frontImage: string;
}

export interface Question {
    id: string;
    question: string;
    options: string[];
    isText?: boolean;
}

export interface SurveyAnswers {
    [key: string]: string;
}

export interface RegistrationData {
    name: string;
    phone: string;
    personalEmail: string;
    universityEmail: string;
}
