import { traumaticSensitivityQu } from '../../content/traumatic-sensitivity/traumatic-sensitivity';
import { Question } from '../../types/common-tests';

const createTraumaticSensitivityTest = (): Question[] =>
  traumaticSensitivityQu.map((q, i) => {
    return {
      ...q,
      id: i + 1,
      answers: q.answers.map((answ, i) => ({
        text: q.answers[q.answers.length - 1 - i],
        point: i,
        type: getTypeByQuestionBlock(q.block),
      })),
    };
  });

function getTypeByQuestionBlock(block: string) {
  switch (block) {
    case 'Емоційна чутливість':
      return 'E';
    case 'Травматична чуттєвість':
      return 'T';
    case 'Чутливість до критики роботи':
      return 'W';
    case 'Чутливість до критики стосунків':
      return 'R';
    case 'Чутливість до критики сім’ї':
      return 'F';
    case 'Чутливість до критики тіла':
      return 'B';
    default:
      return '';
  }
}

export default createTraumaticSensitivityTest;
