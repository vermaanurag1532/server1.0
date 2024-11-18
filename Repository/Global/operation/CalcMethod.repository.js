import connection from '../../../db/connection.js';

const CalcMethodRepository = {
    // Get all Calc Method records
    getAllCalcMethods: async () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Calc Method`';
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    // Get a Calc Method record by Config ID
    getCalcMethodById: async (configId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Calc Method` WHERE `Config Id` = ?';
            connection.query(query, [configId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    },

    // Add a new Calc Method record
    addCalcMethod: async (calcMethodData) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO \`Calc Method\` (\`Config Id\`, \`Config code\`, \`Config value\`)
                VALUES (?, ?, ?)
            `;
            const values = [
                calcMethodData.configId,
                calcMethodData.configCode,
                calcMethodData.configValue
            ];
            connection.query(query, values, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.insertId);
            });
        });
    }
};

export default CalcMethodRepository;
