interface Scores {
  E: number;
  T: number;
  W: number;
  R: number;
  F: number;
  B: number;
}

interface TypeInformation {
  resultCode: string;
  description: string;

  insights: {
    title: string;
    text: string[];
  };

  strengths: {
    title: string;
    list: string[];
  };

  challenges: {
    title: string;
    list: string[];
  };

  recommendations: {
    title: string;
    list: string[];
  };

  retakeConditions: {
    title: string;
    list: string[];
  };

  summary: {
    title: string;
    text: string;
  };
}

export { Scores, TypeInformation };
