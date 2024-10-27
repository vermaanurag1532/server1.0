import DataTypeRepository from '../../../../Repository/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/RateStructureDataType.repository.js';

const DataTypeService = {
    getAllDataTypes: async () => {
        try {
            const data = await DataTypeRepository.getAll();
            return data;
        } catch (error) {
            throw new Error(`Error retrieving rate types: ${error.message}`);
        }
    },

    createDataType: async (rateTypeData) => {
        const {
            configId,
            configCode,
            configValue,
            configRemark1,
            configRemark2,
            configRemark3
        } = rateTypeData; // No quotes and exact field names as in the request body

        // Construct the params array to pass to the repository
        const params = [
            configId,
            configCode,
            configValue,
            configRemark1,
            configRemark2,
            configRemark3
        ];

        try {
            const result = await DataTypeRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(`Error creating rate type: ${error.message}`);
        }
    }
};

export default DataTypeService;
