import { phrasesArray } from '../content/16-personality/phrases/phrases-array';

const personalityTypes = [
  'ENFJ',
  'ENFP',
  'ENTJ',
  'ENTP',
  'ESFJ',
  'ESFP',
  'ESTJ',
  'ESTP',
  'INFJ',
  'INFP',
  'INTJ',
  'INTP',
  'ISFJ',
  'ISFP',
  'ISTJ',
  'ISTP',
];

class PersonalitiesPhraseService {
  getAllDayPhrases(): {
    dayNumber: number;
    dayPhrases: { personalityType: string; phrase: string }[];
  } {
    const today = new Date().getDate() - 1;
    const dayPhrases = [];

    for (let i = 0; i < phrasesArray.length; i++) {
      const personalityType = personalityTypes[i];
      const phrase = phrasesArray[i][today];

      if (phrase) {
        dayPhrases.push({ personalityType, phrase });
      }
    }

    return { dayPhrases, dayNumber: today + 1 };
  }
}

export const personalitiesPhraseService = new PersonalitiesPhraseService();
