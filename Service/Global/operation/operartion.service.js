import OperationRepository from '../../../Repository/Global/operation/operarion.repository.js';

const OperationService = {
    // Get all operations
    getAllOperations: async () => {
        return await OperationRepository.getAllOperations();
    },

    // Add a new operation
    addOperation: async (operationData) => {
        return await OperationRepository.addOperation(operationData);
    }
};

export default OperationService;
