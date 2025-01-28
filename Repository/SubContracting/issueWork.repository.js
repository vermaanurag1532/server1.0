import connection from '../../db/connection.js'; // Update with your actual DB connection file

const SubContractingIssueWorkRepository = {
  // Fetch all records
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `Sub Contracting Issue Work`';
      connection.query(query, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },

  // Fetch a record by stockId
  getById: (stockId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `Sub Contracting Issue Work` WHERE `stockId` = ?';
      connection.query(query, [stockId], (error, results) => {
        if (error) return reject(error);
        resolve(results[0]);
      });
    });
  },

  // Add a new record
  create: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO \`Sub Contracting Issue Work\` (\`stockId\`, \`vendor\`, \`issueDate\`, \`operation\`)
        VALUES (?, ?, ?, ?)
      `;
      const values = [data.stockId, data.vendor, data.issueDate, data.operation];
      connection.query(query, values, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },

  // Modify a record by stockId
  modify: (stockId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE \`Sub Contracting Issue Work\`
        SET \`vendor\` = ?, \`issueDate\` = ?, \`operation\` = ?
        WHERE \`stockId\` = ?
      `;
      const values = [data.vendor, data.issueDate, data.operation, stockId];
      connection.query(query, values, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },

  // Delete a record by stockId
  deleteById: (stockId) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM `Sub Contracting Issue Work` WHERE `stockId` = ?';
      connection.query(query, [stockId], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },
};

export default SubContractingIssueWorkRepository;
