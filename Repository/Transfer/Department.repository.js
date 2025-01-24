// TransferDepartment.repository.js
import connection from '../../db/connection.js';

class TransferDepartmentRepository {
    addTransferRecord = (data, callback) => {
        const query = `
            INSERT INTO \`Tranfer Department\` (\`Stock ID\`, \`Source Department\`, \`Destination Department\`)
            VALUES (?, ?, ?)
        `;
        const params = [data.stockId, data.sourceDepartment, data.destinationDepartment];
        connection.query(query, params, callback);
    };

    getAllTransferRecords = (callback) => {
        const query = 'SELECT * FROM `Tranfer Department`';
        connection.query(query, callback);
    };

    getTransferRecordByStockId = (stockId, callback) => {
        const query = 'SELECT * FROM `Tranfer Department` WHERE `Stock ID` = ?';
        connection.query(query, [stockId], callback);
    };

    updateTransferRecordByStockId = (stockId, data, callback) => {
        const query = `
            UPDATE \`Tranfer Department\`
            SET \`Source Department\` = COALESCE(?, \`Source Department\`),
                \`Destination Department\` = COALESCE(?, \`Destination Department\`)
            WHERE \`Stock ID\` = ?
        `;
        const params = [data.sourceDepartment || null, data.destinationDepartment || null, stockId];
        connection.query(query, params, callback);
    };

    deleteTransferRecordByStockId = (stockId, callback) => {
        const query = 'DELETE FROM `Tranfer Department` WHERE `Stock ID` = ?';
        connection.query(query, [stockId], callback);
    };
}

export default new TransferDepartmentRepository();
