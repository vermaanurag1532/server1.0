import connection from '../../../../db/connection.js';

const DepdFieldRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Formula Procedures Rate Structure Depd Field Attribute`';
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    insert: (params) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO \`Formula Procedures Rate Structure Depd Field Attribute\` (
                    \`Config Id\`,
                    \`Config type\`,
                    \`Config code\`,
                    \`Config value\`,
                    \`Config remark3\`
                ) VALUES (?, ?, ?, ?, ?)
            `;
            connection.query(query, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};

export default DepdFieldRepository;

