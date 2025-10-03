
import type { TshirtDesign, Question } from './types';

export const TSHIRT_DESIGNS: TshirtDesign[] = [
    { id: '1', designName: 'Classic Black Moon', frontImage: './images/tshirts/tshirt1.png' },
    { id: '2', designName: 'White Moon Phase', frontImage: './images/tshirts/tshirt2.png' },
    { id: '3', designName: 'Gray Abstract Moon', frontImage: './images/tshirts/tshirt3.png' },
    { id: '4', designName: 'Navy Crescent', frontImage: './images/tshirts/tshirt4.png' },
    { id: '5', designName: 'Beige Minimal', frontImage: './images/tshirts/tshirt5.png' },
    { id: '6', designName: 'Midnight Eclipse', frontImage: './images/tshirts/tshirt6.png' },
    { id: '7', designName: 'Lunar Wave', frontImage: './images/tshirts/tshirt7.png' },
    { id: '8', designName: 'Cosmic Dust', frontImage: './images/tshirts/tshirt8.png' },
    { id: '9', designName: 'Solar Flare', frontImage: './images/tshirts/tshirt9.png' },
    { id: '10', designName: 'Stellar Night', frontImage: './images/tshirts/tshirt10.png' },
    { id: '11', designName: 'Aurora Glow', frontImage: './images/tshirts/tshirt11.png' },
    { id: '12', designName: 'Twilight Shadow', frontImage: './images/tshirts/tshirt12.png' },
    { id: '13', designName: 'Dawn Breaker', frontImage: './images/tshirts/tshirt13.png' },
    { id: '14', designName: 'Dusk Horizon', frontImage: './images/tshirts/tshirt14.png' },
    { id: '15', designName: 'Moonlight Sonata', frontImage: './images/tshirts/tshirt15.png' }
];

export const QUESTIONS: Question[] = [
    {
        id: 'fit',
        question: 'Which fit do you like?',
        options: ['Oversized', 'Regular', 'Slim', 'Free size']
    },
    {
        id: 'colors',
        question: 'Which colors do you wear most often?',
        options: ['Black / White', 'Bright', 'Light', 'Dark']
    },
    {
        id: 'design',
        question: 'What type of T-shirt designs do you like?',
        options: ['Simple', 'Graphics', 'Text', 'Plain']
    },
    {
        id: 'buyingReasons',
        question: 'What is the biggest reason not to buy T-shirts online?',
        options: ['Price', 'Not sure on size/fit', 'Fabric quality doubts', 'Designs not my vibe', 'Shipping/returns']
    },
    {
        id: 'frequency',
        question: 'How often do you buy T-shirts?',
        options: ['Monthly', 'Every 2–3 months', 'Few times a year', 'Rarely']
    },
    {
        id: 'priorities',
        question: 'What matters most in a T-shirt?',
        options: ['Comfort', 'Strong', 'Cool Design', 'Daily Use']
    },
    {
        id: 'size',
        question: 'What is your usual size?',
        options: ['XS', 'S', 'M', 'L', 'XL', '2XL+']
    },
    {
        id: 'purchaseFactors',
        question: 'When you walk into a store and want to buy a T-shirt, what are the things that you look for?',
        options: [],
        isText: true
    }
];