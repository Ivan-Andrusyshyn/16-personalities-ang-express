import {
  Answer,
  PersonalityKey,
  Question,
  Scores,
} from '../types/16-personalities';

class BeYourSelfService {
  amountQuestionsInType = (qlist: Question[]): Record<string, number> => {
    const letterCount: Record<string, number> = {
      EI: 0,
      SN: 0,
      TF: 0,
      JP: 0,
    };

    qlist.forEach((q) => {
      const types = new Set<string>();

      q.answers.forEach((answer) => {
        if (['E', 'I'].includes(answer.type)) types.add('EI');
        else if (['S', 'N'].includes(answer.type)) types.add('SN');
        else if (['T', 'F'].includes(answer.type)) types.add('TF');
        else if (['J', 'P'].includes(answer.type)) types.add('JP');
      });

      types.forEach((type) => {
        letterCount[type] += 1;
      });
    });

    return letterCount;
  };
  countPersonPercentages = (
    answers: Answer,
    amountQuestions: Record<string, number>
  ) => {
    const scores: Scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    for (const [questionId, answer] of Object.entries(answers)) {
      const [points, letter] = answer.split('-');
      if (scores.hasOwnProperty(letter)) {
        scores[letter as keyof Scores] += Number(points);
      }
    }

    const typePairs: [keyof Scores, keyof Scores][] = [
      ['E', 'I'],
      ['S', 'N'],
      ['T', 'F'],
      ['J', 'P'],
    ];
    const maxScoreOnOneAnswer = 3;

    const percentages: Partial<Scores> = {};
    for (const [type1, type2] of typePairs) {
      const totalQuestions = amountQuestions[`${type1}${type2}`] || 0;

      if (totalQuestions > 0) {
        const maxScore = totalQuestions * maxScoreOnOneAnswer;
        const totalScore = scores[type1] + scores[type2];

        percentages[type1] =
          totalScore > 0 ? Math.round((scores[type1] / totalScore) * 100) : 50;
        percentages[type2] = 100 - percentages[type1];
      }
    }

    return { percentages, scores };
  };
  getPersonalityType = (scores: Scores): string => {
    const typeName = this.getCodedTypeName(scores);
    return this.getPersonNameByType(typeName);
  };

  getCodedTypeName(scores: Scores): PersonalityKey {
    const firstLetter = scores.E > scores.I ? 'E' : 'I';
    const secondLetter = scores.N > scores.S ? 'N' : 'S';
    const thirdLetter = scores.F > scores.T ? 'F' : 'T';
    const fourthLetter = scores.J > scores.P ? 'J' : 'P';

    return `${firstLetter}${secondLetter}${thirdLetter}${fourthLetter}`;
  }

  getPersonNameByType(personalityType: string): string {
    const personalities: Record<string, string> = {
      ISFJ: 'Захисник',
      ISTJ: 'Адміністратор',
      INFJ: 'Адвокат',
      INTJ: 'Архітектор',
      ISFP: 'Авантюрист',
      ISTP: 'Віртуоз',
      INFP: 'Посередник',
      INTP: 'Вчений',
      ESFJ: 'Консул',
      ESTJ: 'Керівник',
      ENFJ: 'Протагоніст',
      ENTJ: 'Командир',
      ESFP: 'Шоумен',
      ESTP: 'Підприємець',
      ENFP: 'Борець',
      ENTP: 'Полеміст',
    };

    return personalities[personalityType] || 'Невідомий тип';
  }
}

const beYourSelfService = new BeYourSelfService();

export default beYourSelfService;
