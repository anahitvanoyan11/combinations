export async function insertCombinations(combinations, transaction) {
  const combinationData = JSON.stringify(combinations); // Full array of arrays
  const query = 'INSERT INTO combinations (combination_text) VALUES (?)';
  await transaction.query(query, [combinationData]);}