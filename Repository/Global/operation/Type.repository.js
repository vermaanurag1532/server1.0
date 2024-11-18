import connection from '../../../db/connection.js';

const TypeRepository = {
    // Get all Config records
    getAllTypes: async () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Type`';
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    // Get a Config record by ID
    getTypeById: async (configId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Type` WHERE `Config Id` = ?';
            connection.query(query, [configId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    },

    // Add a new Config record
    addType: async (typeData) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO \`Type\` (\`Config Id\`, \`Config code\`, \`Config value\`)
                VALUES (?, ?, ?)
            `;
            const values = [typeData.configId, typeData.configCode, typeData.configValue];
            connection.query(query, values, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.insertId);
            });
        });
    }
};

export default TypeRepository;
