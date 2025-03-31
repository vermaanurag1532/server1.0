import FindExcelDetailService from '../../../Service/FormulaProcedures/FormulaProcedure/FindExcelDetail.service.js';

const FindExcelDetailController = {
    findExcelDetail: async (req, res) => {
        try {
            const mappingCriteria = req.body;
            
            // Validate that required fields are present
            const requiredFields = [
                'procedureType', 'transactionType', 'documentType', 
                'transactionCategory', 'itemGroup', 'operation'
            ];
            
            for (const field of requiredFields) {
                if (!mappingCriteria[field]) {
                    return res.status(400).json({ 
                        success: false, 
                        message: `Missing required field: ${field}` 
                    });
                }
            }
            
            const excelDetail = await FindExcelDetailService.findExcelDetailByMappingCriteria(mappingCriteria);
            
            if (!excelDetail) {
                return res.status(404).json({ 
                    success: false, 
                    message: "No matching formula procedure found for the given criteria"
                });
            }
            
            // Ensure we have valid data to return
            if (!excelDetail.procedureName) {
                return res.status(500).json({
                    success: false,
                    message: "Found a procedure but procedure name is missing"
                });
            }
            
            // Handle case where Excel Detail might be null, undefined, or empty
            const excelDetailData = excelDetail.excelDetail;
            
            res.status(200).json({
                success: true,
                data: {
                    procedureName: excelDetail.procedureName,
                    excelDetail: excelDetailData,
                    // Include the raw type for debugging
                    _debug: {
                        excelDetailType: typeof excelDetailData
                    }
                }
            });
        } catch (error) {
            console.error("Error finding Excel Detail:", error);
            res.status(500).json({ 
                success: false, 
                message: "An error occurred while finding the Excel Detail",
                error: error.message
            });
        }
    }
};

export default FindExcelDetailController;