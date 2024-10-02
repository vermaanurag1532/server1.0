import connection from '../../../../db/connection.js';

const ItemRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Item master and variant Certificate Style Certificate Item`';
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
                INSERT INTO \`Item master and variant Certificate Style Certificate Item\` (
                    \`Certificate Item Name\`,
                    \`Row status\`,
                    \`Created Date\`,
                    \`Update Date\`,
                ) VALUES (?, ?, ?, ?)
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

export default ItemRepository;
