type Dichotomy = 'EI' | 'SN' | 'TF' | 'JP';
interface Answer {
  point: number;
  text: string;
  type: string;
}
type Question = {
  id: number;
  question: string;
  answers: Answer[];
};

interface Scores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

type TestResult = {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
};
type PersonalityKey =
  | 'ISFJ'
  | 'ISTJ'
  | 'INFJ'
  | 'INTJ'
  | 'ISFP'
  | 'ISTP'
  | 'INFP'
  | 'INTP'
  | 'ESFJ'
  | 'ESTJ'
  | 'ENFJ'
  | 'ENTJ'
  | 'ESFP'
  | 'ESTP'
  | 'ENFP'
  | 'ENTP';

export { Answer, Question, PersonalityKey, Scores, TestResult, Dichotomy };
