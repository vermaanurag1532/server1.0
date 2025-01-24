import connection from '../../db/connection.js';

const TransferLocationRepository = {
    addTransferLocation: (transferLocationData) => {
        const query = `
            INSERT INTO \`Tranfer Location\` (\`Stock ID\`, \`Source Location\`, \`Destination Location\`)
            VALUES (?, ?, ?)
        `;
        const params = [
            transferLocationData.stockId,
            transferLocationData.sourceLocation,
            transferLocationData.destinationLocation
        ];
        return new Promise((resolve, reject) => {
            connection.query(query, params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    getAllTransferLocations: () => {
        const query = 'SELECT * FROM `Tranfer Location`';
        return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    getTransferLocationByStockId: (stockId) => {
        const query = 'SELECT * FROM `Tranfer Location` WHERE `Stock ID` = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [stockId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    updateTransferLocation: (stockId, updatedData) => {
        const query = `
            UPDATE \`Tranfer Location\`
            SET \`Source Location\` = ?, \`Destination Location\` = ?
            WHERE \`Stock ID\` = ?
        `;
        const params = [
            updatedData.sourceLocation,
            updatedData.destinationLocation,
            stockId
        ];
        return new Promise((resolve, reject) => {
            connection.query(query, params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    deleteTransferLocation: (stockId) => {
        const query = 'DELETE FROM `Tranfer Location` WHERE `Stock ID` = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [stockId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
};

export default TransferLocationRepository;
