import FormulaProcedureMasterDetailsRepository from '../../../Repository/FormulaProcedures/FormulaProcedure/FormulaProcedure.repository.js';

const FormulaProcedureMasterDetailsService = {

    // Add new formula procedure master detail
    createFormulaProcedureMasterDetail: async (detailData) => {
        const { procedureType, formulaProcedureName, calculateOn, minimumValueBasedOn, minRangeType,
            maximumValueBasedOn, maxRangeType, excelDetail } = detailData;

        const params = [procedureType, formulaProcedureName, calculateOn, minimumValueBasedOn, minRangeType,
            maximumValueBasedOn, maxRangeType, JSON.stringify(excelDetail)];

        try {
            return await FormulaProcedureMasterDetailsRepository.insertFormulaProcedureMasterDetail(params);
        } catch (error) {
            throw new Error(`Error creating formula procedure master detail: ${error.message}`);
        }
    },

    // Get all formula procedure master details
    getAllFormulaProcedureMasterDetails: async () => {
        try {
            return await FormulaProcedureMasterDetailsRepository.getAllFormulaProcedureMasterDetails();
        } catch (error) {
            throw new Error(`Error fetching formula procedure master details: ${error.message}`);
        }
    },

    getByName: async (formulaProcedureName) => {
        return await FormulaProcedureMasterDetailsRepository.findByName(formulaProcedureName);
    },

    getTableDetails: async () => {
        try {
            return await FormulaProcedureMasterDetailsRepository.findAllForTableRoute();
        } catch (error) {
            throw new Error(`Error fetching formula procedure master details: ${error.message}`);
        }
    },
};

export default FormulaProcedureMasterDetailsService;
