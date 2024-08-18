import connection from "../../db/connection.js";

const ItemConfigurationItemNatureRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ItemConfigurationItemNature';

            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error retrieving data:', err.stack);
                    reject('Database error');
                } else {
                    resolve(results);
                }
            });
        });
    },

    insert: (params) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ItemConfigurationItemNature (
                    ConfigID, ConfigType, ConfigCode, ConfigValue, ConfigRemark1,
                    ConfigRemark2, DepdConfigCode, DepdConfigID, DepdConfigValue,
                    Keywords, RowStatus
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            connection.query(query, params, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err.stack);
                    reject('Database error');
                } else {
                    resolve(results);
                }
            });
        });
    }
};

export default ItemConfigurationItemNatureRepository;
