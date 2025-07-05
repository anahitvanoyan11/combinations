const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

class CombinationService {
    constructor() {
      // any init logic or shared resources
    }
  
    createCombination(data) {
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

      return {
        combinations: allCombinations,
      };
    }
  
    getAllCombinations() {
      // Placeholder: in real app, read from DB
      return [{ id: 1, result: ['A1', 'B1'] }];
    }
  }
  
  const combinationService = new CombinationService();
  export default combinationService;