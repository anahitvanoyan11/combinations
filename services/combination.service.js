const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
import { db } from '../db/connection.js';
import { insertItems } from '../models/items.model.js';
import { insertCombinations } from '../models/combinations.model.js';
import { insertResponse, getCachedResponse } from '../models/responses.model.js';

class CombinationService {
  constructor() {
    // any init logic or shared resources
  }

  async createCombination(data) {
    //need to check we have similiar combination or no we create it or no
    const cached = await getCachedResponse(data.length, data.items.join(','));
  
    console.log('cached => ', cached);
    if (cached) {
      console.log('✅ Returning cached response');
      return cached;
    }

    // Step 1: Build matrix of generated items, like [['A1', 'A2'], ['B1'], ['C1', 'C2']]
    const generatedItemsMatrix = data.items.map((count, idx) => {
      return Array.from({ length: count }, (_, i) => `${letters[idx]}${i + 1}`);
    });

    const allCombinations = [];

    // Step 2: Loop through each starting index to build initial combinations
    for (let i = 0; i <= generatedItemsMatrix.length - data.length; i++) {
      const currentCombination = [];
      const currentIndexes = [];
      let currentMatrixIndex = i;

      // Step 3: Build a base combination using the first items of each relevant column
      while (currentCombination.length !== data.length && currentMatrixIndex < generatedItemsMatrix.length) {
        if (currentCombination.length === data.length - 1) {
          // Add last item to make combination complete
          currentCombination.push(generatedItemsMatrix[currentMatrixIndex][0]);
          currentIndexes.push(currentMatrixIndex);

          // Expand that base into all possible variations
          generateAllCombinations([...currentCombination], currentIndexes);

          // Clean up the last pushed element for next loop if needed
          if (generatedItemsMatrix.length - currentMatrixIndex > 0 && currentCombination.length > 1) {
            currentCombination.pop();
            currentIndexes.pop();
          }
        } else {
          // Keep adding first elements to reach desired combination length
          currentCombination.push(generatedItemsMatrix[currentMatrixIndex][0]);
          currentIndexes.push(currentMatrixIndex);
        }
        currentMatrixIndex++;
      }
    }

    // Helper: Expand base combination by replacing each item with all possible options in its column
    function generateAllCombinations(baseCombination, columnIndexes) {
      const expandedCombinations = [baseCombination];
      let positionToModify = data.length - 1;

      while (positionToModify >= 0) {
        const snapshot = expandedCombinations.slice(); // prevent growing while looping
        for (let i = 0; i < snapshot.length; i++) {
          const combinationCopy = [...snapshot[i]];
          const matrixRow = generatedItemsMatrix[columnIndexes[positionToModify]];

          for (let j = 1; j < matrixRow.length; j++) {
            combinationCopy[positionToModify] = matrixRow[j];
            expandedCombinations.push([...combinationCopy]);
          }
        }
        positionToModify--;
      }

      allCombinations.push(...expandedCombinations);
    }

    // const response = await this.saveDataTransaction(data.length, data.items, generatedItemsMatrix, allCombinations);
    const response = await this.saveFullResponse(data, generatedItemsMatrix, allCombinations);
    return response;
  }

  async saveFullResponse(input, generatedMatrix, generatedCombinations) {
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // 1. Flatten and insert all items (like A1, B2, etc.)
      const allItems = generatedMatrix.flat(); // ["A1", "B1", "C1", ...]
      console.log('allItems => ', allItems);
      await insertItems(allItems, connection);

      // 2. Insert combinations
      await insertCombinations(generatedCombinations, connection);

      // 3. Save response with request input
      const queryRes = await connection.query('SELECT LAST_INSERT_ID() as id');
      const responseId = queryRes[0][0].id;

      await insertResponse(input.length, input.items, { id: responseId, combinations: generatedCombinations }, connection);

      await connection.commit();
      connection.release();

      return { id: responseId, combinations: generatedCombinations };

    } catch (err) {
      console.log('err => ', err);
      await connection.rollback();
      connection.release();
      throw err;
    }
  }
}

const combinationService = new CombinationService();
export default combinationService;