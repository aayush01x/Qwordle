interface TileProps {
    letter?: string;
    status?: 'correct' | 'present' | 'absent' | 'default';
  }
  
  export default function Tile({ letter = '', status = 'default' }: TileProps) {
    const statusClasses = {
      correct: 'bg-green-600 border-green-600 text-white',
      present: 'bg-yellow-500 border-yellow-500 text-white',
      absent: 'bg-gray-500 border-gray-500 text-white',
      default: 'bg-white border-gray-300 text-black',
    };
  
    return (
      <div
        className={`border-2 ${statusClasses[status]} 
        text-2xl font-bold uppercase flex items-center justify-center 
        h-14 w-14`}
      >
        {letter}
      </div>
    );
  }
  