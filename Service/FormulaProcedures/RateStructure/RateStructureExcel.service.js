import RateStructureExcelRepository from '../../../Repository/FormulaProcedures/RateStructure/RateStructureExcel.repository.js';

const RateStructureExcelService = {
    // Service to get all details
    getAllDetails: async () => {
        try {
            const data = await RateStructureExcelRepository.getAll();
            return data;
        } catch (error) {
            throw new Error(`Error retrieving all details: ${error.message}`);
        }
    },

    // Service to get details by Range Hierarchy Name
    getDetailsByRangeHierarchyName: async (rangeHierarchyName) => {
        try {
            const data = await RateStructureExcelRepository.getByRangeHierarchyName(rangeHierarchyName);
            return data;
        } catch (error) {
            throw new Error(`Error retrieving details: ${error.message}`);
        }
    },

    // Service to insert details for a Range Hierarchy Name
    createRangeHierarchyDetails: async (rangeHierarchyName, details) => {
        try {
            const result = await RateStructureExcelRepository.insert(rangeHierarchyName, details);
            return result;
        } catch (error) {
            throw new Error(`Error creating details: ${error.message}`);
        }
    }
};

export default RateStructureExcelService;
