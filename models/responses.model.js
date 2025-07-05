import { db } from '../db/connection.js';

export async function insertResponse(length, items, response, transaction) {
  console.log('response => ', response);
  const itemsCSV = items.join(','); // Convert array to string e.g. "2,1,1"
  const responseJSON = JSON.stringify(response);

  const query = `
    INSERT INTO responses (length, items, response_json)
    VALUES (?, ?, ?)
  `;

  await transaction.query(query, [length, itemsCSV, responseJSON]);
}

export async function getCachedResponse(length, itemsStr) {
  const query = 'SELECT response_json FROM responses WHERE length = ? AND items = ? LIMIT 1';
  const [rows] = await db.query(query, [length, itemsStr]);
  if (rows.length > 0) {
    return rows[0].response_json;
  }
}