import connection from '../../../../db/connection.js';

const DataTypeRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Formula Procedures Rate Structure Data Type`';
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
                INSERT INTO \`Formula Procedures Rate Structure Data Type\` (
                    \`Config Id\`,
                    \`Config code\`,
                    \`Config value\`,
                    \`Config remark1\`,
                    \`Config remark2\`,
                    \`Config remark3\`
                ) VALUES (?, ?, ?, ?, ?, ?)
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

export default DataTypeRepository;

