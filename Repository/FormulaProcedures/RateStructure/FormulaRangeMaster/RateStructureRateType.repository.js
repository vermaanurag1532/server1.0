import connection from '../../../../db/connection.js';

const RateTypeRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Formula Procedures Rate Structure Rate Type`';
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
                INSERT INTO \`Formula Procedures Rate Structure Rate Type\` (
                    \`Config Id\`,
                    \`Config code\`,
                    \`Config value\`,
                    \`Config remark3\`,
                    \`Config remark2\`
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

export default RateTypeRepository;

