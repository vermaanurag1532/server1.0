import OperationService from '../../../Service/Global/operation/operartion.service.js';

const OperationController = {
    // Get all operations
    getAllOperations: async (req, res) => {
        try {
            const operations = await OperationService.getAllOperations();
            res.status(200).json(operations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Add a new operation
    addOperation: async (req, res) => {
        const operationData = req.body;
        try {
            const operationId = await OperationService.addOperation(operationData);
            res.status(201).json({ message: "Operation added successfully", operationId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default OperationController;
