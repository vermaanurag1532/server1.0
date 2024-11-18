// Repository/Master/CalcMethodValue/CalcMethodValueRepository.js
import connection from '../../../db/connection.js';

const CalcMethodValueRepository = {
    getAllCalcMethodValues: async () => {
        const query = 'SELECT * FROM `Calc Method Value`';
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

    addCalcMethodValue: async (data) => {
        const query = 'INSERT INTO `Calc Method Value` (`Config Id`, `Config value`) VALUES (?, ?)';
        return new Promise((resolve, reject) => {
            connection.query(query, [data.configId, data.configValue], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
};

export default CalcMethodValueRepository;
