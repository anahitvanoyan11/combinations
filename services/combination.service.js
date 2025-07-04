const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

class CombinationService {
    constructor() {
      // any init logic or shared resources
    }
  
    createCombination(data) {
      const generatedItemsMatrix = data.items.map((count, idx) => {
        return Array.from({ length: count }, (_, i) => `${letters[idx]}${i + 1}`);
      });
  
      const generatedCombinations = [];

      let index = 0;
      const currentGeneratedCombination = [];
      while(currentGeneratedCombination.length !== data.length && index < generatedItemsMatrix.length) {
        if(currentGeneratedCombination.length === data.length - 1) {
          currentGeneratedCombination.push(generatedItemsMatrix[index][0]);
          generatedCombinations.push([...currentGeneratedCombination]);

          //optmal will be after adding ombination add all possibles for thet indexes

          // Clean up last element if necessary
          if(generatedItemsMatrix.length - index > 0) {
            currentGeneratedCombination.pop();
          }
        } else {
          currentGeneratedCombination.push(generatedItemsMatrix[index][0]);
        }
        index ++;
      }

      while (index >= 0) {
        //find thet itm array
        for (let i = 0; i < generatedCombinations.length; i ++) {
          let item = [...generatedCombinations[i]];
  
          //find needed item here generatedItemsMatrix and add all missed part
          const curentItemMatrix = generatedItemsMatrix.find(subArray => subArray[0] === generatedCombinations[i][index]) || [];
          for (let j = 1; j < curentItemMatrix.length; j ++) {
            item[index] = curentItemMatrix[j];
            generatedCombinations.push([...item]);
          }
        }
  
        index --;
      }
  
      return {
        generatedCombinations: generatedCombinations,
      };
    }
  
    getAllCombinations() {
      // Placeholder: in real app, read from DB
      return [{ id: 1, result: ['A1', 'B1'] }];
    }
  }
  
  const combinationService = new CombinationService();
  export default combinationService;