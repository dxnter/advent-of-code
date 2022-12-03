function calculateItemPriority(item: string): number {
  return item === item.toUpperCase()
    ? item.charCodeAt(0) - 38
    : item.charCodeAt(0) - 96;
}

export function part1(input: string) {
  const sharedItemPriorities = input
    .trim()
    .split('\n')
    .map((rucksack) => {
      const items = [...rucksack];
      const compartmentOne = items.slice(0, items.length / 2);
      const compartmentTwo = items.slice(compartmentOne.length);
      const sharedItem = [...new Set(compartmentOne)]
        .filter((item) => [...new Set(compartmentTwo)].includes(item))
        .join('');

      return calculateItemPriority(sharedItem);
    });

  return sharedItemPriorities.reduce(
    (totalPriorities, itemPriority) => totalPriorities + itemPriority,
  );
}

export function part2(input: string) {
  const sharedBadgePriorityByGroup = input
    .trim()
    .split('\n')
    .reduce((rucksackGroups: string[][][], rucksack: string, rucksackIdx) => {
      const groupIdx = Math.floor(rucksackIdx / 3);
      rucksackGroups[groupIdx] = new Array<Array<string>>().concat(
        rucksackGroups[groupIdx] || [],
        [rucksack.split('')],
      );
      return rucksackGroups;
    }, [])
    .map((rucksackGroup) => {
      const sharedBadge = [
        ...new Set(
          rucksackGroup.reduce((uniqueItems, groupMemberItems) =>
            uniqueItems.filter((uniqueItem) =>
              groupMemberItems.includes(uniqueItem),
            ),
          ),
        ),
      ].join('');

      return calculateItemPriority(sharedBadge);
    });

  return sharedBadgePriorityByGroup.reduce(
    (totalPriorities, badgePriority) => totalPriorities + badgePriority,
  );
}
