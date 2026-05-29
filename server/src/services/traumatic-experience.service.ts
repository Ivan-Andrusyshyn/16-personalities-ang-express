import possibleVariablesArray from '../content/traumatic-sensitivity/possibleVariablesArray';
import { testResult } from '../content/traumatic-sensitivity/results';
import { Answer } from '../types/common-tests';
import { Scores, TypeInformation } from '../types/traumatic-sensitivity';
import findBestRate from '../utils/traumatic-experience/findBestRate';
import getBlockGradation from '../utils/traumatic-experience/getBlockGradation';
import getSensitivityRateGrade from '../utils/traumatic-experience/getSensitivityRateGrade';
import getTypeByAllScoresNumber from '../utils/traumatic-experience/getTypeByAllScoresNumber';

class TraumaticSensitivityService {
  countPersonPercentages = (answers: Answer) => {
    const scores: Scores = { E: 0, T: 0, W: 0, B: 0, R: 0, F: 0 };
    let sensitivityRate = 0;
    for (const [questionId, answer] of Object.entries(answers)) {
      const [points, letter] = answer.split('-');
      if (scores.hasOwnProperty(letter)) {
        sensitivityRate += Number(points);
        scores[letter as keyof Scores] += Number(points);
      }
    }

    const typePairs: [keyof Scores, keyof Scores][] = [
      ['E', 'T'],
      ['W', 'B'],
      ['F', 'R'],
    ];
    const sensitivityRateGrade = getSensitivityRateGrade(sensitivityRate);
    const gradatedLetters: any = { C: sensitivityRateGrade };
    const percentages: Partial<Scores> = {};

    for (const [type1, type2] of typePairs) {
      const totalScore = scores[type1] + scores[type2];

      percentages[type1] =
        totalScore > 0 ? Math.round((scores[type1] / totalScore) * 100) : 50;
      percentages[type2] = (100 - percentages[type1]) as number;

      gradatedLetters[type1] = getBlockGradation(scores[type1]);
      gradatedLetters[type2] = getBlockGradation(scores[type2]);
    }

    const { minScoreNumber, maxScoreNumber } =
      this.findTheSmallestAndBiggestNumber(scores);

    const sensitivityType = getTypeByAllScoresNumber(sensitivityRate);
    const matchResults = findBestRate(gradatedLetters, possibleVariablesArray);
    const originMatchResults = `C${sensitivityRateGrade}-E${gradatedLetters.E}-T${gradatedLetters.T}-W${gradatedLetters.W}-B${gradatedLetters.B}-F${gradatedLetters.F}-R${gradatedLetters.R}`;

    return {
      percentages,
      scores,
      matchResults,
      originMatchResults,
      sensitivityType,
      minScoreNumber,
      maxScoreNumber,
    };
  };

  getReults(variableType: string): any {
    const variablesResult: TypeInformation[] = testResult;

    const r = variablesResult.find((r) => r.resultCode === variableType);

    return r;
  }

  findTheSmallestAndBiggestNumber(scores: Scores) {
    const entries = Object.entries(scores);

    const minEntry = entries.reduce((min, entry) =>
      entry[1] < min[1] ? entry : min,
    );

    const maxEntry = entries.reduce((max, entry) =>
      entry[1] > max[1] ? entry : max,
    );

    return {
      minScoreNumber: `${[minEntry[0]]}-${minEntry[1]}`,
      maxScoreNumber: `${[maxEntry[0]]}-${maxEntry[1]}`,
    };
  }
}

const traumaticSensitivityService = new TraumaticSensitivityService();

export default traumaticSensitivityService;
