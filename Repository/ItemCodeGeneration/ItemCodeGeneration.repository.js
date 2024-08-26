import connection from '../../db/connection.js';

const ItemCodeGenerationRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Item Code Generation`';
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
                INSERT INTO \`Item Code Generation\` (
                    \`Item Group\`,
                    \`Code Gen Format\`,
                    \`Start with\`,
                    \`Incr By\`,
                    \`SrNo Separator\`,
                    \`Master Variant Ind\`
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

export default ItemCodeGenerationRepository;
