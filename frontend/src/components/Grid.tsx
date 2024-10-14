import Tile from './Tile';

interface LetterStatus {
  letter: string;
  status: 'correct' | 'present' | 'absent';
}

interface GridProps {
  guesses: Array<Array<LetterStatus>>;
  currentGuess: string;
}

export default function Grid({ guesses, currentGuess }: GridProps) {
  const emptyRows = Array.from(Array(6 - guesses.length));

  return (
    <div className="grid grid-rows-6 gap-1">
      {guesses.map((guess, i) => (
        <div key={i} className="grid grid-cols-5 gap-1">
          {guess.map((letterObj, j) => (
            <Tile key={j} letter={letterObj.letter} status={letterObj.status} />
          ))}
        </div>
      ))}
      {guesses.length < 6 && (
        <div className="grid grid-cols-5 gap-1">
          {currentGuess.split('').map((letter, i) => (
            <Tile key={i} letter={letter} />
          ))}
          {Array.from(Array(5 - currentGuess.length)).map((_, i) => (
            <Tile key={i} />
          ))}
        </div>
      )}
      {emptyRows.map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-1">
          {Array.from(Array(5)).map((_, j) => (
            <Tile key={j} />
          ))}
        </div>
      ))}
    </div>
  );
}
