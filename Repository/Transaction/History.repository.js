import connection from '../../db/connection.js';

const TransactionHistoryRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `Transaction History`', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },
    
    getById: (transId) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `Transaction History` WHERE transId = ?', [transId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },
    
    create: (transaction) => {
        return new Promise((resolve, reject) => {
            // Get the latest transId
            connection.query('SELECT MAX(CAST(SUBSTRING_INDEX(transId, "-", -1) AS UNSIGNED)) AS latestTransId FROM `Transaction History`', (err, results) => {
                if (err) reject(err);

                // Generate the next transId
                const nextTransId = `trans-${(results[0].latestTransId || 0) + 1}`;

                // Ensure varients is a valid JSON string
                const transactionToInsert = {
                    ...transaction,
                    transId: nextTransId,
                    varients: JSON.stringify(transaction.varients) // Serialize varients field
                };

                // Insert the transaction into the database
                connection.query('INSERT INTO `Transaction History` SET ?', transactionToInsert, (err, results) => {
                    if (err) reject(err);
                    resolve({ transId: nextTransId }); // Only return the generated transId
                });
            });
        });
    },
    
    update: (transId, transaction) => {
        return new Promise((resolve, reject) => {
            // Ensure varients is a valid JSON string
            const transactionToUpdate = {
                ...transaction,
                varients: JSON.stringify(transaction.varients) // Serialize varients field
            };

            connection.query('UPDATE `Transaction History` SET ? WHERE transId = ?', [transactionToUpdate, transId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },
    
    delete: (transId) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM `Transaction History` WHERE transId = ?', [transId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    getLatestTransId: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT MAX(CAST(SUBSTRING_INDEX(transId, "-", -1) AS UNSIGNED)) AS latestTransId FROM `Transaction History`', (err, results) => {
                if (err) reject(err);
                resolve(results[0].latestTransId);
            });
        });
    }
};

export default TransactionHistoryRepository;
