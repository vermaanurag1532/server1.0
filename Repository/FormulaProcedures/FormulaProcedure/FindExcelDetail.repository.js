import connection from '../../../db/connection.js';

const FindExcelDetailRepository = {
    findProcedureNameByMappingCriteria: async (criteria) => {
        const {
            procedureType,
            transactionType,
            documentType,
            transactionCategory,
            partyName = '',
            variantName = '',
            itemGroup,
            attributeType = '',
            attributeValue = '',
            operation,
            operationType = ''
        } = criteria;

        // Build the query with parameters
        const query = `
            SELECT \`Procedure Name\`
            FROM \`Formula Procedure Formula Mapping\`
            WHERE \`Procedure Type\` = ?
            AND \`Transaction Type\` = ?
            AND \`Document Type\` = ?
            AND \`Transaction Category\` = ?
            AND \`Item Group\` = ?
            AND \`Operation\` = ?
            AND (? = '' OR \`Party Name\` = ?)
            AND (? = '' OR \`Variant Name\` = ?)
            AND (? = '' OR \`Attribute Type\` = ?)
            AND (? = '' OR \`Attribute Value\` = ?)
            AND (? = '' OR \`Operation Type\` = ?)
            LIMIT 1
        `;

        try {
            const [rows] = await connection.promise().query(query, [
                procedureType,
                transactionType,
                documentType,
                transactionCategory,
                itemGroup,
                operation,
                partyName, partyName,
                variantName, variantName,
                attributeType, attributeType,
                attributeValue, attributeValue,
                operationType, operationType
            ]);

            if (rows.length === 0) {
                return null;
            }

            return rows[0]['Procedure Name'];
        } catch (error) {
            console.error('Error finding procedure name:', error);
            throw new Error(`Database error while finding procedure name: ${error.message}`);
        }
    },

    findExcelDetailByProcedureName: async (procedureName) => {
        const query = `
            SELECT \`Excel Detail\`
            FROM \`Formula Procedure Master Details\`
            WHERE \`Formula Procedure Name\` = ?
            LIMIT 1
        `;

        try {
            const [rows] = await connection.promise().query(query, [procedureName]);

            if (!rows || rows.length === 0) {
                return null;
            }
            
            if (!rows[0] || !('Excel Detail' in rows[0])) {
                console.warn(`Excel Detail field not found for procedure: ${procedureName}`);
                return null;
            }

            // Handle the Excel Detail parsing safely
            const excelDetail = rows[0]['Excel Detail'];
            
            // If it's already an object, return it directly
            if (typeof excelDetail === 'object' && excelDetail !== null) {
                return excelDetail;
            }
            
            // If it's a string, try to parse it as JSON
            if (typeof excelDetail === 'string') {
                try {
                    return JSON.parse(excelDetail);
                } catch (parseError) {
                    console.error('Error parsing Excel Detail JSON:', parseError);
                    // Return the raw string if parsing fails
                    return excelDetail;
                }
            }
            
            // If it's neither an object nor a parseable string, return as is
            return excelDetail;
        } catch (error) {
            console.error('Error finding Excel Detail:', error);
            throw new Error(`Database error while finding Excel Detail: ${error.message}`);
        }
    }
};

export default FindExcelDetailRepository;