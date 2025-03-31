import FindExcelDetailRepository from '../../../Repository/FormulaProcedures/FormulaProcedure/FindExcelDetail.repository.js';

const FindExcelDetailService = {
    findExcelDetailByMappingCriteria: async (mappingCriteria) => {
        try {
            // First, find the procedure name from the Formula Mapping table based on criteria
            const procedureName = await FindExcelDetailRepository.findProcedureNameByMappingCriteria(mappingCriteria);
            
            if (!procedureName) {
                console.log('No procedure name found for the given criteria');
                return null;
            }
            
            console.log(`Found matching procedure name: ${procedureName}`);
            
            // Then, fetch the Excel Detail from the Formula Procedure Master Details table
            let excelDetail;
            try {
                excelDetail = await FindExcelDetailRepository.findExcelDetailByProcedureName(procedureName);
            } catch (error) {
                console.error(`Error retrieving Excel Detail for ${procedureName}:`, error);
                throw error;
            }
            
            if (excelDetail === null || excelDetail === undefined) {
                console.log(`No Excel Detail found for procedure name: ${procedureName}`);
                return null;
            }
            
            console.log(`Successfully retrieved Excel Detail for procedure: ${procedureName}`);
            // Log the type to help diagnose issues
            console.log(`Excel Detail type: ${typeof excelDetail}`);
            
            if (typeof excelDetail === 'object' && excelDetail !== null) {
                console.log('Excel Detail preview:', Object.keys(excelDetail).slice(0, 3));
            }
            
            return {
                procedureName: procedureName,
                excelDetail: excelDetail
            };
        } catch (error) {
            console.error('Error in FindExcelDetailService:', error);
            throw new Error(`Error finding Excel Detail: ${error.message}`);
        }
    }
};

export default FindExcelDetailService;