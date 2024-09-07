import connection from '../../../../db/connection.js';

const SilverItemRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Item master and variant Metal Silver Item`';
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
                INSERT INTO \`Item master and variant Metal Silver Item\` (
                    \`Metal code\`,
                    \`Exclusive Indicator\`,
                    \`Description\`,
                    \`Row status\`,
                    \`Created Date\`,
                    \`Update Date\`,
                    \`Attribute Type\`,
                    \`Attribute Value\`
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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

export default SilverItemRepository;
