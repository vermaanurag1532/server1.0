import DepdFieldRepository from '../../../../Repository/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/RateStructureNumberDepdField.repository.js';

const DepdFieldService = {
    getAllDepdField: async () => {
        try {
            const data = await DepdFieldRepository.getAll();
            return data;
        } catch (error) {
            throw new Error(`Error retrieving rate types: ${error.message}`);
        }
    },

    createDepdField: async (rateTypeData) => {
        const {
            configId,
            configType,
            configCode,
            configValue,
            configRemark3
        } = rateTypeData; // No quotes and exact field names as in the request body

        // Construct the params array to pass to the repository
        const params = [
            configId,
            configType,
            configCode,
            configValue,
            configRemark3
        ];

        try {
            const result = await DepdFieldRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(`Error creating rate type: ${error.message}`);
        }
    }
};

export default DepdFieldService;
