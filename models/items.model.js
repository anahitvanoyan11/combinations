export async function insertItems(itemsArray, transaction) {
  const joinedLabel = itemsArray.join(','); // e.g., "A1,B1,C1"
  const query = 'INSERT INTO items (label) VALUES (?)';
  await transaction.query(query, [joinedLabel]);
}