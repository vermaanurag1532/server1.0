import RangeHierarchyRepository from '../../../../Repository/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/FormulaRangeHierarchydetails.repository.js';

const RangeHierarchyService = {


    // Add new range hierarchy detail
    createRangeHierarchyDetail: async (detailData) => {
        const { dataType, depdField, rangeHierarchyName } = detailData;
        const params = [dataType, depdField, rangeHierarchyName];
        try {
            return await RangeHierarchyRepository.insertRangeHierarchyDetail(params);
        } catch (error) {
            throw new Error(`Error creating range hierarchy detail: ${error.message}`);
        }
    },


    // Get all range hierarchy details
    getAllRangeHierarchyDetails: async () => {
        try {
            return await RangeHierarchyRepository.getAllRangeHierarchyDetails();
        } catch (error) {
            throw new Error(`Error fetching range hierarchy details: ${error.message}`);
        }
    },

    getRangeHierarchyByName: async (rangeHierarchyName) => {
        try {
            return await RangeHierarchyRepository.getRangeHierarchyByName(rangeHierarchyName);
        } catch (error) {
            throw new Error(`Error fetching range hierarchy detail: ${error.message}`);
        }
    }
};

export default RangeHierarchyService;
