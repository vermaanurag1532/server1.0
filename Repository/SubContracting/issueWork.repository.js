import connection from '../../db/connection.js';

const SubContractingIssueWorkRepository = {
    getAll: async () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM `Sub Contracting Issue Work`";
            connection.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getById: async (stockId) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM `Sub Contracting Issue Work` WHERE `stockId` = ?";
            connection.query(query, [stockId], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    },

    create: async (data) => {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO `Sub Contracting Issue Work` SET ?";
            const formattedData = {
                ...data,
                bom: JSON.stringify(data.bom),
                operation: JSON.stringify(data.operation),
                "imageDetails": JSON.stringify(data["imageDetails"]),
                "formulaDetails": JSON.stringify(data["formulaDetails"]),
            };
            connection.query(query, formattedData, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    update: async (stockId, data) => {
        return new Promise((resolve, reject) => {
            const query = "UPDATE `Sub Contracting Issue Work` SET ? WHERE `stockId` = ?";
            const formattedData = {
                ...data,
                bom: JSON.stringify(data.bom),
                operation: JSON.stringify(data.operation),
                "imageDetails": JSON.stringify(data["imageDetails"]),
                "formulaDetails": JSON.stringify(data["formulaDetails"]),
            };
            connection.query(query, [formattedData, stockId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    delete: async (stockId) => {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM `Sub Contracting Issue Work` WHERE `stockId` = ?";
            connection.query(query, [stockId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

export default SubContractingIssueWorkRepository;
