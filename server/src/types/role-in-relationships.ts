interface RoleInRelationshipsResult {
  type: RelationshipRoleType;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}
interface RoleInRelationshipsInformation {
  title: string;
  description: string;
  details: {
    questions_count: number;
    unlocks: string[];
    note: string;
    result: string;
  };
  cta: string;
}

type RelationshipRoleType =
  | 'Натхненник'
  | 'Опора'
  | 'Вогонь і вітер'
  | 'Творець сенсів'
  | 'Капітан'
  | 'Вільне серце';

export {
  RoleInRelationshipsInformation,
  RoleInRelationshipsResult,
  RelationshipRoleType,
};
