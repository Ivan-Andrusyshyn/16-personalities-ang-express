type PersonalityType =
  | 'charismatic-attractiveness'
  | 'mysterious-attractivenes'
  | 'intellectual-attractivenes'
  | 'warm-attractiveness'
  | 'wild-attractiveness'
  | 'gentle-attractiveness';

interface AttractivenessResult {
  type: string;
  subtitle: string;
  category: PersonalityType;
  description: string;
  knownTraits: string[];
  hiddenTraits: string[];
  strengthBoosters: string[];
  keyPower: string;
  nextStep: string;
  callToAction: string;
}

export { PersonalityType, AttractivenessResult };
