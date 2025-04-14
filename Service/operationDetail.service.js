import OperationRepository from '../Repository/operationDetail.repository.js';

const OperationService = {
  getAll: async () => {
    const [rows] = await OperationRepository.getAll();
    return rows;
  },

  getById: async (operationId) => {
    const [rows] = await OperationRepository.getById(operationId);
    return rows;
  },

  create: async (data) => {
    // Check if the data is an array of operations or a single operation
    if (Array.isArray(data)) {
      // If it's an array, get a new operation ID for all items
      const currentMax = await OperationRepository.getMaxOperationNumber();
      const newId = `Operation-${currentMax + 1}`;
      
      // Set the same operation ID for all items in the array
      for (const item of data) {
        item.OperationId = newId;
      }
      
      // Insert all items
      await Promise.all(data.map(item => OperationRepository.create(item)));
      
      return { message: 'Operations created', OperationId: newId };
    } else {
      // If it's a single operation, proceed as before
      const currentMax = await OperationRepository.getMaxOperationNumber();
      const newId = `Operation-${currentMax + 1}`;
      data.OperationId = newId;
      await OperationRepository.create(data);
      return { message: 'Operation created', OperationId: newId };
    }
  },

  update: async (operationId, data) => {
    // If updating multiple operations with the same ID
    if (Array.isArray(data)) {
      // First delete all existing operations with this ID
      await OperationRepository.delete(operationId);
      
      // Then insert all new operations with the same ID
      for (const item of data) {
        item.OperationId = operationId;
        await OperationRepository.create(item);
      }
    } else {
      // If updating a single operation
      await OperationRepository.update(operationId, data);
    }
    
    return { message: 'Operation updated' };
  },

  delete: async (operationId) => {
    await OperationRepository.delete(operationId);
    return { message: 'Operation deleted' };
  }
};

export default OperationService;