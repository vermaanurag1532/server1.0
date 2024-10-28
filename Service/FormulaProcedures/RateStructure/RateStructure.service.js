import RateStructureRepository from '../../../Repository/FormulaProcedures/RateStructure/RateStructure.repository.js';

const RateStructureService = {
    createFormulaRange: async (rangeData) => {
        const { rangeHierarchyName, rangeType, details } = rangeData;

        try {
            // Insert into master table
            await RateStructureRepository.insertMaster(rangeHierarchyName, rangeType);

            // Insert related details
            const detailsData = details.map(detail => ({
                ...detail,
                rangeHierarchyName
            }));
            await RateStructureRepository.insertDetails(detailsData);

            return { message: 'Formula range and details added successfully.' };
        } catch (error) {
            throw new Error(`Error creating formula range: ${error.message}`);
        }
    }
};

export default RateStructureService;
