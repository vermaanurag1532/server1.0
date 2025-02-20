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
                BOM: JSON.stringify(data.BOM),
                Operation: JSON.stringify(data.Operation),
                "Image Details": JSON.stringify(data["Image Details"]),
                "Formula Details": JSON.stringify(data["Formula Details"]),
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
                BOM: JSON.stringify(data.BOM),
                Operation: JSON.stringify(data.Operation),
                "Image Details": JSON.stringify(data["Image Details"]),
                "Formula Details": JSON.stringify(data["Formula Details"]),
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
