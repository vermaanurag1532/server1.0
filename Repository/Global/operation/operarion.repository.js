import db from '../../../db/connection.js'; // Assuming you have a database connection setup

const OperationRepository = {
    // Method to get all operations
    getAllOperations: async () => {
        const query = 'SELECT * FROM Operation';
        const [rows] = await db.promise().query(query);
        return rows;
    },

    // Method to add a new operation
    addOperation: async (operationData) => {
        const query = `
            INSERT INTO Operation (
                OPERATION_ID, OPERATION_NAME, BASE_ITEM_TYPE_ID, OPERATION_TYPE_ID, OPERATION_TYPE,
                SERVICE_CALC_METHOD_ID, SERVICE_CALC_METHOD_CODE, SERVICE_CALC_METHOD,
                SERVICE_CALC_METHOD_VAL_ID, SERVICE_CALC_METHOD_VAL,
                SERVICE_DEPD_METHOD_ID, SERVICE_DEPD_METHOD_CODE, SERVICE_DEPD_METHOD,
                SERVICE_DEPD_METHOD_VAL_ID, SERVICE_DEPD_METHOD_VAL
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            operationData.OPERATION_ID, operationData.OPERATION_NAME, operationData.BASE_ITEM_TYPE_ID,
            operationData.OPERATION_TYPE_ID, operationData.OPERATION_TYPE, operationData.SERVICE_CALC_METHOD_ID,
            operationData.SERVICE_CALC_METHOD_CODE, operationData.SERVICE_CALC_METHOD,
            operationData.SERVICE_CALC_METHOD_VAL_ID, operationData.SERVICE_CALC_METHOD_VAL,
            operationData.SERVICE_DEPD_METHOD_ID, operationData.SERVICE_DEPD_METHOD_CODE, 
            operationData.SERVICE_DEPD_METHOD, operationData.SERVICE_DEPD_METHOD_VAL_ID, 
            operationData.SERVICE_DEPD_METHOD_VAL
        ];
        const [result] = await db.promise().query(query, values);
        return result.insertId;
    }
};

export default OperationRepository;
