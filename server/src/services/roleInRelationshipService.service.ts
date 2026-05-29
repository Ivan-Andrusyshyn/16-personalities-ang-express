class RoleInRelationshipSersvice {
  getNameCategoryByScore(anwers: any) {
    const categoryCount: { [key: string]: number } = {};

    for (let key of Object.keys(anwers)) {
      const category = anwers[key];

      const match = category.match(/^(\d+(\.\d+)?)-/);
      const numberPrefix = match ? parseFloat(match[1]) : 1;

      if (categoryCount[category]) {
        categoryCount[category] += numberPrefix;
      } else {
        categoryCount[category] = numberPrefix;
      }
    }

    let maxCount = -Infinity;
    let mostFrequentCategory = '';

    for (let category in categoryCount) {
      if (categoryCount[category] > maxCount) {
        maxCount = categoryCount[category];
        mostFrequentCategory = category;
      }
    }

    return mostFrequentCategory.replace(/^\d+(\.\d+)?-/, '');
  }
}

const roleInRelationshipService = new RoleInRelationshipSersvice();

export default roleInRelationshipService;
