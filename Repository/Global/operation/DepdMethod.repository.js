// Repository/Master/DepdMethod/DepdMethodRepository.js
import connection from '../../../db/connection.js';

const DepdMethodRepository = {
    getAllDepdMethods: async () => {
        const query = 'SELECT * FROM `Depd Method`';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },

    addDepdMethod: async (data) => {
        const query = 'INSERT INTO `Depd Method` (`Config Id`, `Config code`, `Config value`) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.query(query, [data.configId, data.configCode, data.configValue], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
};

export default DepdMethodRepository;
