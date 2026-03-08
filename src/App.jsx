import React, { useState, useEffect, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { europeData, getRandomFunFact, getCountryForCapital, wikiSearchTerms } from './data/europeData';

// Unit 3 woordenlijst - Engels leermodule (winkelen & kleding)
const defaultWords = [
  { dutch: 'badpak', english: 'bathing suit', sentence: 'The girl puts on her bathing suit and swims in the water.', emoji: '👙' },
  { dutch: 'goedkoop', english: 'cheap', sentence: "The skateboard only costs 10 euros, that's cheap!", emoji: '💸' },
  { dutch: 'warenhuis', english: 'department store', sentence: 'This department store has a lot of floors.', emoji: '🏬' },
  { dutch: 'roltrap', english: 'escalator', sentence: 'There are a lot of people on the escalator.', emoji: '🛗' },
  { dutch: 'duur', english: 'expensive', sentence: 'Gold and diamonds are very expensive.', emoji: '💎' },
  { dutch: 'eerste verdieping', english: 'first floor', sentence: 'On the first floor there are a lot of shops.', emoji: '1️⃣' },
  { dutch: 'pashokje', english: 'fitting room', sentence: 'She wants to try on the clothes in the fitting room.', emoji: '🪞' },
  { dutch: 'trui met capuchon', english: 'hoodie', sentence: "I put on my hoodie when it's cold.", emoji: '🧥' },
  { dutch: 'kleding', english: 'outfit', sentence: 'My best friend bought a colourful outfit for next winter.', emoji: '👗' },
  { dutch: '(broek)zak', english: 'pocket', sentence: "Don't lose your phone if you put it in your pocket!", emoji: '👖' },
  { dutch: 'artikel', english: 'product', sentence: 'What products do they sell in this shop? Sweets!', emoji: '🛍️' },
  { dutch: '(kassa)bon', english: 'receipt', sentence: 'On the receipt is the price of the hoodie: 40 euros.', emoji: '🧾' },
  { dutch: 'geld terug', english: 'refund', sentence: 'The dress is too big. I would like a refund.', emoji: '💰' },
  { dutch: 'uitverkoop', english: 'sale', sentence: 'The expensive shoes are in the sale: only 20 euros.', emoji: '🏷️' },
  { dutch: 'tweede verdieping', english: 'second floor', sentence: 'There is a restaurant on the second floor.', emoji: '2️⃣' },
  { dutch: 'schoenmaat', english: 'shoe size', sentence: "My sister's shoe size is 16, mine is 35 and my dad's is 45!", emoji: '👟' },
  { dutch: 'mouw', english: 'sleeve', sentence: "My sleeves are too long: I can't see my hands.", emoji: '👕' },
  { dutch: 'aanbieding', english: 'special offer', sentence: "Today's special offer is two for the price of one!", emoji: '🎉' },
  { dutch: 'zwembroek', english: 'swimming trunks', sentence: 'These are my favourite swimming trunks.', emoji: '🩲' },
  { dutch: 'trainingspak', english: 'tracksuit', sentence: 'I do football training in my tracksuit.', emoji: '🏃' },
  { dutch: 'rits', english: 'zipper', sentence: "It's cold outside. Do up your zipper.", emoji: '🤐' },
  { dutch: 'omkleden', english: 'to change', sentence: "Your shirt is dirty. You'll have to change it.", emoji: '🔄' },
  { dutch: 'etalages kijken', english: 'to go window shopping', sentence: 'They never buy anything, they just go window shopping.', emoji: '🪟' },
  { dutch: 'aantrekken', english: 'to put on', sentence: "I'm putting on my shoes.", emoji: '🥿' },
  { dutch: 'uitdoen', english: 'to take off', sentence: "I'm taking off my sweater, it's too hot.", emoji: '♨️' },
  { dutch: 'passen', english: 'to try on', sentence: 'The girl wants to try on the red shirt.', emoji: '🪄' },
  { dutch: 'Het is te kort/lang/wijd/strak.', english: 'It is too short/long/big/tight.', sentence: 'These trousers are too big.', emoji: '📏' },
  { dutch: 'Ik neem hem.', english: 'I will take it.', sentence: 'Is this book only 5 euros? I will take it!', emoji: '🛒' },
  { dutch: 'Mag ik alstublieft ...?', english: 'May I have ...?', sentence: 'May I have the red tracksuit, please?', emoji: '🙋' },
  { dutch: 'Welke maat heb je?', english: 'What size are you?', sentence: 'What shoe size are you? I am size 39.', emoji: '📐' },
  { dutch: 'badkoets, strandkoets', english: 'bathing machine', sentence: 'People used to ride into the sea in a bathing machine.', emoji: '🏖️' },
  { dutch: 'netjes, fatsoenlijk', english: 'decent', sentence: "This bathing suit was decent in the 1920's.", emoji: '😇' },
  { dutch: 'bruin worden', english: 'to tan', sentence: 'Some people love to get a tan at the beach.', emoji: '☀️' },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Confetti = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA'];
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 2, color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360, size: 8 + Math.random() * 8,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((p) => (
        <div key={p.id} className="absolute rounded-sm" style={{
          left: `${p.left}%`, top: '-20px', backgroundColor: p.color,
          width: p.size, height: p.size,
          transform: `rotate(${p.rotation}deg)`,
          animation: `confettiFall ${p.duration}s ease-out ${p.delay}s forwards`,
        }} />
      ))}
    </div>
  );
};

const BigButton = ({ onClick, children, color, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full max-w-md py-6 px-8 text-white text-2xl font-bold rounded-3xl shadow-xl 
    active:scale-95 transition-all duration-150 flex items-center justify-center gap-4 
    ${color} ${className}`}
    style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive', minHeight: '80px', touchAction: 'manipulation' }}
  >
    {children}
  </button>
);

const Calculator = ({ onBack }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [memoryIndicator, setMemoryIndicator] = useState(false);
  const [isInverted, setIsInverted] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setMemory(0);
    setMemoryIndicator(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      case 'x²':
        return Math.pow(secondValue, 2);
      case '√':
        return Math.sqrt(secondValue);
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const toggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };

  const inputPercent = () => {
    const newValue = parseFloat(display) / 100;
    setDisplay(String(newValue));
  };

  const calculateSquare = () => {
    const value = parseFloat(display);
    const result = Math.pow(value, 2);
    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const calculateSquareRoot = () => {
    const value = parseFloat(display);
    if (value < 0) {
      setDisplay('Error');
      setWaitingForOperand(true);
      return;
    }
    const result = Math.sqrt(value);
    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  // Memory functions
  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  };

  const memoryPlus = () => {
    const newValue = memory + parseFloat(display);
    setMemory(newValue);
    setMemoryIndicator(true);
    setWaitingForOperand(true);
  };

  const memoryMinus = () => {
    const newValue = memory - parseFloat(display);
    setMemory(newValue);
    setMemoryIndicator(true);
    setWaitingForOperand(true);
  };

  const memoryStore = () => {
    setMemory(parseFloat(display));
    setMemoryIndicator(true);
    setWaitingForOperand(true);
  };

  const memoryClear = () => {
    setMemory(0);
    setMemoryIndicator(false);
  };

  // Format display for classic Casio look
  const formatDisplay = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '0';
    
    // For very large numbers, use scientific notation
    if (Math.abs(num) >= 999999999) {
      return num.toExponential(2);
    }
    
    // For numbers with many decimal places, limit to 10 digits total
    if (value.length > 10) {
      return num.toFixed(10 - Math.floor(Math.log10(Math.abs(num))) - 1);
    }
    
    return value;
  };

  // Convert numbers to 7-segment display style
  const toSevenSegment = (value) => {
    // 7-segment bit patterns (a,b,c,d,e,f,g segments)
    const segmentPatterns = {
      '0': [1,1,1,1,1,1,0], // a,b,c,d,e,f
      '1': [0,1,1,0,0,0,0], // b,c
      '2': [1,1,0,1,1,0,1], // a,b,d,e,g
      '3': [1,1,1,1,0,0,1], // a,b,c,d,g
      '4': [0,1,1,0,0,1,1], // b,c,f,g
      '5': [1,0,1,1,0,1,1], // a,c,d,f,g
      '6': [1,0,1,1,1,1,1], // a,c,d,e,f,g
      '7': [1,1,1,0,0,0,0], // a,b,c
      '8': [1,1,1,1,1,1,1], // all segments
      '9': [1,1,1,1,0,1,1], // a,b,c,d,f,g
      '.': [0,0,0,0,0,0,0], // special case for decimal
      '-': [0,0,0,0,0,0,1], // g segment only
      'E': [1,0,0,1,1,1,1], // a,d,e,f,g
      'r': [0,0,0,0,0,0,0], // empty
      'o': [0,0,0,1,1,1,0], // d,e,f
      ' ': [0,0,0,0,0,0,0], // empty
      'h': [0,0,1,0,0,1,1], // c,f,g
      'L': [0,0,0,1,1,1,0], // d,e,f
      'b': [0,0,1,1,1,1,0], // c,d,e,f
      'S': [1,0,1,1,0,1,1], // a,c,d,f,g
      'g': [1,0,1,1,1,1,1], // a,c,d,e,f,g
      'I': [0,1,1,0,0,0,0]  // b,c
    };
    
    return value.split('').map(char => {
      const segments = segmentPatterns[char] || [0,0,0,0,0,0,0];
      return { char, segments };
    });
  };

  // Function to create word from display (calculator spelling)
  const createWord = () => {
    const number = parseFloat(display);
    if (isNaN(number)) return '';
    
    // Common calculator word mappings
    const wordMap = {
      0.7734: 'hELLO',
      0.5537: 'bLESS',
      0.5318: 'bILES',
      0.7104: 'hOLE',
      0.708: 'hOGE',
      0.808: 'hOBE',
      0.733: 'bEEL',
      0.379: 'gLbE',
      0.37186: 'gLbIEh',
      0.4516: 'hISh',
      0.354: 'hSLE',
      0.5637: 'LbEhS',
      0.7714: 'hILL',
      0.53163: 'bILEh',
      0.376: 'gLbE',
      0.371: 'gLbI',
      0.531773: 'bILEhS',
      0.7734: 'hELLO',
      0.31337: 'bEELb',
      0.58008: 'hOOES',
      0.3085: 'hOLES',
      0.607: 'hOGE',
      0.708: 'hOGE',
      0.53045: 'hOLES',
      0.5318: 'bILES',
      0.5537: 'bLESS',
      0.37186: 'gLbIEh',
      0.53163: 'bILEh',
      0.531773: 'bILEhS',
      0.7734: 'hELLO',
      0.31337: 'bEELb'
    };
    
    return wordMap[number] || '';
  };

  // Get display text based on inversion state
  const getDisplayText = () => {
    const formatted = formatDisplay(display);
    if (isInverted) {
      const word = createWord();
      return word || formatted;
    }
    return formatted;
  };

  return (
    <div className="screen-scroll safe-area-pad bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center p-6">
      <BackButton onClick={onBack} color="text-gray-400" />
      
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-black text-gray-300 mb-2" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
            🧮 Segment Rekenmachine
          </h2>
          <p className="text-lg text-gray-500">7-segment display met woordmodus</p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl border-4 border-gray-600 overflow-hidden">
          {/* Display */}
          <div className="bg-gray-900 p-6 border-b-4 border-gray-700">
            <div className="bg-black rounded-xl p-4">
              {/* Memory indicator and mode */}
              <div className="flex justify-between items-start mb-2">
                <div className="text-red-500 font-mono text-sm font-bold" style={{ fontFamily: 'Courier New, monospace' }}>
                  {memoryIndicator && 'M'}
                </div>
                <div className="flex gap-2">
                  <div className="text-gray-500 font-mono text-xs" style={{ fontFamily: 'Courier New, monospace' }}>
                    DEG
                  </div>
                  {isInverted && (
                    <div className="text-orange-400 font-mono text-xs font-bold" style={{ fontFamily: 'Courier New, monospace' }}>
                      WORD
                    </div>
                  )}
                </div>
              </div>
              {/* Main display with 7-segment style */}
              <div 
                style={{ 
                  minHeight: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  transform: isInverted ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease-in-out',
                  gap: '8px'
                }}
              >
                {toSevenSegment(getDisplayText()).map((digit, index) => (
                  <div key={index} style={{ position: 'relative', width: '40px', height: '60px' }}>
                    {/* Decimal point */}
                    {digit.char === '.' && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '5px',
                          right: '5px',
                          width: '8px',
                          height: '8px',
                          backgroundColor: isInverted ? '#fb923c' : '#ef4444',
                          borderRadius: '50%',
                          boxShadow: isInverted 
                            ? '0 0 8px rgba(251, 146, 60, 0.8)' 
                            : '0 0 8px rgba(239, 68, 68, 0.8)'
                        }}
                      />
                    )}
                    {/* 7-segment display */}
                    {digit.char !== '.' && (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        {/* Segment a - top */}
                        {digit.segments[0] && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '0',
                              left: '5px',
                              right: '5px',
                              height: '6px',
                              backgroundColor: isInverted ? '#fb923c' : '#ef4444',
                              boxShadow: isInverted 
                                ? '0 0 8px rgba(251, 146, 60, 0.8)' 
                                : '0 0 8px rgba(239, 68, 68, 0.8)'
                            }}
                          />
                        )}
                        {/* Segment b - top right */}
                        {digit.segments[1] && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '5px',
                              right: '0',
                              width: '6px',
                              height: '20px',
                              backgroundColor: isInverted ? '#fb923c' : '#ef4444',
                              boxShadow: isInverted 
                                ? '0 0 8px rgba(251, 146, 60, 0.8)' 
                                : '0 0 8px rgba(239, 68, 68, 0.8)'
                            }}
                          />
                        )}
                        {/* Segment c - bottom right */}
                        {digit.segments[2] && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '5px',
                              right: '0',
                              width: '6px',
                              height: '20px',
                              backgroundColor: isInverted ? '#fb923c' : '#ef4444',
                              boxShadow: isInverted 
                                ? '0 0 8px rgba(251, 146, 60, 0.8)' 
                                : '0 0 8px rgba(239, 68, 68, 0.8)'
                            }}
                          />
                        )}
                        {/* Segment d - bottom */}
                        {digit.segments[3] && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '0',
                              left: '5px',
                              right: '5px',
                              height: '6px',
                              backgroundColor: isInverted ? '#fb923c' : '#ef4444',
                              boxShadow: isInverted 
                                ? '0 0 8px rgba(251, 146, 60, 0.8)' 
                                : '0 0 8px rgba(239, 68, 68, 0.8)'
                            }}
                          />
                        )}
                        {/* Segment e - bottom left */}
                        {digit.segments[4] && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '5px',
                              left: '0',
                              width: '6px',
                              height: '20px',
                              backgroundColor: isInverted ? '#fb923c' : '#ef4444',
                              boxShadow: isInverted 
                                ? '0 0 8px rgba(251, 146, 60, 0.8)' 
                                : '0 0 8px rgba(239, 68, 68, 0.8)'
                            }}
                          />
                        )}
                        {/* Segment f - top left */}
                        {digit.segments[5] && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '5px',
                              left: '0',
                              width: '6px',
                              height: '20px',
                              backgroundColor: isInverted ? '#fb923c' : '#ef4444',
                              boxShadow: isInverted 
                                ? '0 0 8px rgba(251, 146, 60, 0.8)' 
                                : '0 0 8px rgba(239, 68, 68, 0.8)'
                            }}
                          />
                        )}
                        {/* Segment g - middle */}
                        {digit.segments[6] && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '27px',
                              left: '5px',
                              right: '5px',
                              height: '6px',
                              backgroundColor: isInverted ? '#fb923c' : '#ef4444',
                              boxShadow: isInverted 
                                ? '0 0 8px rgba(251, 146, 60, 0.8)' 
                                : '0 0 8px rgba(239, 68, 68, 0.8)'
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Word hint when inverted */}
              {isInverted && createWord() && (
                <div className="text-orange-300 font-mono text-xs text-center mt-2" style={{ fontFamily: 'Courier New, monospace' }}>
                  {createWord()}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="p-3 bg-gray-800">
            <div className="grid grid-cols-5 gap-2">
              {/* Row 1 - Memory functions */}
              <button
                onClick={memoryRecall}
                className="bg-gray-600 hover:bg-gray-500 text-white text-sm font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                MR
              </button>
              <button
                onClick={memoryPlus}
                className="bg-gray-600 hover:bg-gray-500 text-white text-sm font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                M+
              </button>
              <button
                onClick={memoryMinus}
                className="bg-gray-600 hover:bg-gray-500 text-white text-sm font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                M-
              </button>
              <button
                onClick={memoryStore}
                className="bg-gray-600 hover:bg-gray-500 text-white text-sm font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                MS
              </button>
              <button
                onClick={memoryClear}
                className="bg-gray-600 hover:bg-gray-500 text-white text-sm font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                MC
              </button>

              {/* Row 2 */}
              <button
                onClick={clearAll}
                className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                AC
              </button>
              <button
                onClick={clear}
                className="bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                C
              </button>
              <button
                onClick={() => performOperation('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                ÷
              </button>
              <button
                onClick={calculateSquareRoot}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                √
              </button>
              <button
                onClick={calculateSquare}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                x²
              </button>

              {/* Row 3 */}
              <button
                onClick={() => inputNumber(7)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                7
              </button>
              <button
                onClick={() => inputNumber(8)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                8
              </button>
              <button
                onClick={() => inputNumber(9)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                9
              </button>
              <button
                onClick={() => performOperation('*')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                ×
              </button>
              <button
                onClick={() => inputPercent()}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                %
              </button>

              {/* Row 4 */}
              <button
                onClick={() => inputNumber(4)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                4
              </button>
              <button
                onClick={() => inputNumber(5)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                5
              </button>
              <button
                onClick={() => inputNumber(6)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                6
              </button>
              <button
                onClick={() => performOperation('-')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                −
              </button>
              <button
                onClick={toggleSign}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                +/−
              </button>

              {/* Row 5 */}
              <button
                onClick={() => inputNumber(1)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                1
              </button>
              <button
                onClick={() => inputNumber(2)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                2
              </button>
              <button
                onClick={() => inputNumber(3)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                3
              </button>
              <button
                onClick={() => performOperation('+')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                +
              </button>
              <button
                onClick={() => performOperation('=')}
                className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                =
              </button>

              {/* Row 6 */}
              <button
                onClick={() => inputNumber(0)}
                className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                0
              </button>
              <button
                onClick={inputDecimal}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                .
              </button>
              <button
                onClick={() => setIsInverted(!isInverted)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold rounded-xl py-4 active:scale-95 transition-all shadow"
                style={{ touchAction: 'manipulation', minHeight: '60px', fontFamily: 'Courier New, monospace' }}
              >
                {isInverted ? 'NORM' : 'WORD'}
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p className="mb-2">📱 7-segment display stijl</p>
          <p>🔄 WORD knop keert display om voor woorden</p>
          <p>📝 Probeer: 0.7734 → hELLO</p>
          <p>🧠 Geheugenfuncties: MR, M+, M-, MS, MC</p>
        </div>
      </div>
    </div>
  );
};

const StartScreen = ({ onStart }) => (
  <div className="screen-scroll safe-area-pad bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 flex items-center justify-center p-8">
    <div className="text-center w-full max-w-lg">
      <div className="mb-8">
        <span className="text-9xl block animate-bounce">📚</span>
      </div>
      <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 mb-4"
          style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
        Leer App
      </h1>
      <p className="text-2xl text-orange-700 mb-10" style={{ fontFamily: 'Nunito, sans-serif' }}>
        Kies wat je wilt oefenen!
      </p>

      <div className="space-y-6 flex flex-col items-center">
        <BigButton onClick={() => onStart('english-menu')} color="bg-gradient-to-r from-blue-500 to-indigo-600">
          <span className="text-4xl">🇬🇧</span> Engels Leren
        </BigButton>

        <BigButton onClick={() => onStart('europe')} color="bg-gradient-to-r from-slate-600 to-emerald-700">
          <span className="text-4xl">🗺️</span> Europe Explorer
        </BigButton>

        <BigButton onClick={() => onStart('calculator')} color="bg-gradient-to-r from-gray-600 to-gray-800">
          <span className="text-4xl">🧮</span> Rekenmachine
        </BigButton>
      </div>
    </div>
  </div>
);

const EnglishMenu = ({ onStart, onBack, onManageWords }) => (
  <div className="screen-scroll safe-area-pad bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center p-8">
    <BackButton onClick={onBack} color="text-indigo-600" />
    <div className="text-center w-full max-w-lg">
      <div className="mb-6">
        <span className="text-8xl block">🇬🇧</span>
      </div>
      <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-2"
          style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
        Engels Leren
      </h1>
      <p className="text-xl text-indigo-600 mb-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
        Unit 2 - Oefen je woordjes!
      </p>

      <div className="space-y-4 flex flex-col items-center">
        <BigButton onClick={() => onStart('learn')} color="bg-gradient-to-r from-emerald-400 to-teal-500">
          <span className="text-4xl">🎓</span> Leren
        </BigButton>

        <BigButton onClick={() => onStart('practice-nl-en')} color="bg-gradient-to-r from-blue-400 to-indigo-500">
          <span className="text-3xl">🇳🇱➡️🇬🇧</span> NL → EN
        </BigButton>

        <BigButton onClick={() => onStart('practice-en-nl')} color="bg-gradient-to-r from-indigo-400 to-purple-500">
          <span className="text-3xl">🇬🇧➡️🇳🇱</span> EN → NL
        </BigButton>

        <BigButton onClick={() => onStart('sentences')} color="bg-gradient-to-r from-pink-400 to-rose-500">
          <span className="text-4xl">✍️</span> Zinnen Maken
        </BigButton>

        <BigButton onClick={() => onStart('test')} color="bg-gradient-to-r from-amber-400 to-orange-500">
          <span className="text-4xl">🏆</span> Overhoren
        </BigButton>

        <button
          onClick={onManageWords}
          className="w-full max-w-md py-4 px-8 bg-white/80 text-indigo-600 text-xl font-bold rounded-3xl shadow-lg
          active:scale-95 transition-all border-3 border-indigo-200 mt-4 flex items-center justify-center gap-3"
          style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive', minHeight: '70px', touchAction: 'manipulation' }}
        >
          <span className="text-3xl">⚙️</span> Woordjes Beheren
        </button>
      </div>
    </div>
  </div>
);

const BackButton = ({ onClick, color = 'text-teal-600' }) => (
  <button 
    onClick={onClick} 
    className={`absolute top-6 left-6 px-6 py-4 bg-white/90 ${color} font-bold rounded-2xl shadow-lg 
    active:scale-95 transition-all text-xl flex items-center gap-2`}
    style={{ fontFamily: 'Nunito, sans-serif', touchAction: 'manipulation' }}
  >
    <span className="text-2xl">←</span> Terug
  </button>
);

const LearnMode = ({ words, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [direction, setDirection] = useState('nl-en');
  
  useEffect(() => { 
    setShuffledWords(shuffleArray(words)); 
  }, [words]);
  
  if (shuffledWords.length === 0) return null;
  
  const currentWord = shuffledWords[currentIndex];
  const nextCard = () => { 
    setIsFlipped(false); 
    setTimeout(() => setCurrentIndex((p) => (p + 1) % shuffledWords.length), 200); 
  };
  const prevCard = () => { 
    setIsFlipped(false); 
    setTimeout(() => setCurrentIndex((p) => (p - 1 + shuffledWords.length) % shuffledWords.length), 200); 
  };
  
  return (
    <div className="screen-scroll safe-area-pad bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 flex flex-col items-center justify-center p-6">
      <BackButton onClick={onBack} color="text-teal-600" />
      
      <div className="text-center mb-6">
        <h2 className="text-4xl font-black text-teal-600 mb-2" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
          🎓 Leren
        </h2>
        <p className="text-xl text-teal-500 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Tik op de kaart om te draaien
        </p>
        <button 
          onClick={() => { setDirection(d => d === 'nl-en' ? 'en-nl' : 'nl-en'); setIsFlipped(false); }} 
          className="px-8 py-4 bg-teal-500 text-white rounded-full text-xl font-bold shadow-lg active:scale-95 transition-all"
          style={{ touchAction: 'manipulation' }}
        >
          {direction === 'nl-en' ? '🇳🇱 → 🇬🇧' : '🇬🇧 → 🇳🇱'}
        </button>
      </div>

      <div className="relative w-96 h-80 mb-8" style={{ perspective: '1000px', maxWidth: '90vw' }}>
        <div 
          onClick={() => setIsFlipped(!isFlipped)} 
          className="w-full h-full cursor-pointer transition-transform duration-500"
          style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', touchAction: 'manipulation' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-teal-50 rounded-3xl shadow-2xl flex flex-col items-center justify-center border-4 border-teal-200 p-6" style={{ backfaceVisibility: 'hidden' }}>
            <span className="text-7xl mb-4">{currentWord.emoji}</span>
            <span className="text-3xl mb-2">{direction === 'nl-en' ? '🇳🇱' : '🇬🇧'}</span>
            <p className="text-3xl font-bold text-teal-700 text-center" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
              {direction === 'nl-en' ? currentWord.dutch : currentWord.english}
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white to-emerald-50 rounded-3xl shadow-2xl flex flex-col items-center justify-center border-4 border-emerald-300 p-6" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <span className="text-6xl mb-3">{currentWord.emoji}</span>
            <span className="text-2xl mb-2">{direction === 'nl-en' ? '🇬🇧' : '🇳🇱'}</span>
            <p className="text-2xl font-bold text-emerald-600 text-center mb-4" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
              {direction === 'nl-en' ? currentWord.english : currentWord.dutch}
            </p>
            <p className="text-lg text-emerald-500 text-center italic px-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              "{currentWord.sentence}"
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <button onClick={prevCard} className="w-20 h-20 bg-white/90 text-teal-600 text-4xl font-bold rounded-full shadow-xl active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>←</button>
        <span className="text-2xl text-teal-600 font-bold px-4" style={{ fontFamily: 'Nunito, sans-serif' }}>{currentIndex + 1} / {shuffledWords.length}</span>
        <button onClick={nextCard} className="w-20 h-20 bg-white/90 text-teal-600 text-4xl font-bold rounded-full shadow-xl active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>→</button>
      </div>
    </div>
  );
};

const PracticeMode = ({ words, onBack, direction }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [shuffledWords, setShuffledWords] = useState([]);
  const isNlToEn = direction === 'nl-en';
  
  useEffect(() => { setShuffledWords(shuffleArray(words)); }, [words]);
  if (shuffledWords.length === 0) return null;
  
  const currentWord = shuffledWords[currentIndex];
  const questionWord = isNlToEn ? currentWord.dutch : currentWord.english;
  const answerWord = isNlToEn ? currentWord.english : currentWord.dutch;
  
  const checkAnswer = () => {
    const userAnswer = input.toLowerCase().trim();
    const correctAnswers = answerWord.toLowerCase().split(',').map(a => a.trim());
    
    // Add special handling for België - accept both with and without dots
    const normalizedCorrectAnswers = correctAnswers.map(answer => {
      if (answer === 'belgië') return ['belgië', 'belgie'];
      return [answer];
    }).flat();
    
    const isCorrect = normalizedCorrectAnswers.some(answer => userAnswer === answer);
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setTimeout(() => { setInput(''); setShowHint(false); setFeedback(null); setCurrentIndex((p) => (p + 1) % shuffledWords.length); }, 1500);
  };
  
  const getHint = () => { const word = answerWord.split(',')[0].trim(); const len = Math.ceil(word.length / 2); return word.substring(0, len) + '_'.repeat(word.length - len); };
  const skipWord = () => { setInput(''); setShowHint(false); setFeedback(null); setCurrentIndex((p) => (p + 1) % shuffledWords.length); };
  
  const bgColor = isNlToEn ? 'from-blue-100 via-indigo-50 to-purple-100' : 'from-purple-100 via-pink-50 to-rose-100';
  const textColor = isNlToEn ? 'text-indigo-600' : 'text-purple-600';
  const borderColor = isNlToEn ? 'border-indigo-200' : 'border-purple-200';
  
  return (
    <div className={`screen-scroll safe-area-pad bg-gradient-to-br ${bgColor} flex flex-col items-center justify-center p-6`}>
      <BackButton onClick={onBack} color={textColor} />
      
      <div className="text-center mb-6">
        <h2 className={`text-4xl font-black ${textColor} mb-2`} style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
          {isNlToEn ? '🇳🇱 → 🇬🇧' : '🇬🇧 → 🇳🇱'} Oefenen
        </h2>
        <p className={`text-xl ${isNlToEn ? 'text-indigo-500' : 'text-purple-500'}`}>
          {isNlToEn ? 'Typ het Engelse woord' : 'Typ het Nederlandse woord'}
        </p>
      </div>

      <div className={`bg-white/95 rounded-3xl shadow-2xl p-8 w-full max-w-lg border-4 ${borderColor}`}>
        <div className="text-center mb-6">
          <span className="text-6xl mb-4 block">{currentWord.emoji}</span>
          <div className={`inline-block px-5 py-2 rounded-full text-lg font-bold mb-4 ${isNlToEn ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
            {isNlToEn ? '🇳🇱 → 🇬🇧' : '🇬🇧 → 🇳🇱'}
          </div>
          <p className="text-3xl font-bold text-orange-700" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>{questionWord}</p>
        </div>

        {showHint && (
          <div className="text-center mb-4 p-4 bg-amber-100 rounded-2xl">
            <p className="text-xl text-amber-700">💡 Hint: <span className="font-bold font-mono text-2xl">{getHint()}</span></p>
          </div>
        )}

        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()} 
          placeholder={isNlToEn ? "Typ Engels..." : "Typ Nederlands..."}
          className={`w-full text-2xl p-5 rounded-2xl border-4 text-center font-bold mb-4 ${
            feedback === 'correct' ? 'border-green-400 bg-green-50' : 
            feedback === 'wrong' ? 'border-red-400 bg-red-50' : 
            borderColor
          }`}
          style={{ fontSize: '24px', touchAction: 'manipulation' }}
          autoFocus 
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        {feedback === 'correct' && (
          <div className="text-center mb-4">
            <span className="text-6xl">🎉</span>
            <p className="text-2xl font-bold text-green-600">Super goed!</p>
          </div>
        )}
        
        {feedback === 'wrong' && (
          <div className="text-center mb-4">
            <p className="text-xl text-red-500">Probeer nog eens! Antwoord: <span className="font-bold">{answerWord}</span></p>
          </div>
        )}

        <div className="flex gap-3">
          {!showHint && (
            <button onClick={() => setShowHint(true)} className="flex-1 py-5 px-4 bg-amber-400 text-white font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>
              💡 Hint
            </button>
          )}
          <button onClick={checkAnswer} className={`flex-1 py-5 px-4 bg-gradient-to-r ${isNlToEn ? 'from-indigo-500 to-purple-500' : 'from-purple-500 to-pink-500'} text-white font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all`} style={{ touchAction: 'manipulation' }}>
            ✓ Check
          </button>
          <button onClick={skipWord} className="py-5 px-6 bg-gray-300 text-gray-600 font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>
            →
          </button>
        </div>
      </div>

      <p className={`mt-6 text-xl ${isNlToEn ? 'text-indigo-500' : 'text-purple-500'}`}>
        Woord {currentIndex + 1} van {shuffledWords.length}
      </p>
    </div>
  );
};

const SentenceMode = ({ words, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showExample, setShowExample] = useState(false);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [completedSentences, setCompletedSentences] = useState([]);
  
  useEffect(() => { 
    const good = words.filter(w => !w.english.includes('?') && !w.english.includes('...')); 
    setShuffledWords(shuffleArray(good)); 
  }, [words]);
  
  if (shuffledWords.length === 0) return null;
  const currentWord = shuffledWords[currentIndex];
  
  const checkSentence = () => {
    const sentence = input.trim().toLowerCase();
    const word = currentWord.english.toLowerCase();
    const containsWord = sentence.includes(word) || word.split(',').some(w => sentence.includes(w.trim()));
    const originalInput = input.trim();
    const wordCount = originalInput.split(/\s+/).length;
    const hasProperEnding = /[.!?]$/.test(originalInput);
    const isValidSentence = wordCount >= 3 && hasProperEnding;
    
    if (containsWord && isValidSentence) {
      setFeedback('correct');
      setCompletedSentences([...completedSentences, { word: currentWord.english, sentence: originalInput }]);
      setTimeout(() => { 
        if (currentIndex + 1 < shuffledWords.length) { 
          setCurrentIndex(currentIndex + 1); 
          setInput(''); 
          setFeedback(null); 
          setShowExample(false); 
        } else { 
          setFeedback('finished'); 
        } 
      }, 1500);
    } else { 
      setFeedback(!containsWord ? 'missing-word' : 'invalid-sentence'); 
    }
  };
  
  const skipWord = () => { setInput(''); setFeedback(null); setShowExample(false); setCurrentIndex((p) => (p + 1) % shuffledWords.length); };
  
  if (feedback === 'finished') {
    return (
      <div className="screen-scroll safe-area-pad bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 flex flex-col items-center justify-center p-6">
        <Confetti />
        <div className="bg-white/95 rounded-3xl shadow-2xl p-8 w-full max-w-lg border-4 border-pink-200 text-center">
          <span className="text-8xl mb-6 block">🎉</span>
          <h2 className="text-4xl font-black text-pink-600 mb-4" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>Geweldig!</h2>
          <p className="text-2xl text-pink-500 mb-6">Je hebt {completedSentences.length} zinnen gemaakt!</p>
          <div className="max-h-60 overflow-y-auto text-left mb-6">
            {completedSentences.map((item, idx) => (
              <div key={idx} className="p-4 bg-pink-50 rounded-2xl mb-3">
                <p className="text-sm text-pink-400 font-bold">{item.word}</p>
                <p className="text-lg text-pink-700">{item.sentence}</p>
              </div>
            ))}
          </div>
          <button onClick={onBack} className="w-full py-5 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>
            ← Terug naar menu
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="screen-scroll safe-area-pad bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 flex flex-col items-center justify-center p-6">
      <BackButton onClick={onBack} color="text-pink-600" />
      
      <div className="text-center mb-6">
        <h2 className="text-4xl font-black text-pink-600 mb-2" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>✍️ Zinnen Maken</h2>
        <p className="text-xl text-pink-500">Maak een Engelse zin met dit woord</p>
      </div>

      <div className="bg-white/95 rounded-3xl shadow-2xl p-8 w-full max-w-lg border-4 border-pink-200">
        <div className="text-center mb-6">
          <span className="text-6xl mb-4 block">{currentWord.emoji}</span>
          <div className="bg-pink-100 rounded-2xl p-4 mb-4">
            <p className="text-lg text-pink-400 mb-1">🇳🇱 {currentWord.dutch}</p>
            <p className="text-2xl font-bold text-pink-700" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>🇬🇧 {currentWord.english}</p>
          </div>
        </div>

        {showExample && (
          <div className="text-center mb-4 p-4 bg-amber-100 rounded-2xl">
            <p className="text-sm text-amber-600 mb-1">💡 Voorbeeld:</p>
            <p className="text-lg text-amber-700 italic font-bold">"{currentWord.sentence}"</p>
          </div>
        )}

        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Schrijf hier je Engelse zin..." 
          rows={3}
          className={`w-full text-xl p-4 rounded-2xl border-4 resize-none mb-4 ${
            feedback === 'correct' ? 'border-green-400 bg-green-50' : 
            feedback === 'missing-word' || feedback === 'invalid-sentence' ? 'border-red-400 bg-red-50' : 
            'border-pink-200'
          }`}
          style={{ fontSize: '20px', touchAction: 'manipulation' }}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />

        {feedback === 'correct' && <div className="text-center mb-4"><span className="text-6xl">🎉</span><p className="text-2xl font-bold text-green-600">Goed zo!</p></div>}
        {feedback === 'missing-word' && <div className="text-center mb-4"><p className="text-lg text-red-500">Je zin moet "<span className="font-bold">{currentWord.english}</span>" bevatten!</p></div>}
        {feedback === 'invalid-sentence' && <div className="text-center mb-4"><p className="text-lg text-red-500">Maak een volledige zin (min. 3 woorden, eindig met . ! of ?)</p></div>}

        <div className="flex gap-3">
          {!showExample && (
            <button onClick={() => setShowExample(true)} className="flex-1 py-5 px-4 bg-amber-400 text-white font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>
              💡 Voorbeeld
            </button>
          )}
          <button onClick={checkSentence} className="flex-1 py-5 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>
            ✓ Check
          </button>
          <button onClick={skipWord} className="py-5 px-6 bg-gray-300 text-gray-600 font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>
            →
          </button>
        </div>
      </div>

      <p className="mt-6 text-xl text-pink-500">Woord {currentIndex + 1} van {shuffledWords.length}</p>
    </div>
  );
};

const TestMode = ({ words, onBack }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  
  useEffect(() => {
    const nlToEn = words.map(w => ({ ...w, direction: 'nl-en', question: w.dutch, answer: w.english }));
    const enToNl = words.map(w => ({ ...w, direction: 'en-nl', question: w.english, answer: w.dutch }));
    setShuffledQuestions(shuffleArray([...nlToEn, ...enToNl]));
  }, [words]);
  
  if (shuffledQuestions.length === 0) return null;
  const currentQuestion = shuffledQuestions[currentIndex];
  
  const submitAnswer = () => {
    const userAnswer = input.toLowerCase().trim();
    const correctAnswers = currentQuestion.answer.toLowerCase().split(',').map(a => a.trim());
    
    // Add special handling for België - accept both with and without dots
    const normalizedCorrectAnswers = correctAnswers.map(answer => {
      if (answer === 'belgië') return ['belgië', 'belgie'];
      return [answer];
    }).flat();
    
    const isCorrect = normalizedCorrectAnswers.some(answer => userAnswer === answer);
    setAnswers([...answers, { question: currentQuestion.question, correctAnswer: currentQuestion.answer, userAnswer: input, isCorrect, direction: currentQuestion.direction }]);
    if (isCorrect) setScore(score + 1);
    setShowAnswer(true);
    setTimeout(() => { 
      if (currentIndex + 1 >= shuffledQuestions.length) { setIsComplete(true); } 
      else { setCurrentIndex(currentIndex + 1); setInput(''); setShowAnswer(false); } 
    }, 2000);
  };
  
  const restart = () => {
    const nlToEn = words.map(w => ({ ...w, direction: 'nl-en', question: w.dutch, answer: w.english }));
    const enToNl = words.map(w => ({ ...w, direction: 'en-nl', question: w.english, answer: w.dutch }));
    setShuffledQuestions(shuffleArray([...nlToEn, ...enToNl]));
    setCurrentIndex(0); setInput(''); setScore(0); setAnswers([]); setIsComplete(false); setShowAnswer(false);
  };
  
  if (isComplete) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    const emoji = percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : percentage >= 40 ? '👍' : '💪';
    return (
      <div className="screen-scroll safe-area-pad bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 flex flex-col items-center justify-center p-6">
        {percentage >= 80 && <Confetti />}
        <div className="bg-white/95 rounded-3xl shadow-2xl p-8 w-full max-w-lg border-4 border-orange-200 text-center">
          <span className="text-8xl mb-6 block animate-bounce">{emoji}</span>
          <h2 className="text-4xl font-black text-orange-600 mb-4" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>Klaar!</h2>
          <p className="text-2xl text-orange-500 mb-4">Je hebt <span className="font-bold text-orange-700">{score}</span> van de <span className="font-bold text-orange-700">{shuffledQuestions.length}</span> goed!</p>
          <div className="w-full bg-orange-100 rounded-full h-8 mb-4">
            <div className="h-8 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 transition-all duration-1000" style={{ width: `${percentage}%` }} />
          </div>
          <p className="text-4xl font-bold text-orange-600 mb-6">{percentage}%</p>
          <div className="max-h-48 overflow-y-auto mb-6 text-left">
            {answers.map((a, idx) => (
              <div key={idx} className={`p-3 rounded-2xl mb-2 flex justify-between items-center ${a.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <span className="font-bold text-lg">{a.direction === 'nl-en' ? '🇳🇱→🇬🇧' : '🇬🇧→🇳🇱'} {a.question}</span>
                <span className={`text-lg ${a.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {a.isCorrect ? '✓' : '✗'}
                  {!a.isCorrect && <span className="text-gray-500 ml-2 text-sm">→ {a.correctAnswer}</span>}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <button onClick={onBack} className="flex-1 py-5 px-4 bg-gray-200 text-gray-600 font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>← Menu</button>
            <button onClick={restart} className="flex-1 py-5 px-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>🔄 Opnieuw</button>
          </div>
        </div>
      </div>
    );
  }
  
  const isNlToEn = currentQuestion.direction === 'nl-en';
  
  return (
    <div className="screen-scroll safe-area-pad bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 flex flex-col items-center justify-center p-6">
      <BackButton onClick={onBack} color="text-orange-600" />
      
      <div className="absolute top-6 right-6 px-6 py-4 bg-white/90 text-orange-600 font-bold rounded-2xl shadow-lg text-xl">
        Score: {score}/{currentIndex}
      </div>
      
      <div className="text-center mb-6">
        <h2 className="text-4xl font-black text-orange-600 mb-2" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>🏆 Overhoren</h2>
        <p className="text-xl text-orange-500">Vraag {currentIndex + 1} van {shuffledQuestions.length}</p>
      </div>

      <div className="bg-white/95 rounded-3xl shadow-2xl p-8 w-full max-w-lg border-4 border-orange-200">
        <div className="text-center mb-6">
          <span className="text-6xl mb-4 block">{currentQuestion.emoji}</span>
          <div className={`inline-block px-5 py-2 rounded-full text-lg font-bold mb-4 ${isNlToEn ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
            {isNlToEn ? '🇳🇱 → 🇬🇧' : '🇬🇧 → 🇳🇱'}
          </div>
          <p className="text-3xl font-bold text-orange-700" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>{currentQuestion.question}</p>
        </div>

        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && !showAnswer && submitAnswer()} 
          placeholder={isNlToEn ? "Typ Engels..." : "Typ Nederlands..."} 
          disabled={showAnswer}
          className={`w-full text-2xl p-5 rounded-2xl border-4 text-center font-bold mb-4 ${
            showAnswer ? (answers[answers.length - 1]?.isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50') : 'border-orange-200'
          }`}
          style={{ fontSize: '24px', touchAction: 'manipulation' }}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        {showAnswer && (
          <div className="text-center mb-4">
            {answers[answers.length - 1]?.isCorrect ? (
              <><span className="text-6xl">🎉</span><p className="text-2xl font-bold text-green-600">Goed zo!</p></>
            ) : (
              <p className="text-xl text-red-500">Het antwoord was: <span className="font-bold text-orange-600">{currentQuestion.answer}</span></p>
            )}
          </div>
        )}

        {!showAnswer && (
          <button onClick={submitAnswer} className="w-full py-5 px-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xl font-bold rounded-2xl shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>
            ✓ Antwoord
          </button>
        )}
      </div>

      <div className="w-full max-w-lg mt-6">
        <div className="w-full bg-orange-100 rounded-full h-4">
          <div className="h-4 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 transition-all duration-300" style={{ width: `${(currentIndex / shuffledQuestions.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
};

const ManageWords = ({ words, setWords, onBack }) => {
  const [newDutch, setNewDutch] = useState('');
  const [newEnglish, setNewEnglish] = useState('');
  const [newSentence, setNewSentence] = useState('');
  const [newEmoji, setNewEmoji] = useState('📚');
  const [editIndex, setEditIndex] = useState(null);
  
  const addWord = () => {
    if (newDutch.trim() && newEnglish.trim()) {
      if (editIndex !== null) { 
        const updated = [...words]; 
        updated[editIndex] = { dutch: newDutch.trim(), english: newEnglish.trim(), sentence: newSentence.trim() || `This is ${newEnglish.trim().toLowerCase()}.`, emoji: newEmoji || '📚' }; 
        setWords(updated); 
        setEditIndex(null); 
      } else { 
        setWords([...words, { dutch: newDutch.trim(), english: newEnglish.trim(), sentence: newSentence.trim() || `This is ${newEnglish.trim().toLowerCase()}.`, emoji: newEmoji || '📚' }]); 
      }
      setNewDutch(''); setNewEnglish(''); setNewSentence(''); setNewEmoji('📚');
    }
  };
  
  const deleteWord = (index) => setWords(words.filter((_, i) => i !== index));
  const editWord = (index) => { setNewDutch(words[index].dutch); setNewEnglish(words[index].english); setNewSentence(words[index].sentence || ''); setNewEmoji(words[index].emoji || '📚'); setEditIndex(index); };
  
  return (
    <div className="screen-scroll safe-area-pad bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 p-6">
      <BackButton onClick={onBack} color="text-orange-600" />
      
      <div className="max-w-2xl mx-auto pt-20">
        <h2 className="text-4xl font-black text-orange-600 mb-6 text-center" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>⚙️ Woordjes Beheren</h2>
        
        <div className="bg-white/95 rounded-3xl shadow-xl p-6 mb-6 border-4 border-orange-200">
          <h3 className="text-2xl font-bold text-orange-600 mb-4">{editIndex !== null ? '✏️ Bewerken' : '➕ Nieuw woord'}</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <input type="text" value={newEmoji} onChange={(e) => setNewEmoji(e.target.value)} placeholder="😀" className="w-20 text-3xl p-3 rounded-xl border-3 border-orange-200 text-center" />
              <input type="text" value={newDutch} onChange={(e) => setNewDutch(e.target.value)} placeholder="Nederlands" className="flex-1 p-4 rounded-xl border-3 border-orange-200 text-lg" />
              <input type="text" value={newEnglish} onChange={(e) => setNewEnglish(e.target.value)} placeholder="Engels" className="flex-1 p-4 rounded-xl border-3 border-orange-200 text-lg" />
            </div>
            <input type="text" value={newSentence} onChange={(e) => setNewSentence(e.target.value)} placeholder="Voorbeeldzin in het Engels" className="w-full p-4 rounded-xl border-3 border-orange-200 text-lg" onKeyDown={(e) => e.key === 'Enter' && addWord()} />
            <div className="flex gap-3">
              <button onClick={addWord} className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold rounded-xl text-lg shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>
                {editIndex !== null ? '✓ Opslaan' : '+ Toevoegen'}
              </button>
              {editIndex !== null && (
                <button onClick={() => { setEditIndex(null); setNewDutch(''); setNewEnglish(''); setNewSentence(''); setNewEmoji('📚'); }} className="px-6 py-4 bg-gray-200 text-gray-600 font-bold rounded-xl text-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>
                  ✗ Annuleer
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/95 rounded-3xl shadow-xl p-6 border-4 border-orange-200">
          <h3 className="text-2xl font-bold text-orange-600 mb-4">📚 Woordjes ({words.length})</h3>
          <div className="max-h-80 overflow-y-auto">
            {words.map((word, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-2xl mb-2 bg-orange-50 hover:bg-orange-100 active:bg-orange-200 transition-all">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-2xl">{word.emoji}</span>
                    <span className="font-bold text-orange-700">{word.dutch}</span>
                    <span className="text-orange-400">→</span>
                    <span className="text-orange-600">{word.english}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => editWord(index)} className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full text-xl flex items-center justify-center active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>✏️</button>
                  <button onClick={() => deleteWord(index)} className="w-14 h-14 bg-red-100 text-red-600 rounded-full text-xl flex items-center justify-center active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Europe Explorer
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const EuropeExplorer = ({ onBack }) => {
  // Core state
  const [gameMode, setGameMode] = useState('menu');
  const [selectedItem, setSelectedItem] = useState(null);
  const [lang, setLang] = useState('nl');
  const [filter, setFilter] = useState('all');

  // Mission state
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [questionQueue, setQuestionQueue] = useState([]);
  const [missionComplete, setMissionComplete] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(null);
  const [currentFunFact, setCurrentFunFact] = useState(null);

  // Type Quiz state
  const [typeQuizInput, setTypeQuizInput] = useState('');
  const [typeQuizHighlightedItem, setTypeQuizHighlightedItem] = useState(null);
  const [lastQuizMode, setLastQuizMode] = useState('mission'); // Track which quiz was played
  const [wrongAnswerTimeout, setWrongAnswerTimeout] = useState(null);

  // Helper to get random fun fact - uses imported function from europeData.ts

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (wrongAnswerTimeout) {
        clearTimeout(wrongAnswerTimeout);
      }
    };
  }, [wrongAnswerTimeout]);

  // Function to continue to next question after user clicks fun fact
  const handleContinueToNext = () => {
    if (gameMode === 'mission' && currentQuestion) {
      const nextIdx = questionQueue.indexOf(currentQuestion) + 1;
      if (nextIdx >= questionQueue.length) {
        setMissionComplete(true);
      } else {
        setCurrentQuestion(questionQueue[nextIdx]);
      }
      setFeedback(null);
      setWrongAnswer(null);
      setCurrentFunFact(null);
    }
  };

  // Function to clear wrong answer timeout and move to next question
  const clearWrongAnswerTimeout = () => {
    if (wrongAnswerTimeout) {
      clearTimeout(wrongAnswerTimeout);
      setWrongAnswerTimeout(null);
    }
    handleTypeQuizNext();
  };

  // Function to handle wrong answer with 10-second timeout
  const handleWrongAnswer = () => {
    setFeedback('wrong');
    // Set timeout to automatically move to next question after 10 seconds
    const timeout = setTimeout(() => {
      handleTypeQuizNext();
      setWrongAnswerTimeout(null);
    }, 10000);
    setWrongAnswerTimeout(timeout);
  };

  // Wikipedia state
  const [wikiInfo, setWikiInfo] = useState(null);
  const [wikiLoading, setWikiLoading] = useState(false);
  const [showWiki, setShowWiki] = useState(false);
  const wikiCache = React.useRef({});

  // Collection state - track collected stickers
  const [collectedStickers, setCollectedStickers] = useState(new Set());

  // Zoom state for map
  const [position, setPosition] = useState({ coordinates: [5, 57], zoom: 1 });

  const handleZoomIn = useCallback(() => {
    if (position.zoom >= 8) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  }, [position.zoom]);

  const handleZoomOut = useCallback(() => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  }, [position.zoom]);

  const handleZoomReset = useCallback(() => {
    setPosition({ coordinates: [5, 57], zoom: 1 });
  }, []);

  const handleMoveEnd = useCallback((position) => {
    setPosition(position);
  }, []);

  // Translations
  const t = lang === 'nl' ? {
    title: 'Europe Explorer',
    subtitle: 'Aardrijkskunde Missie',
    recon: 'Verkenning',
    mission: 'Start Missie',
    reconShort: 'Verken',
    missionShort: 'Missie',
    countries: 'Landen',
    capitals: 'Hoofdsteden',
    cities: 'Steden',
    waters: 'Wateren',
    mountains: 'Gebergten',
    regions: 'Regio\'s',
    back: '← Terug',
    correct: '✓ Goed zo!',
    wrong: '✗ Probeer opnieuw!',
    missionComplete: 'Missie Voltooid!',
    score: 'Score',
    menu: '← Menu',
    again: '🔄 Opnieuw',
    country: 'Land',
    capital: 'Hoofdstad',
    cityType: 'Stad',
    water: 'Water',
    mountainType: 'Gebergte',
    regionType: 'Regio',
    capitalOf: 'Hoofdstad van',
    cityIn: 'Stad in',
    loading: 'Laden...',
    moreInfo: 'Meer info',
    close: 'Sluiten',
    collected: 'Verzameld',
    stickerBook: 'Stickerverzameling',
    zoomIn: 'Inzoomen',
    zoomOut: 'Uitzoomen',
    zoomReset: 'Reset',
    zoomTip: 'Knijp om te zoomen',
    clickToContinue: 'Klik om verder te gaan',
    typeQuiz: 'Typ Quiz',
    typeQuizShort: 'Typ',
    whatIsThis: 'Wat is dit?',
    typeAnswer: 'Typ je antwoord...',
    check: 'Check',
    skip: 'Sla over',
  } : {
    title: 'Europe Explorer',
    subtitle: 'Geography Mission',
    recon: 'Reconnaissance',
    mission: 'Start Mission',
    reconShort: 'Recon',
    missionShort: 'Mission',
    countries: 'Countries',
    capitals: 'Capitals',
    cities: 'Cities',
    waters: 'Waters',
    mountains: 'Mountains',
    regions: 'Regions',
    back: '← Back',
    correct: '✓ Correct!',
    wrong: '✗ Try again!',
    missionComplete: 'Mission Complete!',
    score: 'Score',
    menu: '← Menu',
    again: '🔄 Again',
    country: 'Country',
    capital: 'Capital',
    cityType: 'City',
    water: 'Water',
    mountainType: 'Mountain range',
    regionType: 'Region',
    capitalOf: 'Capital of',
    cityIn: 'City in',
    loading: 'Loading...',
    moreInfo: 'More info',
    close: 'Close',
    collected: 'Collected',
    stickerBook: 'Sticker Collection',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    zoomReset: 'Reset',
    zoomTip: 'Pinch to zoom',
    clickToContinue: 'Click to continue',
    typeQuiz: 'Type Quiz',
    typeQuizShort: 'Type',
    whatIsThis: 'What is this?',
    typeAnswer: 'Type your answer...',
    check: 'Check',
    skip: 'Skip',
  };

  const filteredData = filter === 'all' ? europeData : europeData.filter(d => d.category === filter);

  // Fetch Wikipedia info with fun facts (for recon mode)
  const fetchWikiInfo = async (item) => {
    const cacheKey = `${item.id}-${lang}`;
    if (wikiCache.current[cacheKey]) {
      // Get a fresh random fun fact even from cache (with language support)
      const cached = wikiCache.current[cacheKey];
      setWikiInfo({ ...cached, funFact: getRandomFunFact(item.id, lang) });
      return;
    }

    setWikiLoading(true);
    setWikiInfo(null);

    try {
      const wikiLang = lang === 'nl' ? 'nl' : 'en';
      // Use custom search term if available, otherwise use default name
      const customTerm = wikiSearchTerms[item.id]?.[lang];
      const searchTerm = customTerm || (lang === 'nl' ? item.dutchName : item.englishName);
      const url = `https://${wikiLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // Ensure we have at least 2 paragraphs (approximately 400+ characters)
        let extract = data.extract || '';
        
        // Remove duplicate content from extract if it's too similar to description (only in Dutch mode)
        if (extract && item.description && lang === 'nl') {
          const descWords = item.description.toLowerCase().split(' ').slice(0, 5).join(' ');
          const extractStart = extract.toLowerCase().split(' ').slice(0, 5).join(' ');
          if (extractStart === descWords) {
            // Extract starts with description, remove the overlap
            extract = extract.replace(new RegExp(`^${item.description.split(' ').slice(0, 3).join(' ')}`, 'i'), '').trim();
          }
        }
        
        // Ensure minimum content (2 paragraphs)
        const targetLength = 400; // Approximately 2 paragraphs
        if (extract.length < targetLength) {
          // Add description if extract is too short (only in Dutch mode)
          if (item.description && lang === 'nl') {
            extract = extract ? `${extract}\n\n${item.description}` : item.description;
          }
          
          // If still too short, add fun facts as additional content (only in Dutch mode)
          if (extract.length < targetLength && item.funFacts && item.funFacts.length > 0 && lang === 'nl') {
            const additionalFacts = item.funFacts.slice(0, 2).join(' ');
            extract = extract ? `${extract}\n\n💡 Extra info: ${additionalFacts}` : `💡 Extra info: ${additionalFacts}`;
          }
          
          // If still too short, add generic content
          if (extract.length < targetLength) {
            const categoryInfo = {
              country: lang === 'nl'
                ? `Dit land is een belangrijk geografisch gebied in Europa.`
                : `This country is an important geographical area in Europe.`,
              capital: lang === 'nl'
                ? `Deze hoofdstad is een cultureel en administratief centrum.`
                : `This capital is a cultural and administrative center.`,
              city: lang === 'nl'
                ? `Deze stad is een belangrijk cultureel en economisch centrum.`
                : `This city is an important cultural and economic centre.`,
              water: lang === 'nl'
                ? `Deze waterweg speelt een cruciale rol in de regio.`
                : `This waterway plays a crucial role in the region.`,
              mountain: lang === 'nl'
                ? `Dit gebergte is een opvallend geografisch kenmerk.`
                : `This mountain range is a prominent geographical feature.`,
              region: lang === 'nl'
                ? `Deze regio heeft een unieke geografische en culturele identiteit.`
                : `This region has a unique geographical and cultural identity.`
            };
            extract = extract ? `${extract}\n\n${categoryInfo[item.category]}` : categoryInfo[item.category];
          }
        }
        const info = {
          title: data.title,
          extract: extract,
          thumbnail: data.thumbnail?.source,
          funFact: getRandomFunFact(item.id, lang),
        };
        // Cache without funFact so we can pick fresh random fact each time
        wikiCache.current[cacheKey] = { title: data.title, extract: extract, thumbnail: data.thumbnail?.source };
        setWikiInfo(info);
      } else {
        // If Wikipedia fails, create comprehensive fallback content
        let extract = item.description || '';
        const targetLength = 400;
        
        // Add fun facts if extract is too short
        if (extract.length < targetLength && item.funFacts && item.funFacts.length > 0) {
          const additionalFacts = item.funFacts.slice(0, 3).join(' ');
          extract = extract ? `${extract}\n\n💡 Extra info: ${additionalFacts}` : `💡 Extra info: ${additionalFacts}`;
        }
        
        // Add generic content if still too short
        if (extract.length < targetLength) {
          const categoryInfo = {
            country: `Dit ${lang === 'nl' ? 'land' : 'country'} is een belangrijk geografisch gebied in Europa met een rijke geschiedenis en cultuur.`,
            capital: `Deze ${lang === 'nl' ? 'hoofdstad' : 'capital'} is een cultureel en administratief centrum met veel historische bezienswaardigheden.`,
            city: `Deze ${lang === 'nl' ? 'stad' : 'city'} is een belangrijk cultureel en economisch centrum in de regio.`,
            water: `Deze ${lang === 'nl' ? 'waterweg' : 'waterway'} speelt een cruciale rol in de regio en heeft belangrijke ecologische waarde.`,
            mountain: `Dit ${lang === 'nl' ? 'gebergte' : 'mountain'} is een opvallend geografisch kenmerk met unieke flora en fauna.`,
            region: `Deze ${lang === 'nl' ? 'regio' : 'region'} heeft een unieke geografische en culturele identiteit binnen Europa.`
          };
          extract = extract ? `${extract}\n\n${categoryInfo[item.category]}` : categoryInfo[item.category];
        }
        
        const info = { 
          title: lang === 'nl' ? item.dutchName : item.englishName, 
          extract: extract, 
          thumbnail: null, 
          funFact: getRandomFunFact(item.id, lang)
        };
        setWikiInfo(info);
      }
    } catch (err) {
      console.log('Wiki fetch failed:', err);
      // If fetch fails, create comprehensive fallback content
      let extract = item.description || '';
      const targetLength = 400;
      
      // Add fun facts if extract is too short (with language support)
      if (extract.length < targetLength && item.funFacts && item.funFacts.length > 0) {
        const facts = lang === 'nl' ? item.funFacts : (item.englishFunFacts || []);
        if (facts.length > 0) {
          const additionalFacts = facts.slice(0, 3).join(' ');
          extract = extract ? `${extract}\n\n💡 Extra info: ${additionalFacts}` : `💡 Extra info: ${additionalFacts}`;
        }
      }
      
      // Add generic content if still too short
      if (extract.length < targetLength) {
        const categoryInfo = {
          country: lang === 'nl'
            ? `Dit land is een belangrijk geografisch gebied in Europa met een rijke geschiedenis en cultuur.`
            : `This country is an important geographical area in Europe with a rich history and culture.`,
          capital: lang === 'nl'
            ? `Deze hoofdstad is een cultureel en administratief centrum met veel historische bezienswaardigheden.`
            : `This capital is a cultural and administrative center with many historical landmarks.`,
          city: lang === 'nl'
            ? `Deze stad is een belangrijk cultureel en economisch centrum in de regio.`
            : `This city is an important cultural and economic centre in the region.`,
          water: lang === 'nl'
            ? `Deze waterweg speelt een cruciale rol in de regio en heeft belangrijke ecologische waarde.`
            : `This waterway plays a crucial role in the region and has important ecological value.`,
          mountain: lang === 'nl'
            ? `Dit gebergte is een opvallend geografisch kenmerk met unieke flora en fauna.`
            : `This mountain range is a prominent geographical feature with unique flora and fauna.`,
          region: lang === 'nl'
            ? `Deze regio heeft een unieke geografische en culturele identiteit binnen Europa.`
            : `This region has a unique geographical and cultural identity within Europe.`
        };
        extract = extract ? `${extract}\n\n${categoryInfo[item.category]}` : categoryInfo[item.category];
      }
      
      const info = { 
        title: lang === 'nl' ? item.dutchName : item.englishName, 
        extract: extract, 
        thumbnail: null, 
        funFact: getRandomFunFact(item.id, lang)
      };
      setWikiInfo(info);
    }
    setWikiLoading(false);
  };

  const generateQuestions = () => {
    return shuffleArray(europeData.map(item => {
      if (item.category === 'country') {
        return { target: item, text: lang === 'nl' ? `Vind ${item.dutchName}!` : `Find ${item.englishName}!` };
      } else if (item.category === 'capital') {
        const country = getCountryForCapital(item.id);
        const countryName = country ? (lang === 'nl' ? country.dutchName : country.englishName) : '';
        return { target: item, text: lang === 'nl' ? `Vind de hoofdstad van ${countryName}!` : `Find the capital of ${countryName}!` };
      } else if (item.category === 'city') {
        const country = getCountryForCapital(item.id);
        const countryName = country ? (lang === 'nl' ? country.dutchName : country.englishName) : '';
        return { target: item, text: lang === 'nl' ? `Vind de stad ${item.dutchName} (in ${countryName})!` : `Find the city ${item.englishName} (in ${countryName})!` };
      } else if (item.category === 'region') {
        return { target: item, text: lang === 'nl' ? `Vind de regio: ${item.dutchName}!` : `Find the region: ${item.englishName}!` };
      } else {
        return { target: item, text: lang === 'nl' ? `Vind: ${item.dutchName}!` : `Find: ${item.englishName}!` };
      }
    }));
  };

  const startMission = () => {
    const questions = generateQuestions();
    setQuestionQueue(questions);
    setCurrentQuestion(questions[0]);
    setScore(0);
    setTotalQuestions(questions.length);
    setFeedback(null);
    setMissionComplete(false);
    setPosition({ coordinates: [5, 57], zoom: 1 }); // Reset zoom
    setLastQuizMode('mission');
    setGameMode('mission');
  };

  const startTypeQuiz = () => {
    const shuffled = shuffleArray([...europeData]);
    setQuestionQueue(shuffled);
    setTypeQuizHighlightedItem(shuffled[0]);
    setScore(0);
    setTotalQuestions(shuffled.length);
    setFeedback(null);
    setMissionComplete(false);
    setTypeQuizInput('');
    setPosition({ coordinates: [5, 57], zoom: 1 }); // Reset zoom
    setLastQuizMode('typeQuiz');
    setGameMode('typeQuiz');
  };

  const checkTypeQuizAnswer = () => {
    if (!typeQuizHighlightedItem || !typeQuizInput.trim()) return;

    const userAnswer = typeQuizInput.toLowerCase().trim();
    const dutchName = typeQuizHighlightedItem.dutchName.toLowerCase();
    const englishName = typeQuizHighlightedItem.englishName.toLowerCase();

    // Accept both Dutch and English names, plus special handling for België
    const isCorrect = userAnswer === dutchName || 
                     userAnswer === englishName ||
                     (dutchName === 'belgië' && userAnswer === 'belgie') ||
                     (englishName === 'belgium' && userAnswer === 'belgium'); // Future proof

    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
      setCollectedStickers(prev => new Set([...prev, typeQuizHighlightedItem.id]));
      setCurrentFunFact(getRandomFunFact(typeQuizHighlightedItem.id, lang));
    } else {
      handleWrongAnswer();
    }
  };

  const handleTypeQuizNext = () => {
    // Clear any existing wrong answer timeout
    if (wrongAnswerTimeout) {
      clearTimeout(wrongAnswerTimeout);
      setWrongAnswerTimeout(null);
    }
    
    const currentIdx = questionQueue.indexOf(typeQuizHighlightedItem);
    if (currentIdx + 1 >= questionQueue.length) {
      setMissionComplete(true);
    } else {
      setTypeQuizHighlightedItem(questionQueue[currentIdx + 1]);
    }
    setFeedback(null);
    setTypeQuizInput('');
    setCurrentFunFact(null);
  };

  const skipTypeQuizQuestion = () => {
    const currentIdx = questionQueue.indexOf(typeQuizHighlightedItem);
    if (currentIdx + 1 >= questionQueue.length) {
      setMissionComplete(true);
    } else {
      setTypeQuizHighlightedItem(questionQueue[currentIdx + 1]);
    }
    setFeedback(null);
    setTypeQuizInput('');
  };

  const handleMarkerClick = (item) => {
    if (gameMode === 'recon') {
      if (selectedItem?.id === item.id) {
        setSelectedItem(null);
        setShowWiki(false);
        setWikiInfo(null);
      } else {
        setSelectedItem(item);
        setShowWiki(false);
        setWikiInfo(null);
      }
    } else if (gameMode === 'mission' && currentQuestion) {
      if (item.id === currentQuestion.target.id) {
        // Correct answer - add to collection and show fun fact
        setFeedback('correct');
        setScore(s => s + 1);
        setCollectedStickers(prev => new Set([...prev, item.id]));
        setCurrentFunFact(getRandomFunFact(item.id, lang));
      } else {
        setFeedback('wrong');
        setWrongAnswer(item.id);
        setTimeout(() => { setFeedback(null); setWrongAnswer(null); }, 600);
      }
    }
  };

  // Country name lookup for Geography coloring
  const countryNameMap = React.useMemo(() => {
    const map = {};
    europeData.filter(d => d.category === 'country').forEach(c => { 
      map[c.englishName] = c; 
      
      // Add specific mappings for Netherlands
      if (c.id === 'netherlands') {
        map['Netherlands'] = c;
        map['The Netherlands'] = c;
        map['Nederland'] = c;
        map['Holland'] = c;
      }
      // Add specific mappings for other countries that might have issues
      if (c.id === 'uk') {
        map['United Kingdom'] = c;
        map['UK'] = c;
        map['Great Britain'] = c;
        map['England'] = c;
        map['Scotland'] = c;
        map['Wales'] = c;
        map['Northern Ireland'] = c;
      }
      if (c.id === 'denmark') {
        map['Denmark'] = c;
      }
      if (c.id === 'estonia') {
        map['Estonia'] = c;
      }
      if (c.id === 'finland') {
        map['Finland'] = c;
      }
      if (c.id === 'ireland') {
        map['Ireland'] = c;
        map['Republic of Ireland'] = c;
      }
      if (c.id === 'iceland') {
        map['Iceland'] = c;
      }
      if (c.id === 'latvia') {
        map['Latvia'] = c;
      }
      if (c.id === 'lithuania') {
        map['Lithuania'] = c;
      }
      if (c.id === 'norway') {
        map['Norway'] = c;
      }
      if (c.id === 'sweden') {
        map['Sweden'] = c;
      }
    });
    
    return map;
  }, []);


  // Menu screen
  if (gameMode === 'menu') {
    return (
      <div className="screen-scroll safe-area-pad bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-900 flex flex-col items-center justify-center p-6">
        <BackButton onClick={onBack} color="text-emerald-400" />

        {/* Language toggle */}
        <div className="absolute top-6 right-6 flex bg-white/10 rounded-full p-1">
          <button
            onClick={() => setLang('nl')}
            className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${lang === 'nl' ? 'bg-white text-slate-800' : 'text-white/70'}`}
            style={{ fontFamily: 'Nunito, sans-serif', touchAction: 'manipulation' }}
          >NL</button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${lang === 'en' ? 'bg-white text-slate-800' : 'text-white/70'}`}
            style={{ fontFamily: 'Nunito, sans-serif', touchAction: 'manipulation' }}
          >EN</button>
        </div>

        <div className="text-center mb-8">
          <span className="text-8xl block mb-4">🗺️</span>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 mb-3" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
            {t.title}
          </h1>
          <p className="text-xl text-emerald-200" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {t.subtitle}
          </p>
        </div>
        <div className="space-y-4 flex flex-col items-center w-full max-w-md">
          <BigButton onClick={() => setGameMode('recon')} color="bg-gradient-to-r from-cyan-500 to-blue-600">
            <span className="text-4xl">🔍</span> {t.recon}
          </BigButton>
          <BigButton onClick={startMission} color="bg-gradient-to-r from-orange-500 to-red-600">
            <span className="text-4xl">🎯</span> {t.mission}
          </BigButton>
          <BigButton onClick={startTypeQuiz} color="bg-gradient-to-r from-purple-500 to-pink-600">
            <span className="text-4xl">⌨️</span> {t.typeQuiz}
          </BigButton>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/10 rounded-2xl p-3">
            <span className="text-2xl block">🌍</span>
            <p className="text-emerald-200 font-bold mt-1 text-sm">{europeData.filter(d => d.category === 'country').length} {t.countries}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3">
            <span className="text-2xl block">🏛️</span>
            <p className="text-emerald-200 font-bold mt-1 text-sm">{europeData.filter(d => d.category === 'capital' || d.category === 'city').length} {t.capitals}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3">
            <span className="text-2xl block">🌊</span>
            <p className="text-emerald-200 font-bold mt-1 text-sm">{europeData.filter(d => d.category === 'water').length} {t.waters}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3">
            <span className="text-2xl block">⛰️</span>
            <p className="text-emerald-200 font-bold mt-1 text-sm">{europeData.filter(d => d.category === 'mountain').length} {t.mountains}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3">
            <span className="text-2xl block">🗺️</span>
            <p className="text-emerald-200 font-bold mt-1 text-sm">{europeData.filter(d => d.category === 'region').length} {t.regions}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3">
            <span className="text-2xl block">📍</span>
            <p className="text-emerald-200 font-bold mt-1 text-sm">{europeData.length} totaal</p>
          </div>
        </div>
      </div>
    );
  }

  // Mission complete screen
  if (missionComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const emoji = percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : percentage >= 40 ? '👍' : '💪';
    const isTypeQuiz = lastQuizMode === 'typeQuiz';
    const borderColor = isTypeQuiz ? 'border-purple-300' : 'border-emerald-300';
    const textColor = isTypeQuiz ? 'text-purple-700' : 'text-emerald-700';
    const textColorLight = isTypeQuiz ? 'text-purple-600' : 'text-emerald-600';
    const bgGradient = isTypeQuiz ? 'from-purple-100' : 'from-emerald-100';
    const barGradient = isTypeQuiz ? 'from-purple-400 to-pink-500' : 'from-emerald-400 to-cyan-500';
    const buttonGradient = isTypeQuiz ? 'from-purple-500 to-pink-500' : 'from-orange-500 to-red-500';

    return (
      <div className="screen-scroll safe-area-pad bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-900 flex flex-col items-center justify-center p-6">
        {percentage >= 80 && <Confetti />}
        <div className={`bg-white/95 rounded-3xl shadow-2xl p-8 w-full max-w-lg border-4 ${borderColor} text-center`}>
          <span className="text-8xl mb-4 block animate-bounce">{emoji}</span>
          <h2 className={`text-4xl font-black ${textColor} mb-4`} style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
            {t.missionComplete}
          </h2>
          <p className={`text-2xl ${textColorLight} mb-4`}>
            {t.score}: <span className="font-bold">{score}</span> / <span className="font-bold">{totalQuestions}</span>
          </p>
          <div className={`w-full bg-${bgGradient} rounded-full h-6 mb-4`} style={{ backgroundColor: isTypeQuiz ? '#f3e8ff' : '#d1fae5' }}>
            <div className={`h-6 rounded-full bg-gradient-to-r ${barGradient} transition-all duration-1000`} style={{ width: `${percentage}%` }} />
          </div>
          <p className={`text-3xl font-bold ${textColorLight} mb-6`}>{percentage}%</p>
          <div className="flex gap-4">
            <button onClick={() => setGameMode('menu')} className="flex-1 py-5 px-4 bg-gray-200 text-gray-600 font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>
              {t.menu}
            </button>
            <button onClick={isTypeQuiz ? startTypeQuiz : startMission} className={`flex-1 py-5 px-4 bg-gradient-to-r ${buttonGradient} text-white font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all`} style={{ touchAction: 'manipulation' }}>
              {t.again}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Map view (recon or mission)
  return (
    <div className="screen-fixed safe-area-pad bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 shrink-0">
        <button
          onClick={() => { setGameMode('menu'); setSelectedItem(null); setFeedback(null); setPosition({ coordinates: [5, 57], zoom: 1 }); }}
          className="px-3 py-2 bg-white/20 text-white font-bold rounded-xl active:scale-95 transition-all text-sm"
          style={{ touchAction: 'manipulation', minHeight: '44px' }}
        >
          {t.back}
        </button>
        <h2 className="text-lg font-black text-white" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
          {gameMode === 'recon' ? `🔍 ${t.reconShort}` : gameMode === 'typeQuiz' ? `⌨️ ${t.typeQuizShort}` : `🎯 ${t.missionShort}`}
        </h2>
        {(gameMode === 'mission' || gameMode === 'typeQuiz') && (
          <div className="px-3 py-2 bg-white/20 text-white font-bold rounded-xl text-sm" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>
            {score}/{totalQuestions}
          </div>
        )}
        {gameMode === 'recon' && (
          <div className="flex gap-1">
            {[['all', 'All'], ['country', '🌍'], ['capital', '🏛️'], ['city', '🏙️'], ['water', '🌊'], ['mountain', '⛰️'], ['region', '🗺️']].map(([key, label]) => (
              <button
                key={key}
                onClick={() => { setFilter(key); setSelectedItem(null); }}
                className={`px-2 py-1.5 rounded-lg font-bold text-xs transition-all active:scale-95 ${filter === key ? 'bg-white text-slate-800' : 'bg-white/20 text-white'}`}
                style={{ touchAction: 'manipulation', minHeight: '36px' }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mission question */}
      {gameMode === 'mission' && currentQuestion && (
        <div 
          className={`mx-3 mb-2 rounded-xl text-center shrink-0 overflow-hidden pointer-events-auto ${
          feedback === 'correct' ? 'bg-green-500 text-white' :
          feedback === 'wrong' ? 'bg-red-500 text-white animate-shake' :
          'bg-white/20 text-white'
        }`}
          onClick={(e) => {
            if (feedback === 'correct' && currentFunFact && e.target === e.currentTarget) {
              handleContinueToNext();
            }
          }}
        >
          <div className="p-3 text-base font-bold" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
            {feedback === 'correct' ? t.correct : feedback === 'wrong' ? t.wrong : currentQuestion.text}
          </div>
          {feedback === 'correct' && currentFunFact && (
            <div className="px-3 pb-3 pt-0">
              <div className="bg-white/20 rounded-lg p-2 text-sm font-medium relative" style={{ fontFamily: 'Nunito, sans-serif' }}>
                <button
                  onClick={handleContinueToNext}
                  className="absolute top-1 right-1 w-6 h-6 bg-white/30 hover:bg-white/50 text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                  title={t.clickToContinue}
                  style={{ touchAction: 'manipulation' }}
                >
                  ✕
                </button>
                <div className="pr-8">
                  {currentFunFact}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progress bar */}
      {gameMode === 'mission' && (
        <div className="px-3 mb-2 shrink-0">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all" style={{ width: `${(questionQueue.indexOf(currentQuestion) / totalQuestions) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Type Quiz input section */}
      {gameMode === 'typeQuiz' && typeQuizHighlightedItem && (
        <div className="mx-3 mb-2 shrink-0">
          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all" style={{ width: `${(questionQueue.indexOf(typeQuizHighlightedItem) / totalQuestions) * 100}%` }} />
          </div>

          {/* Question and input */}
          <div className={`rounded-xl p-4 ${
            feedback === 'correct' ? 'bg-green-500' :
            feedback === 'wrong' ? 'bg-red-500' :
            'bg-white/20'
          }`}>
            <p className="text-white text-center font-bold mb-3" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
              {feedback === 'correct' ? t.correct :
               feedback === 'wrong' ? `${t.wrong}` :
               `${t.whatIsThis} ${typeQuizHighlightedItem.emoji}`}
            </p>

            {/* Show correct answer when wrong */}
            {feedback === 'wrong' && (
              <div className="text-center mb-3">
                <p className="text-white text-lg font-bold mb-2">
                  Goed antwoord: {lang === 'nl' ? typeQuizHighlightedItem.dutchName : typeQuizHighlightedItem.englishName}
                </p>
                <p className="text-white/80 text-sm">
                  Klik om verder te gaan of wacht 10 seconden...
                </p>
                <button
                  onClick={clearWrongAnswerTimeout}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg active:scale-95 transition-all"
                  style={{ touchAction: 'manipulation' }}
                >
                  Volgende →
                </button>
              </div>
            )}

            {feedback !== 'correct' && feedback !== 'wrong' && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={typeQuizInput}
                  onChange={(e) => setTypeQuizInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && checkTypeQuizAnswer()}
                  placeholder={t.typeAnswer}
                  className="flex-1 px-4 py-3 rounded-xl text-lg font-bold text-center border-2 border-white/30 bg-white/90 text-slate-800"
                  style={{ touchAction: 'manipulation' }}
                  autoFocus
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <button
                  onClick={checkTypeQuizAnswer}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl active:scale-95 transition-all"
                  style={{ touchAction: 'manipulation' }}
                >
                  {t.check}
                </button>
                <button
                  onClick={skipTypeQuizQuestion}
                  className="px-4 py-3 bg-white/30 text-white font-bold rounded-xl active:scale-95 transition-all"
                  style={{ touchAction: 'manipulation' }}
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main content area - flex row for map and sticker book */}
      <div className="flex-1 min-h-0 flex gap-3 px-3 pb-3">
        {/* Map container */}
        <div className="relative flex-1 min-h-0 rounded-xl shadow-xl border-2 border-slate-600 overflow-hidden" style={{ backgroundColor: '#a8d5e2' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [5, 57], scale: 680 }}
          style={{ width: '100%', height: '100%', touchAction: 'none' }}
          width={800}
          height={600}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
            minZoom={1}
            maxZoom={8}
          >
          {/* Countries */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryItem = countryNameMap[geo.properties.name];
                const show = filter === 'all' || filter === 'country';

                if (countryItem && show) {
                  const isCorrect = feedback === 'correct' && countryItem.id === currentQuestion?.target.id;
                  const isWrong = wrongAnswer === countryItem.id;
                  const isSelected = selectedItem?.id === countryItem.id;
                  // Type Quiz highlighting
                  const isTypeQuizHighlight = gameMode === 'typeQuiz' && countryItem.id === typeQuizHighlightedItem?.id;
                  const isTypeQuizCorrect = gameMode === 'typeQuiz' && feedback === 'correct' && countryItem.id === typeQuizHighlightedItem?.id;
                  const isTypeQuizWrong = gameMode === 'typeQuiz' && feedback === 'wrong' && countryItem.id === typeQuizHighlightedItem?.id;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleMarkerClick(countryItem)}
                      fill={isTypeQuizCorrect ? '#86efac' : isTypeQuizWrong ? '#fca5a5' : isTypeQuizHighlight ? '#f0abfc' : isCorrect ? '#86efac' : isWrong ? '#fca5a5' : isSelected ? '#d8b4fe' : '#c4b5fd'}
                      stroke={isTypeQuizCorrect ? '#16a34a' : isTypeQuizWrong ? '#dc2626' : isTypeQuizHighlight ? '#d946ef' : isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#7c3aed'}
                      strokeWidth={isTypeQuizHighlight ? 3 : 1.5}
                      style={{ default: { outline: 'none', cursor: gameMode === 'typeQuiz' ? 'default' : 'pointer', pointerEvents: gameMode === 'typeQuiz' ? 'none' : 'auto' }, hover: { outline: 'none', fill: gameMode === 'typeQuiz' ? undefined : '#ddd6fe' }, pressed: { outline: 'none' } }}
                    />
                  );
                }
                return <Geography key={geo.rsmKey} geography={geo} fill="#e8f5e0" stroke="#b0c4a8" strokeWidth={0.5} style={{ default: { outline: 'none', pointerEvents: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }} />;
              })
            }
          </Geographies>

          {/* Mountains */}
          {(gameMode === 'recon' ? filteredData : europeData).filter(i => i.category === 'mountain').map(item => {
            const isCorrect = feedback === 'correct' && item.id === currentQuestion?.target.id;
            const isWrong = wrongAnswer === item.id;
            const isSelected = selectedItem?.id === item.id;
            // Type Quiz highlighting
            const isTypeQuizHighlight = gameMode === 'typeQuiz' && item.id === typeQuizHighlightedItem?.id;
            const isTypeQuizCorrect = gameMode === 'typeQuiz' && feedback === 'correct' && item.id === typeQuizHighlightedItem?.id;
            const isTypeQuizWrong = gameMode === 'typeQuiz' && feedback === 'wrong' && item.id === typeQuizHighlightedItem?.id;

            const fill = isTypeQuizCorrect ? '#86efac' : isTypeQuizWrong ? '#fca5a5' : isTypeQuizHighlight ? '#f0abfc' : isCorrect ? '#86efac' : isWrong ? '#fca5a5' : isSelected ? '#6ee7b7' : '#34d39988';
            const stroke = isTypeQuizCorrect ? '#16a34a' : isTypeQuizWrong ? '#dc2626' : isTypeQuizHighlight ? '#d946ef' : isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#059669';
            // Scale inversely with zoom
            const scale = 1 / position.zoom;
            const touchRx = Math.max(10, 30 * scale);
            const touchRy = Math.max(7, 20 * scale);
            // Make highlighted item larger
            const highlightScale = isTypeQuizHighlight ? 1.5 : 1;

            return (
              <Marker key={item.id} coordinates={item.coordinates}>
                <ellipse rx={touchRx} ry={touchRy} fill="transparent" onClick={() => gameMode !== 'typeQuiz' && handleMarkerClick(item)} style={{ cursor: gameMode === 'typeQuiz' ? 'default' : 'pointer' }} />
                <g transform={`scale(${scale * highlightScale})`}>
                  <polygon points="-15,6 -8,-5 -2,3 5,-8 11,1 17,6" fill={fill} stroke={stroke} strokeWidth={isTypeQuizHighlight ? 2.5 : 1.5} strokeLinejoin="round" onClick={() => gameMode !== 'typeQuiz' && handleMarkerClick(item)} style={{ cursor: gameMode === 'typeQuiz' ? 'default' : 'pointer' }} />
                </g>
              </Marker>
            );
          })}

          {/* Waters (render first, so capitals are clickable on top) */}
          {(gameMode === 'recon' ? filteredData : europeData)
            .filter(i => i.category === 'water')
            .map(item => {
              const isCorrect = feedback === 'correct' && item.id === currentQuestion?.target.id;
              const isWrong = wrongAnswer === item.id;
              // Type Quiz highlighting
              const isTypeQuizHighlight = gameMode === 'typeQuiz' && item.id === typeQuizHighlightedItem?.id;
              const isTypeQuizCorrect = gameMode === 'typeQuiz' && feedback === 'correct' && item.id === typeQuizHighlightedItem?.id;
              const isTypeQuizWrong = gameMode === 'typeQuiz' && feedback === 'wrong' && item.id === typeQuizHighlightedItem?.id;

              const fill = isTypeQuizCorrect ? '#86efac' : isTypeQuizWrong ? '#fca5a5' : isTypeQuizHighlight ? '#f0abfc' : isCorrect ? '#86efac' : isWrong ? '#fca5a5' : '#60a5fa';
              const stroke = isTypeQuizCorrect ? '#16a34a' : isTypeQuizWrong ? '#dc2626' : isTypeQuizHighlight ? '#d946ef' : isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#2563eb';
              // Scale inversely with zoom - keeps apparent screen size constant
              const scale = 1 / position.zoom;
              // Touch target: large enough to tap, but scales down to reduce overlap
              const touchRadius = Math.max(4, 12 * scale);
              // Visual marker: stays visible at all zoom levels - larger for highlighted items
              const markerRadius = Math.max(2, ((isTypeQuizHighlight || isCorrect) ? 10 : 5) * scale);
              const strokeW = Math.max(0.5, (isTypeQuizHighlight ? 2.5 : 1.5) * scale);

              return (
                <Marker key={item.id} coordinates={item.coordinates}>
                  <circle r={touchRadius} fill="transparent" onClick={() => gameMode !== 'typeQuiz' && handleMarkerClick(item)} style={{ cursor: gameMode === 'typeQuiz' ? 'default' : 'pointer' }} />
                  <circle r={markerRadius} fill={fill} stroke={stroke} strokeWidth={strokeW} onClick={() => gameMode !== 'typeQuiz' && handleMarkerClick(item)} style={{ cursor: gameMode === 'typeQuiz' ? 'default' : 'pointer' }} />
                </Marker>
              );
            })}

          {/* Capitals (render last, on top of waters) */}
          {(gameMode === 'recon' ? filteredData : europeData)
            .filter(i => i.category === 'capital')
            .map(item => {
              const isCorrect = feedback === 'correct' && item.id === currentQuestion?.target.id;
              const isWrong = wrongAnswer === item.id;
              // Type Quiz highlighting
              const isTypeQuizHighlight = gameMode === 'typeQuiz' && item.id === typeQuizHighlightedItem?.id;
              const isTypeQuizCorrect = gameMode === 'typeQuiz' && feedback === 'correct' && item.id === typeQuizHighlightedItem?.id;
              const isTypeQuizWrong = gameMode === 'typeQuiz' && feedback === 'wrong' && item.id === typeQuizHighlightedItem?.id;

              const fill = isTypeQuizCorrect ? '#86efac' : isTypeQuizWrong ? '#fca5a5' : isTypeQuizHighlight ? '#f0abfc' : isCorrect ? '#86efac' : isWrong ? '#fca5a5' : '#fbbf24';
              const stroke = isTypeQuizCorrect ? '#16a34a' : isTypeQuizWrong ? '#dc2626' : isTypeQuizHighlight ? '#d946ef' : isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#d97706';
              const scale = 1 / position.zoom;
              const touchRadius = Math.max(4, 15 * scale);
              const markerRadius = Math.max(2, ((isTypeQuizHighlight || isCorrect) ? 10 : 5) * scale);
              const strokeW = Math.max(0.5, (isTypeQuizHighlight ? 2.5 : 1.5) * scale);

              return (
                <Marker key={item.id} coordinates={item.coordinates}>
                  <circle r={touchRadius} fill="transparent" onClick={() => gameMode !== 'typeQuiz' && handleMarkerClick(item)} style={{ cursor: gameMode === 'typeQuiz' ? 'default' : 'pointer' }} />
                  <circle r={markerRadius} fill={fill} stroke={stroke} strokeWidth={strokeW} onClick={() => gameMode !== 'typeQuiz' && handleMarkerClick(item)} style={{ cursor: gameMode === 'typeQuiz' ? 'default' : 'pointer' }} />
                </Marker>
              );
            })}

          {/* Cities (non-capital, orange markers) */}
          {(gameMode === 'recon' ? filteredData : europeData)
            .filter(i => i.category === 'city')
            .map(item => {
              const isCorrect = feedback === 'correct' && item.id === currentQuestion?.target.id;
              const isWrong = wrongAnswer === item.id;
              const isTypeQuizHighlight = gameMode === 'typeQuiz' && item.id === typeQuizHighlightedItem?.id;
              const isTypeQuizCorrect = gameMode === 'typeQuiz' && feedback === 'correct' && item.id === typeQuizHighlightedItem?.id;
              const isTypeQuizWrong = gameMode === 'typeQuiz' && feedback === 'wrong' && item.id === typeQuizHighlightedItem?.id;

              const fill = isTypeQuizCorrect ? '#86efac' : isTypeQuizWrong ? '#fca5a5' : isTypeQuizHighlight ? '#f0abfc' : isCorrect ? '#86efac' : isWrong ? '#fca5a5' : '#fb923c';
              const stroke = isTypeQuizCorrect ? '#16a34a' : isTypeQuizWrong ? '#dc2626' : isTypeQuizHighlight ? '#d946ef' : isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#ea580c';
              const scale = 1 / position.zoom;
              const touchRadius = Math.max(4, 15 * scale);
              const markerRadius = Math.max(2, ((isTypeQuizHighlight || isCorrect) ? 10 : 5) * scale);
              const strokeW = Math.max(0.5, (isTypeQuizHighlight ? 2.5 : 1.5) * scale);

              return (
                <Marker key={item.id} coordinates={item.coordinates}>
                  <circle r={touchRadius} fill="transparent" onClick={() => gameMode !== 'typeQuiz' && handleMarkerClick(item)} style={{ cursor: gameMode === 'typeQuiz' ? 'default' : 'pointer' }} />
                  <circle r={markerRadius} fill={fill} stroke={stroke} strokeWidth={strokeW} onClick={() => gameMode !== 'typeQuiz' && handleMarkerClick(item)} style={{ cursor: gameMode === 'typeQuiz' ? 'default' : 'pointer' }} />
                </Marker>
              );
            })}

          {/* Regions (text labels, pink) */}
          {(gameMode === 'recon' ? filteredData : europeData)
            .filter(i => i.category === 'region')
            .map(item => {
              const isCorrect = feedback === 'correct' && item.id === currentQuestion?.target.id;
              const isWrong = wrongAnswer === item.id;
              const isTypeQuizHighlight = gameMode === 'typeQuiz' && item.id === typeQuizHighlightedItem?.id;
              const isTypeQuizCorrect = gameMode === 'typeQuiz' && feedback === 'correct' && item.id === typeQuizHighlightedItem?.id;
              const isTypeQuizWrong = gameMode === 'typeQuiz' && feedback === 'wrong' && item.id === typeQuizHighlightedItem?.id;

              const bgFill = isTypeQuizCorrect ? '#86efac' : isTypeQuizWrong ? '#fca5a5' : isTypeQuizHighlight ? '#f0abfc' : isCorrect ? '#86efac' : isWrong ? '#fca5a5' : '#f9a8d4';
              const textColor = isTypeQuizCorrect ? '#16a34a' : isTypeQuizWrong ? '#dc2626' : isTypeQuizHighlight ? '#d946ef' : isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#9d174d';
              const scale = 1 / position.zoom;
              const fontSize = Math.max(4, 9 * scale);
              const padX = 6 * scale;
              const padY = 3 * scale;
              const rectW = Math.max(20, (lang === 'nl' ? item.dutchName.length : item.englishName.length) * fontSize * 0.65 + padX * 2);
              const rectH = fontSize + padY * 2;

              return (
                <Marker key={item.id} coordinates={item.coordinates}>
                  <rect
                    x={-rectW / 2} y={-rectH / 2}
                    width={rectW} height={rectH}
                    rx={2 * scale} ry={2 * scale}
                    fill={bgFill} fillOpacity={0.85}
                    stroke={textColor} strokeWidth={Math.max(0.5, 1.2 * scale)}
                    onClick={() => gameMode !== 'typeQuiz' && handleMarkerClick(item)}
                    style={{ cursor: gameMode === 'typeQuiz' ? 'default' : 'pointer' }}
                  />
                  <text
                    textAnchor="middle" dominantBaseline="central"
                    fontSize={fontSize} fontWeight="bold" fill={textColor}
                    onClick={() => gameMode !== 'typeQuiz' && handleMarkerClick(item)}
                    style={{ cursor: gameMode === 'typeQuiz' ? 'default' : 'pointer', fontFamily: 'Nunito, sans-serif', userSelect: 'none' }}
                  >
                    {lang === 'nl' ? item.dutchName : item.englishName}
                  </text>
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* Zoom controls */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-2 z-20">
          <button
            onClick={handleZoomIn}
            disabled={position.zoom >= 8}
            className="w-12 h-12 bg-white/90 text-slate-700 rounded-xl shadow-lg flex items-center justify-center text-2xl font-bold active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ touchAction: 'manipulation' }}
            title={t.zoomIn}
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            disabled={position.zoom <= 1}
            className="w-12 h-12 bg-white/90 text-slate-700 rounded-xl shadow-lg flex items-center justify-center text-2xl font-bold active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ touchAction: 'manipulation' }}
            title={t.zoomOut}
          >
            −
          </button>
          {position.zoom > 1 && (
            <button
              onClick={handleZoomReset}
              className="w-12 h-12 bg-orange-500 text-white rounded-xl shadow-lg flex items-center justify-center text-sm font-bold active:scale-95"
              style={{ touchAction: 'manipulation' }}
              title={t.zoomReset}
            >
              ↺
            </button>
          )}
        </div>

        {/* Zoom tip for first-time users */}
        {position.zoom === 1 && gameMode !== 'menu' && (
          <div className="absolute bottom-3 left-20 bg-slate-800/80 text-white text-xs px-3 py-2 rounded-lg">
            👆 {t.zoomTip}
          </div>
        )}

        {/* Centered popup modal for recon mode */}
        {gameMode === 'recon' && selectedItem && (
          <div
            className="absolute inset-0 flex items-center justify-center z-30 p-4"
            onClick={() => { setSelectedItem(null); setShowWiki(false); setWikiInfo(null); }}
          >
            <div
              className="bg-slate-900 text-white rounded-2xl shadow-2xl overflow-hidden animate-pop-in w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-4 bg-slate-800">
                <span className="text-4xl">{selectedItem.emoji}</span>
                <div className="flex-1">
                  <p className="font-black text-xl" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
                    {lang === 'nl' ? selectedItem.dutchName : selectedItem.englishName}
                  </p>
                  <p className="text-sm text-slate-400">
                    {selectedItem.category === 'capital' && (() => {
                      const country = getCountryForCapital(selectedItem.id);
                      return `${t.capitalOf} ${country ? (lang === 'nl' ? country.dutchName : country.englishName) : ''}`;
                    })()}
                    {selectedItem.category === 'city' && (() => {
                      const country = getCountryForCapital(selectedItem.id);
                      return `${t.cityIn} ${country ? (lang === 'nl' ? country.dutchName : country.englishName) : ''}`;
                    })()}
                    {selectedItem.category === 'country' && t.country}
                    {selectedItem.category === 'water' && t.water}
                    {selectedItem.category === 'mountain' && t.mountainType}
                    {selectedItem.category === 'region' && t.regionType}
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedItem(null); setShowWiki(false); setWikiInfo(null); }}
                  className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center text-xl font-bold active:scale-95"
                  style={{ touchAction: 'manipulation' }}
                >
                  ✕
                </button>
              </div>

              {/* Description and Wikipedia info */}
              <div className="p-4 text-sm text-slate-300 max-h-72 overflow-y-auto border-t border-slate-700">
                {selectedItem.description && !showWiki && (
                  <p className="leading-relaxed text-slate-400">{selectedItem.description}</p>
                )}
                {showWiki && (
                  <>
                    {wikiLoading && <p className="text-center py-6 text-lg">{t.loading}</p>}
                    {!wikiLoading && wikiInfo && (
                      <>
                        {wikiInfo.thumbnail && (
                          <img src={wikiInfo.thumbnail} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />
                        )}
                        {wikiInfo.extract && (
                          <p className="leading-relaxed text-slate-400">{wikiInfo.extract}</p>
                        )}
                      </>
                    )}
                    {!wikiLoading && !wikiInfo && <p className="text-center py-6 text-slate-500">No info available</p>}
                  </>
                )}
              </div>

              {/* Info button */}
              <div className="p-4 border-t border-slate-700">
                <button
                  onClick={() => { if (!showWiki) { setShowWiki(true); fetchWikiInfo(selectedItem); } else { setShowWiki(false); } }}
                  className="w-full py-3 bg-cyan-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-95"
                  style={{ touchAction: 'manipulation' }}
                >
                  <span className="w-6 h-6 bg-white text-cyan-600 rounded-full flex items-center justify-center text-sm font-black">i</span>
                  {showWiki ? t.close : t.moreInfo}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        {gameMode === 'recon' && !selectedItem && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-slate-800/80 rounded-full px-3 py-1.5">
            {[['bg-purple-400', 'border-purple-600', t.countries], ['bg-amber-400', 'border-amber-600', t.capitals], ['bg-orange-400', 'border-orange-600', t.cities], ['bg-blue-400', 'border-blue-600', t.waters], ['bg-emerald-400', 'border-emerald-600', t.mountains], ['bg-pink-400', 'border-pink-600', t.regions]].map(([bg, border, label]) => (
              <div key={label} className="flex items-center gap-1 text-white/90">
                <div className={`w-2.5 h-2.5 rounded-full ${bg} border ${border}`} />
                <span className="text-xs font-bold">{label}</span>
              </div>
            ))}
          </div>
        )}
        </div>

        {/* Sticker Book - Right sidebar */}
        {(gameMode === 'mission' || gameMode === 'typeQuiz') && (
          <div className="w-64 min-h-0 bg-slate-900 rounded-xl shadow-xl border-2 border-slate-600 overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-800 border-b border-slate-700 shrink-0">
              <h3 className="font-black text-base text-white" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
                📖 {t.stickerBook}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {collectedStickers.size}/{europeData.length} {t.collected}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 grid grid-cols-4 gap-2">
              {europeData.map(item => (
                <div
                  key={item.id}
                  className={`aspect-square rounded-lg flex items-center justify-center text-2xl font-bold border-2 transition-all ${
                    collectedStickers.has(item.id)
                      ? 'bg-slate-700 border-cyan-400 shadow-lg shadow-cyan-400/50'
                      : 'bg-slate-800 border-slate-600'
                  }`}
                  title={collectedStickers.has(item.id) ? (lang === 'nl' ? item.dutchName : item.englishName) : '???'}
                >
                  {collectedStickers.has(item.id) ? item.emoji : '❓'}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Centered popup for correct answer - mission mode */}
      {gameMode === 'mission' && feedback === 'correct' && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto"
          onClick={handleContinueToNext}
        >
          <div
            className="bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-3xl shadow-2xl p-8 animate-pop-in text-center max-w-sm relative pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleContinueToNext}
              className="absolute top-2 right-2 w-8 h-8 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center text-lg font-bold transition-colors"
              title={t.clickToContinue}
              style={{ touchAction: 'manipulation' }}
            >
              ✕
            </button>
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-2xl font-black mb-2" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
              {t.correct}
            </p>
            {currentFunFact && (
              <p className="text-sm mt-4 text-white/90 leading-relaxed">
                {currentFunFact}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Centered popup for correct answer - type quiz mode */}
      {gameMode === 'typeQuiz' && feedback === 'correct' && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto"
          onClick={handleTypeQuizNext}
        >
          <div
            className="bg-gradient-to-br from-purple-400 to-pink-500 text-white rounded-3xl shadow-2xl p-8 animate-pop-in text-center max-w-sm relative pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleTypeQuizNext}
              className="absolute top-2 right-2 w-8 h-8 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center text-lg font-bold transition-colors"
              title={t.clickToContinue}
              style={{ touchAction: 'manipulation' }}
            >
              ✕
            </button>
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-2xl font-black mb-2" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
              {t.correct}
            </p>
            <p className="text-lg font-bold mb-2">
              {lang === 'nl' ? typeQuizHighlightedItem?.dutchName : typeQuizHighlightedItem?.englishName}
            </p>
            {currentFunFact && (
              <p className="text-sm mt-4 text-white/90 leading-relaxed">
                {currentFunFact}
              </p>
            )}
          </div>
        </div>
      )}

      {(gameMode === 'mission' || gameMode === 'typeQuiz') && feedback === 'correct' && <Confetti />}
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState('start');
  const [words, setWords] = useState(defaultWords);

  return (
    <>
      {mode === 'start' && <StartScreen onStart={(m) => setMode(m)} />}
      {mode === 'english-menu' && <EnglishMenu onStart={(m) => setMode(m)} onBack={() => setMode('start')} onManageWords={() => setMode('manage')} />}
      {mode === 'learn' && <LearnMode words={words} onBack={() => setMode('english-menu')} />}
      {mode === 'practice-nl-en' && <PracticeMode words={words} onBack={() => setMode('english-menu')} direction="nl-en" />}
      {mode === 'practice-en-nl' && <PracticeMode words={words} onBack={() => setMode('english-menu')} direction="en-nl" />}
      {mode === 'sentences' && <SentenceMode words={words} onBack={() => setMode('english-menu')} />}
      {mode === 'test' && <TestMode words={words} onBack={() => setMode('english-menu')} />}
      {mode === 'europe' && <EuropeExplorer onBack={() => setMode('start')} />}
      {mode === 'calculator' && <Calculator onBack={() => setMode('start')} />}
      {mode === 'manage' && <ManageWords words={words} setWords={setWords} onBack={() => setMode('english-menu')} />}
    </>
  );
}
