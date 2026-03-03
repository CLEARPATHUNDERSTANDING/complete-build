export function classifyQuery(q: string): string {
  const s = q.toLowerCase();

  if (matchesAny(s, ["iran", "war", "election", "president", "sanctions", "russia", "china", "israel", "gaza", "ukraine", "market", "stocks", "crypto"])) return "news";
  if (matchesAny(s, ["recipe", "cook", "bake", "ingredients", "meal prep", "how to", "guide", "tutorial"])) return "howto";
  if (matchesAny(s, ["fashion", "outfit", "shoes", "streetwear", "makeup", "buy", "price", "shop"])) return "shopping";
  if (matchesAny(s, ["car", "truck", "engine", "tesla", "toyota", "ford", "oil change", "automotive"])) return "auto";
  if (matchesAny(s, ["baby", "toddler", "newborn", "formula", "diaper", "sleep training", "parenting"])) return "parenting";

  return "general";
}

function matchesAny(s: string, words: string[]) {
  return words.some((w) => s.includes(w));
}
