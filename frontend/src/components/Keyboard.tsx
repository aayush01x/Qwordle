'use client';

import { Button } from "@/components/ui/button"


interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedKeys: Record<string, string>;
}

const keys: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Back'],
];

export default function Keyboard({ onKeyPress, usedKeys }: KeyboardProps) {
  return (
    <div className="mt-8">
      {keys.map((row, i) => (
        <div key={i} className="flex justify-center mb-1">
          {row.map((key) => {
            const lowerKey = key.toLowerCase();
            const status = usedKeys[lowerKey];
            const color =
              status === 'correct'
                ? 'bg-green-600 text-white'
                : status === 'present'
                ? 'bg-yellow-500 text-white'
                : status === 'absent'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-200 text-black';

            return (
              <Button
                key={key}
                className={`m-0.5 h-12 flex-1 ${color} text-sm font-bold uppercase`}
                onClick={() => onKeyPress(key)}
              >
                {key}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
