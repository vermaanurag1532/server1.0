import connection from '../../../../db/connection.js';

const FormulaRangeMasterRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Formula Procedures Rate Structure Formula Range Master`';
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
                INSERT INTO \`Formula Procedures Rate Structure Formula Range Master\` (
                    \`Range Hierarchy Name\`,
                    \`Range Type\`
                ) VALUES (?, ?)
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

export default FormulaRangeMasterRepository;
