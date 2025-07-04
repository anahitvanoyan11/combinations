// // Helper to generate combinations
// function generateCombinations(matrix, k, start = 0, path = [], result = []) {
//   if (path.length === k) {
//     result.push([...path]);
//     return;
//   }
//   for (let i = start; i < matrix.length; i++) {
//     for (let item of matrix[i]) {
//       path.push(item);
//       generateCombinations(matrix, k, i + 1, path, result);
//       path.pop();
//     }
//   }
//   return result;
// }

// export const createCombinationService = async (items, length) => {
//   if (length < 2 || length > items.length || items.length > 26) {
//     return { error: 'Invalid combination input' };
//   }

//   // Create a matrix like [['A1', 'A2'], ['B1'], ['C1', 'C2']]
//   const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   const matrix = items.map((count, idx) => {
//     return Array.from({ length: count }, (_, i) => `${letters[idx]}${i + 1}`);
//   });

//   const generated = generateCombinations(matrix, length);
//   combinationsStore = [...combinationsStore, ...generated];

//   return { combinations: generated };
// };

// export const getAllCombinationsService = async () => {
//   return { combinations: combinationsStore };
// };

class CombinationService {
    constructor() {
      // any init logic or shared resources
    }
  
    createCombination(data) {
      // Here you can handle combination creation logic
      // e.g., data = { length: 3, items: [2, 1, 2] }
  
      const generatedLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const generatedItemsMatrix = [];
  
      for (let i = 0; i < data.items.length; i++) {
        generatedItemsMatrix[i] = [];
        for (let j = 0; j < data.items[i]; j++) {
          generatedItemsMatrix[i].push(`${generatedLetters[i]}${j + 1}`);
        }
      }
  
      // For demo: return the matrix
      return {
        length: data.length,
        matrix: generatedItemsMatrix,
      };
    }
  
    getAllCombinations() {
      // Placeholder: in real app, read from DB
      return [{ id: 1, result: ['A1', 'B1'] }];
    }
  }
  
  const combinationService = new CombinationService();
  export default combinationService;