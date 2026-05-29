type CategoryName =
  | 'healthy-relationship'
  | 'toxic-relationship'
  | 'some-warning-signs'
  | 'very-dangerous-relationship'
  | 'unknown-type';
type RelationshipResult = {
  scoreRange: string;
  category: string;
  categoryUrlType: CategoryName;
  subtitle: string;
  description: string;
  recommendations: string[];
  conclusion: string;
  consultation: {
    text: string;
    buttonText: string;
  };
};
interface TestDescription {
  title: string;
  description: string;
  details: string[];
  benefits_title: string;
  benefits: string[];
  cta: {
    text: string;
    highlight: string;
  };
}

export { RelationshipResult, CategoryName, TestDescription };
