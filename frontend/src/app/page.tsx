// app/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Grid from '../components/Grid';
import Keyboard from '../components/Keyboard';
import { LetterStatus, Status } from '@/types/types';

export default function Home() {
  const [guesses, setGuesses] = useState<Array<Array<LetterStatus>>>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [usedKeys, setUsedKeys] = useState<Record<string, Status>>({});
  const solution = 'react';

  const checkGuess = useCallback(
    (guess: string): Array<LetterStatus> => {
      const result: Array<LetterStatus> = [];
      const solutionArray = solution.split('');

      guess.split('').forEach((letter, i) => {
        if (letter === solutionArray[i]) {
          result.push({ letter, status: 'correct' });
          setUsedKeys((prev) => ({ ...prev, [letter]: 'correct' }));
        } else if (solutionArray.includes(letter)) {
          result.push({ letter, status: 'present' });
          setUsedKeys((prev) => {
            if (prev[letter] !== 'correct') {
              return { ...prev, [letter]: 'present' };
            }
            return prev;
          });
        } else {
          result.push({ letter, status: 'absent' });
          setUsedKeys((prev) => ({ ...prev, [letter]: 'absent' }));
        }
      });

      return result;
    },
    [solution, setUsedKeys]
  );

  const onKeyPress = useCallback(
    (key: string) => {
      if (key === 'Enter') {
        if (currentGuess.length !== 5) return;
        const guessResult = checkGuess(currentGuess);
        setGuesses((prevGuesses) => [...prevGuesses, guessResult]);
        setCurrentGuess('');
      } else if (key === 'Back') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (currentGuess.length < 5 && /^[A-Za-z]$/.test(key)) {
        setCurrentGuess((prev) => prev + key.toLowerCase());
      }
    },
    [currentGuess, checkGuess]
  );

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      let key = e.key;
      if (key === 'Backspace') key = 'Back';
      else if (key === 'Enter') key = 'Enter';
      else key = key.toUpperCase();

      onKeyPress(key);
    };
    window.addEventListener('keyup', handleKeyup);

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [onKeyPress]);

  return (
    <div className="max-w-md mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Wordle</h1>
      </header>
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard onKeyPress={onKeyPress} usedKeys={usedKeys} />
    </div>
  );
}
