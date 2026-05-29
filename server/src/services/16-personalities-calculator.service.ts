import { PersonalityKey } from '../types/16-personalities';

type Matches = [PersonalityKey, PersonalityKey][];

const perfectMatches: Matches = [
  ['ISFJ', 'ESFP'],
  ['ISTJ', 'ESTP'],
  ['INFJ', 'ENFP'],
  ['INTJ', 'ENTP'],
  ['ISFP', 'ESFJ'],
  ['ISTP', 'ESTJ'],
  ['INFP', 'ENFJ'],
  ['INTP', 'ENTJ'],
];

const highMatches: Matches = [
  ['ISFJ', 'ESTP'],
  ['ISTJ', 'ESFP'],
  ['INFJ', 'ENTP'],
  ['INTJ', 'ENFP'],
  ['ISFP', 'ENFJ'],
  ['ISTP', 'ENTJ'],
  ['INFP', 'INFJ'],
  ['INTP', 'ESTJ'],
];
const worstMatches: Matches = [
  ['ISFJ', 'ENTP'],
  ['ESFP', 'INTJ'],
  ['ISTJ', 'ENFP'],
  ['ESTP', 'INFJ'],
  ['ISFP', 'ENTJ'],
  ['ESFJ', 'INTP'],
  ['ESTJ', 'INFP'],
];
const traitCompatibility: Record<string, number> = {
  'E+I': 10,
  'N+N': 40,
  'S+S': 40,
  'F+F': 30,
  'T+T': 30,
  'J+P': 20,
  'I+I': 5,
  'E+E': 5,
  'N+S': 20,
  'F+T': 15,
  'J+J': 10,
  'P+P': 10,
  'T+F': 15,
};
class PersonalitiesCalculatorService {
  getTypeRelationshipByScore(percantages: number): {
    text: string;
    title: string;
  } {
    if (percantages <= 53)
      return { text: 'Паралельні світи', title: 'paralelniSvity' };
    if (percantages >= 53 && percantages <= 70)
      return { text: 'Хиткий міст', title: 'hitkyiMist' };
    if (percantages >= 71 && percantages <= 82)
      return {
        text: 'Глибоке взаєморозуміння',
        title: 'hlybokeVzaiemorozuminnia',
      };

    if (percantages >= 83 && percantages <= 90)
      return { text: 'Справжня гармонія', title: 'spravzhniaHarmoniia' };
    if (percantages >= 91 && percantages <= 100)
      return { text: 'Одна душа на двох', title: 'odnaDushaNaDvoh' };
    else return { text: '', title: '' };
  }

  calculateMatches(pair: [PersonalityKey, PersonalityKey]): number {
    const normalizedPair = pair.sort();
    if (pair[0] === pair[1]) return 81;

    const types = [
      'ENFP',
      'INTP',
      'INTJ',
      'ENTP',
      'ENTJ',
      'ESTP',
      'ESFP',
      'ESFJ',
      'INFJ',
      'ENFJ',
    ];

    if (types.includes(pair[0]) && types.includes(pair[1])) return 76;

    if (this.comparePair(perfectMatches, normalizedPair)) {
      return 100;
    } else if (this.comparePair(highMatches, normalizedPair)) {
      return 90;
    } else if (this.comparePair(worstMatches, normalizedPair)) {
      return 15;
    } else {
      let score = this.calculateTraitCompatibility(pair[0], pair[1]);
      score *= this.getGroupMultiplier(pair[0], pair[1]);
      return Math.round(score);
    }
  }
  private groupMultipliers: Record<string, number> = {
    'ST+NF': 0.8,
    'NF+ST': 0.8,
    'SF+NF': 0.8,
    'NF+SF': 0.8,
    'IJ+IP': 0.8,
    'NT+NF': 0.95,
    'IP+IJ': 0.8,
    'NF+NT': 0.95,
    'EP+FJ': 0.9,
    'EJ+EP': 0.8,
    'EP+EJ': 0.8,
    'EJ+IP': 0.8,
    'IP+EJ': 0.8,
    'EP+IP': 0.9,
    'IP+EP': 0.9,
    'IJ+EJ': 0.9,
    'EJ+IJ': 0.9,
  };

  private calculateTraitCompatibility(
    person1: PersonalityKey,
    person2: PersonalityKey
  ): number {
    let score = 0;

    for (let i = 0; i < 4; i++) {
      const traitPair = [person1[i], person2[i]].sort().join('+');
      score += traitCompatibility[traitPair] ?? 0;
    }

    return score;
  }
  private comparePair(matches: Matches, normalizedPair: [string, string]) {
    return matches.some(
      (p) => p.sort().toString() === normalizedPair.toString()
    );
  }

  private getGroupMultiplier(
    person1: PersonalityKey,
    person2: PersonalityKey
  ): number {
    const group1 = this.getGroup(person1);
    const group2 = this.getGroup(person2);
    const key = [group1, group2].sort().join('+');
    const reversedKey = key.split('+').reverse().join('+');

    if (this.groupMultipliers[key]) return this.groupMultipliers[key];
    if (this.groupMultipliers[reversedKey])
      return this.groupMultipliers[reversedKey];
    else return 1;
  }

  private getGroup(personality: PersonalityKey): string {
    const [first, second, third, fourth] = personality;
    let group = '';

    if (first === 'E' && fourth === 'J') group = 'EJ';
    else if (first === 'E' && fourth === 'P') group = 'EP';
    else if (first === 'I' && fourth === 'J') group = 'IJ';
    else if (first === 'I' && fourth === 'P') group = 'IP';

    if (second === 'N' && third === 'T') return 'NT';
    if (second === 'N' && third === 'F') return 'NF';
    if (second === 'S' && third === 'T') return 'ST';
    if (second === 'S' && third === 'F') return 'SF';

    return group;
  }
}

const personalitiesCalculatorService = new PersonalitiesCalculatorService();

export default personalitiesCalculatorService;
