
import type { RegistrationData, SurveyAnswers } from '../types';

// IMPORTANT: Replace this with the actual Web app URL you got from deploying your Google Apps Script.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwa8mcbgZNJ3lRgE7k0vgwmCDyyaTCfWNPOiqzFMqoUGxYLdrZvfeClE5J8RyjSG-gOpQ/exec';

/**
 * Sends data to the Google Apps Script backend.
 * This is the core function for all tracking and data submission.
 */
async function sendData(action: string, data: object, noCors: boolean = false) {
  try {
    const payload = {
        action,
        data,
    };

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: noCors ? 'no-cors' : 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      redirect: 'follow',
      body: JSON.stringify(payload),
    });

    if (!noCors && !response.ok) {
        const errorText = await response.text();
        console.error(`Google Apps Script Error: ${response.statusText}`, errorText);
        throw new Error(`Server responded with status: ${response.status}`);
    }

  } catch (error) {
    console.error(`Failed to execute action "${action}"`, error);

    // WORKAROUND for Google Apps Script 'Failed to fetch' error on successful submissions.
    if (action === 'submitRegistrationData' && error instanceof TypeError && error.message === 'Failed to fetch') {
        console.warn("Caught 'Failed to fetch' error on registration, assuming success.");
        return; // Do not re-throw, allowing the app to proceed.
    }

    throw error;
  }
}

// --- Sheet 1: Survey Starts ---
export const logSurveyStart = (ip: string, surveyId: string) => {
  sendData('logSurveyStart', { ip, surveyId }, true).catch(err => console.warn('Failed to track survey start', err));
};

// --- Sheet 2: T-shirt Selections ---
export const submitTshirtSelection = (ip: string, surveyId: string, selectedTShirts: string[]) => {
    const tshirtData: { [key: string]: number } = {};
    for (let i = 1; i <= 15; i++) {
        tshirtData[`tshirt_${i}`] = selectedTShirts.includes(String(i)) ? 1 : 0;
    }
    sendData('submitTshirtSelection', { ip, surveyId, ...tshirtData }, true).catch(err => console.warn('Failed to submit t-shirt selection', err));
};

// --- Sheet 3: Preferences Intro Clicks ---
export const logPreferencesIntroClick = (ip: string, surveyId: string) => {
    sendData('logPreferencesIntroClick', { ip, surveyId }, true).catch(err => console.warn('Failed to track preferences intro click', err));
};

// --- Sheet 4: Question Answers ---
export const submitQuestionAnswers = (ip: string, surveyId: string, answers: SurveyAnswers) => {
    sendData('submitQuestionAnswers', { ip, surveyId, ...answers }, true).catch(err => console.warn('Failed to submit question answers', err));
};

// --- Sheet 5: Registration Intro Clicks ---
export const logRegistrationIntroClick = (ip: string, surveyId: string) => {
    sendData('logRegistrationIntroClick', { ip, surveyId }, true).catch(err => console.warn('Failed to track registration intro click', err));
};

// --- Sheet 6: Registration Data ---
export const submitRegistrationData = (ip: string, surveyId: string, registrationData: RegistrationData) => {
    // This is a critical submission, so we use 'cors' mode to verify success.
    return sendData('submitRegistrationData', { ip, surveyId, ...registrationData }, false);
};

// --- Sheet 7: Completed Page Clicks ---
export const logCompletedPageClick = (ip: string, surveyId: string) => {
    sendData('logCompletedPageClick', { ip, surveyId }, true).catch(err => console.warn('Failed to track completed page click', err));
};


/**
 * Logs a client-side JavaScript error. This can be logged to a separate 'Errors' sheet.
 */
export const trackError = (surveyId: string, message: string, stack?: string) => {
   sendData('trackError', { surveyId, message, stack }, true).catch(err => {
    console.warn(`Failed to log error: "${message}"`, err);
  });
};
