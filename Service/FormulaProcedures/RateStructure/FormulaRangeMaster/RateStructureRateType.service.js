import RateTypeRepository from '../../../../Repository/FormulaProcedures/RateStructure/FormulaRangeMaster/RateStructureRateType.repository.js';

const RateTypeService = {
    getAllRateTypes: async () => {
        try {
            const data = await RateTypeRepository.getAll();
            return data;
        } catch (error) {
            throw new Error(`Error retrieving rate types: ${error.message}`);
        }
    },

    createRateType: async (rateTypeData) => {
        const {
            configId,
            configCode,
            configValue,
            configRemark3,
            configRemark2
        } = rateTypeData; // No quotes and exact field names as in the request body

        // Construct the params array to pass to the repository
        const params = [
            configId,
            configCode,
            configValue,
            configRemark3,
            configRemark2
        ];

        try {
            const result = await RateTypeRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(`Error creating rate type: ${error.message}`);
        }
    }
};

export default RateTypeService;
