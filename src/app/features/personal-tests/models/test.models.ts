export type Answers = Record<number, string>;

export type TestName =
  | 'you-coffee'
  | '16-personalities'
  | 'attractiveness'
  | 'traumatic-experience'
  | 'role-in-relationships'
  | 'toxical-relationships';

export interface Question {
  id: number;
  question: string;
  answers: Option[];
}
export interface Option {
  text: string;
  type: string;
  point?: string | number;
}
export type TestResultRequest = {
  answers: Answers;
  userInformation: {
    testPrice: string | null;
    testName: string;
    isPreload: boolean;
    referrer: string;
    routeTracker: string;
    timestamp: string;
    device: string;
  };
};
export type TraitTag = Pick<Trait, 'tag'>;
export interface ICompletedTrait extends Trait {
  completed: boolean;
}

export interface IUsersTraitsConfig {
  traits: Trait[];
  clearTraits: boolean;
  completedTraits: TraitTag[];
  builders: {
    recommendations: CardContent[];
    traits: Trait[];
  }[];
}
export type Trait = {
  name: string;
  tag: string;
  value: number;
  explanation: string;
  icon: string;
};
export type CardContent = {
  testName: TestName;
  time: string;
  category: string[] | string;
  routeStart: string;
  testPrice: string | null;
  title: string;
  imgWebUrl: string;
  imgList: Array<number>;
  subtitle: string;
  buttonText: string;
  color: string;
  imageUrl: string;
  traits: Trait[];
};
export interface ITestInfoData {
  invoiceId: string;
  testName: TestName;
  imgUrl: string;
  title: string;
  price: string;
  testPriceText: string;
}
export interface IPaidData {
  invoiceId: string;
  testName: TestName;
  imgUrl: string;
  title: string;
  price: string;
  testPriceText: string;
  paidAt?: number;
  expiredAt?: number;
}

export interface ITestConfig {
  answers: Record<string, string | null>;
  currentQuestion: number;
  paidTestInfo: IPaidData | null;
}
export interface TestResults {
  type: string;
  title: string;
  category: string;
  subtitle: string;
  sections: Array<{
    title: string;
    sectionsDescription: string;
    sectionsList: string[];
  }>;
}
export type TestPhase = 'intro' | 'questions' | 'loading' | 'result';

export interface TestState {
  phase: TestPhase;
  questions: Question[];
  currentTest: TestName | null;
  currentIndex: number;
  answers: Answers;
  result: TestResults | null;
  resultType: string | null;
  error: string | null;
  isLoading: boolean;
}
