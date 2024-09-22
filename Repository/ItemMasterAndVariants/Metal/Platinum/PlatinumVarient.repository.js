import connection from '../../../../db/connection.js';

const MetalGoldVariantsRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Item master and variant Metal Platinum Variants`';
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
                INSERT INTO \`Item master and variant Metal Platinum Variants\` (
                    \`Metal name\`,
                    \`Variant type\`,
                    \`Base metal Variant\`,
                    \`Std. selling rate\`,
                    \`Std. buying rate\`,
                    \`Reorder Qty\`,
                    \`Used in BOM\`,
                    \`Can Return in Melting\`,
                    \`Row status\`,
                    \`Created Date\`,
                    \`Update Date\`,
                    \`Metal Color\`,
                    \`Karat\`
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?)
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

export default MetalGoldVariantsRepository;
