export type Status = 'correct' | 'present' | 'absent';

export interface LetterStatus {
  letter: string;
  status: Status;
}
