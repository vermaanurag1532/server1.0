import connection from "../../db/connection.js";

const ItemConfigurationStockUOMRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ItemConfigurationStockUOM';

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
                INSERT INTO ItemConfigurationStockUOM (
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

export default ItemConfigurationStockUOMRepository;
