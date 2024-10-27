import FormulaRangeMasterRepository from '../../../../Repository/FormulaProcedures/RateStructure/FormulaRangeMaster/FormulaRangeMaster.repository.js';

const FormulaRangeMasterService = {
    getAllRangeMasters: async () => {
        try {
            const data = await FormulaRangeMasterRepository.getAll();
            return data;
        } catch (error) {
            throw new Error(`Error retrieving range masters: ${error.message}`);
        }
    },

    createRangeMaster: async (rangeMasterData) => {
        const {
            'Range Hierarchy Name': rangeHierarchyName,
            'Range Type': rangeType
        } = rangeMasterData;

        const params = [
            rangeHierarchyName,
            rangeType
        ];

        try {
            const result = await FormulaRangeMasterRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(`Error creating range master: ${error.message}`);
        }
    }
};

export default FormulaRangeMasterService;
