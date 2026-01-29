import React, { useState, useEffect, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { europeData, getRandomFunFact, getCountryForCapital, wikiSearchTerms } from './data/europeData';

// Unit 2 woordenlijst - Engels voor Siem
const defaultWords = [
  { dutch: 'boven zeeniveau', english: 'above sea level', sentence: 'This small island is above sea level.', emoji: '🏝️' },
  { dutch: 'vliegveld', english: 'airport', sentence: 'Schiphol is an airport in the Netherlands.', emoji: '✈️' },
  { dutch: 'mooi, knap, aantrekkelijk', english: 'attractive', sentence: 'These waterfalls are very attractive.', emoji: '💐' },
  { dutch: 'onder zeeniveau', english: 'below sea level', sentence: 'A large part of the Netherlands is below sea level.', emoji: '🌊' },
  { dutch: 'kanaal, gracht', english: 'canal', sentence: 'Tourists enjoy the canals of Venice in Italy by boat.', emoji: '🚣' },
  { dutch: 'hoofdstad', english: 'capital', sentence: 'Amsterdam is the capital of the Netherlands.', emoji: '🏛️' },
  { dutch: 'stad', english: 'city', sentence: 'Bangkok is a huge city in Thailand.', emoji: '🌆' },
  { dutch: 'land', english: 'country', sentence: 'There are many countries in the world.', emoji: '🌍' },
  { dutch: 'dijk', english: 'dyke', sentence: 'Dykes protect the land from the sea.', emoji: '🧱' },
  { dutch: 'enorm, heel groot', english: 'enormous', sentence: 'These flats are enormous!', emoji: '🏢' },
  { dutch: 'plat', english: 'flat', sentence: 'The Netherlands are a flat country.', emoji: '🌾' },
  { dutch: 'haven', english: 'harbour', sentence: 'The ship has arrived in the harbour.', emoji: '⚓' },
  { dutch: 'heuvelachtig', english: 'hilly', sentence: 'This hilly landscape is beautiful.', emoji: '⛰️' },
  { dutch: 'groot', english: 'huge', sentence: "This tree is so huge you can't see the top.", emoji: '🌳' },
  { dutch: 'inwoner', english: 'inhabitant', sentence: 'The Netherlands has about 17 million inhabitants.', emoji: '👥' },
  { dutch: 'monument', english: 'monument', sentence: 'The Statue of Liberty monument is very famous.', emoji: '🗽' },
  { dutch: 'snelweg', english: 'motorway', sentence: 'A lot of trucks and cars drive on the motorway.', emoji: '🛣️' },
  { dutch: 'berg', english: 'mountain', sentence: 'If you climb this mountain you are higher than the clouds!', emoji: '🏔️' },
  { dutch: 'buur, buurman, buurvrouw', english: 'neighbour', sentence: 'Our neighbours have the same front door as us.', emoji: '🏘️' },
  { dutch: 'buurt, wijk', english: 'neighbourhood', sentence: 'In New York there is a Chinese neighbourhood.', emoji: '🏙️' },
  { dutch: 'rivier', english: 'river', sentence: 'The river Thames flows through London.', emoji: '🏞️' },
  { dutch: 'plein', english: 'square', sentence: 'Times Square is a busy square.', emoji: '🎭' },
  { dutch: 'heel klein', english: 'tiny', sentence: "A tiny baby kangaroo is sitting in its mother's pouch.", emoji: '🦘' },
  { dutch: 'toeristische attractie', english: 'tourist attraction', sentence: 'Versailles is a tourist attraction in Paris.', emoji: '🏰' },
  { dutch: 'metro', english: 'underground', sentence: 'The underground is a fast way to travel around a big city.', emoji: '🚇' },
  { dutch: 'dorp', english: 'village', sentence: 'I live in a small village with only 800 inhabitants.', emoji: '🏡' },
  { dutch: 'windmolen', english: 'windmill', sentence: 'There are old and new windmills in the Netherlands.', emoji: '🌀' },
  { dutch: 'Woon je graag in...?', english: 'Do you like living in...?', sentence: 'Do you like living in Scotland?', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { dutch: '...is geweldig, want...', english: '...is great, because...', sentence: 'This theme park is great, because I like roller coasters.', emoji: '🎢' },
  { dutch: 'Hoe is het om in ... te wonen?', english: "What's it like living in...?", sentence: "What's it like living in New York?", emoji: '🗽' },
  { dutch: 'roltrap', english: 'escalator', sentence: "You don't have to walk when you use the escalator.", emoji: '🛗' },
  { dutch: 'jas', english: 'jacket', sentence: 'His jacket is very colourful.', emoji: '🧥' },
  { dutch: 'landschap', english: 'landscape', sentence: 'Tourists love the typical Dutch landscape.', emoji: '🖼️' },
  { dutch: 'zitplaats, stoel', english: 'seat', sentence: 'All the seats in the train are taken.', emoji: '💺' },
  { dutch: 'overstromen', english: 'to flood', sentence: 'The street is flooded.', emoji: '🌧️' },
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

const StartScreen = ({ onStart, onManageWords }) => (
  <div className="screen-scroll safe-area-pad bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 flex items-center justify-center p-8">
    <div className="text-center w-full max-w-lg">
      <div className="mb-8">
        <span className="text-9xl block animate-bounce">📚</span>
      </div>
      <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 mb-4" 
          style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
        Unit 2 - Engels
      </h1>
      <p className="text-2xl text-orange-700 mb-10" style={{ fontFamily: 'Nunito, sans-serif' }}>
        Oefen je woordjes voor de toets!
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

        <BigButton onClick={() => onStart('europe')} color="bg-gradient-to-r from-slate-600 to-emerald-700">
          <span className="text-4xl">🗺️</span> Europe Explorer
        </BigButton>

        <button
          onClick={onManageWords} 
          className="w-full max-w-md py-4 px-8 bg-white/80 text-orange-600 text-xl font-bold rounded-3xl shadow-lg 
          active:scale-95 transition-all border-3 border-orange-200 mt-6 flex items-center justify-center gap-3"
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
    const isCorrect = correctAnswers.some(answer => userAnswer === answer);
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
    const isCorrect = correctAnswers.some(answer => userAnswer === answer);
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

  // Helper to get random fun fact - uses imported function from europeData.ts

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

  // Wikipedia state
  const [wikiInfo, setWikiInfo] = useState(null);
  const [wikiLoading, setWikiLoading] = useState(false);
  const [showWiki, setShowWiki] = useState(false);
  const wikiCache = React.useRef({});

  // Collection state - track collected stickers
  const [collectedStickers, setCollectedStickers] = useState(new Set());

  // Zoom state for map
  const [position, setPosition] = useState({ coordinates: [15, 52], zoom: 1 });

  const handleZoomIn = useCallback(() => {
    if (position.zoom >= 8) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  }, [position.zoom]);

  const handleZoomOut = useCallback(() => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  }, [position.zoom]);

  const handleZoomReset = useCallback(() => {
    setPosition({ coordinates: [15, 52], zoom: 1 });
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
    waters: 'Wateren',
    mountains: 'Gebergten',
    back: '← Terug',
    correct: '✓ Goed zo!',
    wrong: '✗ Probeer opnieuw!',
    missionComplete: 'Missie Voltooid!',
    score: 'Score',
    menu: '← Menu',
    again: '🔄 Opnieuw',
    country: 'Land',
    capital: 'Hoofdstad',
    water: 'Water',
    mountainType: 'Gebergte',
    capitalOf: 'Hoofdstad van',
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
  } : {
    title: 'Europe Explorer',
    subtitle: 'Geography Mission',
    recon: 'Reconnaissance',
    mission: 'Start Mission',
    reconShort: 'Recon',
    missionShort: 'Mission',
    countries: 'Countries',
    capitals: 'Capitals',
    waters: 'Waters',
    mountains: 'Mountains',
    back: '← Back',
    correct: '✓ Correct!',
    wrong: '✗ Try again!',
    missionComplete: 'Mission Complete!',
    score: 'Score',
    menu: '← Menu',
    again: '🔄 Again',
    country: 'Country',
    capital: 'Capital',
    water: 'Water',
    mountainType: 'Mountains',
    capitalOf: 'Capital of',
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
  };

  const filteredData = filter === 'all' ? europeData : europeData.filter(d => d.category === filter);

  // Fetch Wikipedia info with fun facts (for recon mode)
  const fetchWikiInfo = async (item) => {
    const cacheKey = `${item.id}-${lang}`;
    if (wikiCache.current[cacheKey]) {
      // Get a fresh random fun fact even from cache
      const cached = wikiCache.current[cacheKey];
      setWikiInfo({ ...cached, funFact: getRandomFunFact(item.id) });
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
        // Ensure extract has at least 2 paragraphs by combining with description if needed
        let extract = data.extract || '';
        if (extract.length < 300 && item.description) {
          extract = extract ? `${extract}\n\n${item.description}` : item.description;
        }
        const info = {
          title: data.title,
          extract: extract,
          thumbnail: data.thumbnail?.source,
          funFact: getRandomFunFact(item.id),
        };
        // Cache without funFact so we can pick fresh random fact each time
        wikiCache.current[cacheKey] = { title: data.title, extract: extract, thumbnail: data.thumbnail?.source };
        setWikiInfo(info);
      } else {
        // If Wikipedia fails, still show fun fact
        const funFact = getRandomFunFact(item.id);
        if (funFact) {
          const info = { title: lang === 'nl' ? item.dutchName : item.englishName, extract: null, thumbnail: null, funFact };
          setWikiInfo(info);
        }
      }
    } catch (err) {
      console.log('Wiki fetch failed:', err);
      // If fetch fails, still show fun fact
      const funFact = getRandomFunFact(item.id);
      if (funFact) {
        const info = { title: lang === 'nl' ? item.dutchName : item.englishName, extract: null, thumbnail: null, funFact };
        setWikiInfo(info);
      }
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
    setPosition({ coordinates: [15, 52], zoom: 1 }); // Reset zoom
    setGameMode('mission');
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
        setCurrentFunFact(getRandomFunFact(item.id));
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
    europeData.filter(d => d.category === 'country').forEach(c => { map[c.englishName] = c; });
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
        </div>
        <div className="mt-8 grid grid-cols-4 gap-3 text-center">
          <div className="bg-white/10 rounded-2xl p-3">
            <span className="text-2xl block">🌍</span>
            <p className="text-emerald-200 font-bold mt-1 text-sm">14 {t.countries}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3">
            <span className="text-2xl block">🏛️</span>
            <p className="text-emerald-200 font-bold mt-1 text-sm">14 {t.capitals}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3">
            <span className="text-2xl block">🌊</span>
            <p className="text-emerald-200 font-bold mt-1 text-sm">12 {t.waters}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3">
            <span className="text-2xl block">⛰️</span>
            <p className="text-emerald-200 font-bold mt-1 text-sm">4 {t.mountains}</p>
          </div>
        </div>
      </div>
    );
  }

  // Mission complete screen
  if (missionComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const emoji = percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : percentage >= 40 ? '👍' : '💪';
    return (
      <div className="screen-scroll safe-area-pad bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-900 flex flex-col items-center justify-center p-6">
        {percentage >= 80 && <Confetti />}
        <div className="bg-white/95 rounded-3xl shadow-2xl p-8 w-full max-w-lg border-4 border-emerald-300 text-center">
          <span className="text-8xl mb-4 block animate-bounce">{emoji}</span>
          <h2 className="text-4xl font-black text-emerald-700 mb-4" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
            {t.missionComplete}
          </h2>
          <p className="text-2xl text-emerald-600 mb-4">
            {t.score}: <span className="font-bold">{score}</span> / <span className="font-bold">{totalQuestions}</span>
          </p>
          <div className="w-full bg-emerald-100 rounded-full h-6 mb-4">
            <div className="h-6 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 transition-all duration-1000" style={{ width: `${percentage}%` }} />
          </div>
          <p className="text-3xl font-bold text-emerald-600 mb-6">{percentage}%</p>
          <div className="flex gap-4">
            <button onClick={() => setGameMode('menu')} className="flex-1 py-5 px-4 bg-gray-200 text-gray-600 font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>
              {t.menu}
            </button>
            <button onClick={startMission} className="flex-1 py-5 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl text-xl shadow-lg active:scale-95 transition-all" style={{ touchAction: 'manipulation' }}>
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
          onClick={() => { setGameMode('menu'); setSelectedItem(null); setFeedback(null); setPosition({ coordinates: [15, 52], zoom: 1 }); }}
          className="px-3 py-2 bg-white/20 text-white font-bold rounded-xl active:scale-95 transition-all text-sm"
          style={{ touchAction: 'manipulation', minHeight: '44px' }}
        >
          {t.back}
        </button>
        <h2 className="text-lg font-black text-white" style={{ fontFamily: 'Fredoka, Comic Sans MS, cursive' }}>
          {gameMode === 'recon' ? `🔍 ${t.reconShort}` : `🎯 ${t.missionShort}`}
        </h2>
        {gameMode === 'mission' && (
          <div className="px-3 py-2 bg-white/20 text-white font-bold rounded-xl text-sm" style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>
            {score}/{totalQuestions}
          </div>
        )}
        {gameMode === 'recon' && (
          <div className="flex gap-1">
            {[['all', 'All'], ['country', '🌍'], ['capital', '🏛️'], ['water', '🌊'], ['mountain', '⛰️']].map(([key, label]) => (
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

      {/* Main content area - flex row for map and sticker book */}
      <div className="flex-1 min-h-0 flex gap-3 px-3 pb-3">
        {/* Map container */}
        <div className="relative flex-1 min-h-0 rounded-xl shadow-xl border-2 border-slate-600 overflow-hidden" style={{ backgroundColor: '#a8d5e2' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [15, 52], scale: 700 }}
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

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleMarkerClick(countryItem)}
                      fill={isCorrect ? '#86efac' : isWrong ? '#fca5a5' : isSelected ? '#d8b4fe' : '#c4b5fd'}
                      stroke={isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#7c3aed'}
                      strokeWidth={1.5}
                      style={{ default: { outline: 'none', cursor: 'pointer', pointerEvents: 'auto' }, hover: { outline: 'none', fill: '#ddd6fe' }, pressed: { outline: 'none' } }}
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
            const fill = isCorrect ? '#86efac' : isWrong ? '#fca5a5' : isSelected ? '#6ee7b7' : '#34d39988';
            const stroke = isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#059669';
            // Scale inversely with zoom
            const scale = 1 / position.zoom;
            const touchRx = Math.max(10, 30 * scale);
            const touchRy = Math.max(7, 20 * scale);

            return (
              <Marker key={item.id} coordinates={item.coordinates}>
                <ellipse rx={touchRx} ry={touchRy} fill="transparent" onClick={() => handleMarkerClick(item)} style={{ cursor: 'pointer' }} />
                <g transform={`scale(${scale})`}>
                  <polygon points="-15,6 -8,-5 -2,3 5,-8 11,1 17,6" fill={fill} stroke={stroke} strokeWidth={1.5} strokeLinejoin="round" onClick={() => handleMarkerClick(item)} style={{ cursor: 'pointer' }} />
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
              const fill = isCorrect ? '#86efac' : isWrong ? '#fca5a5' : '#60a5fa';
              const stroke = isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#2563eb';
              // Scale inversely with zoom - keeps apparent screen size constant
              const scale = 1 / position.zoom;
              // Touch target: large enough to tap, but scales down to reduce overlap
              const touchRadius = Math.max(4, 12 * scale);
              // Visual marker: stays visible at all zoom levels
              const markerRadius = Math.max(2, (isCorrect ? 8 : 5) * scale);
              const strokeW = Math.max(0.5, 1.5 * scale);

              return (
                <Marker key={item.id} coordinates={item.coordinates}>
                  <circle r={touchRadius} fill="transparent" onClick={() => handleMarkerClick(item)} style={{ cursor: 'pointer' }} />
                  <circle r={markerRadius} fill={fill} stroke={stroke} strokeWidth={strokeW} onClick={() => handleMarkerClick(item)} style={{ cursor: 'pointer' }} />
                </Marker>
              );
            })}

          {/* Capitals (render last, on top of waters) */}
          {(gameMode === 'recon' ? filteredData : europeData)
            .filter(i => i.category === 'capital')
            .map(item => {
              const isCorrect = feedback === 'correct' && item.id === currentQuestion?.target.id;
              const isWrong = wrongAnswer === item.id;
              const fill = isCorrect ? '#86efac' : isWrong ? '#fca5a5' : '#fbbf24';
              const stroke = isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#d97706';
              // Scale inversely with zoom - keeps apparent screen size constant
              const scale = 1 / position.zoom;
              // Touch target: large enough to tap, but scales down to reduce overlap
              const touchRadius = Math.max(4, 15 * scale);
              // Visual marker: stays visible at all zoom levels
              const markerRadius = Math.max(2, (isCorrect ? 8 : 5) * scale);
              const strokeW = Math.max(0.5, 1.5 * scale);

              return (
                <Marker key={item.id} coordinates={item.coordinates}>
                  <circle r={touchRadius} fill="transparent" onClick={() => handleMarkerClick(item)} style={{ cursor: 'pointer' }} />
                  <circle r={markerRadius} fill={fill} stroke={stroke} strokeWidth={strokeW} onClick={() => handleMarkerClick(item)} style={{ cursor: 'pointer' }} />
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
                    {selectedItem.category === 'country' && t.country}
                    {selectedItem.category === 'water' && t.water}
                    {selectedItem.category === 'mountain' && t.mountainType}
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
                {selectedItem.description && (
                  <p className="mb-4 leading-relaxed text-slate-400">{selectedItem.description}</p>
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
            {[['bg-purple-400', 'border-purple-600', t.countries], ['bg-amber-400', 'border-amber-600', t.capitals], ['bg-blue-400', 'border-blue-600', t.waters], ['bg-emerald-400', 'border-emerald-600', t.mountains]].map(([bg, border, label]) => (
              <div key={label} className="flex items-center gap-1 text-white/90">
                <div className={`w-2.5 h-2.5 rounded-full ${bg} border ${border}`} />
                <span className="text-xs font-bold">{label}</span>
              </div>
            ))}
          </div>
        )}
        </div>

        {/* Sticker Book - Right sidebar */}
        {gameMode === 'mission' && (
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

      {/* Centered popup for correct answer */}
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

      {feedback === 'correct' && <Confetti />}
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState('start');
  const [words, setWords] = useState(defaultWords);
  
  return (
    <>
      {mode === 'start' && <StartScreen onStart={(m) => setMode(m)} onManageWords={() => setMode('manage')} />}
      {mode === 'learn' && <LearnMode words={words} onBack={() => setMode('start')} />}
      {mode === 'practice-nl-en' && <PracticeMode words={words} onBack={() => setMode('start')} direction="nl-en" />}
      {mode === 'practice-en-nl' && <PracticeMode words={words} onBack={() => setMode('start')} direction="en-nl" />}
      {mode === 'sentences' && <SentenceMode words={words} onBack={() => setMode('start')} />}
      {mode === 'test' && <TestMode words={words} onBack={() => setMode('start')} />}
      {mode === 'europe' && <EuropeExplorer onBack={() => setMode('start')} />}
      {mode === 'manage' && <ManageWords words={words} setWords={setWords} onBack={() => setMode('start')} />}
    </>
  );
}
