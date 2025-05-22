import db from '../db/connection.js'

const OperationRepository = {
  getAll: () => {
    return db.promise().query('SELECT * FROM Operations');
  },

  getById: (operationId) => {
    return db.promise().query('SELECT * FROM Operations WHERE OperationId = ?', [operationId]);
  },

  getMaxOperationNumber: async () => {
    try {
      console.log('Getting max operation number...');
      
      // Get all operation IDs and find the maximum numeric part
      const [rows] = await db.promise().query(`SELECT OperationId FROM Operations WHERE OperationId LIKE 'Operation-%'`);
      
      if (rows.length === 0) {
        console.log('No operations found, returning 0');
        return 0;
      }

      let maxNum = 0;
      
      for (const row of rows) {
        const operationId = row.OperationId;
        // Extract the numeric part after 'Operation-'
        const parts = operationId.split('-');
        if (parts.length >= 2) {
          const numPart = parseInt(parts[1]);
          if (!isNaN(numPart) && numPart > maxNum) {
            maxNum = numPart;
          }
        }
      }
      
      console.log('Max operation number found:', maxNum);
      return maxNum;
    } catch (error) {
      console.error('Error getting max operation number:', error);
      return 0;
    }
  },

  create: (data) => {
    console.log('Creating operation in repository:', data);
    return db.promise().query('INSERT INTO Operations SET ?', data);
  },

  update: (operationId, data) => {
    console.log('Updating operation in repository:', { operationId, data });
    return db.promise().query('UPDATE Operations SET ? WHERE OperationId = ?', [data, operationId]);
  },

  delete: (operationId) => {
    console.log('Deleting operation in repository:', operationId);
    return db.promise().query('DELETE FROM Operations WHERE OperationId = ?', [operationId]);
  }
};

export default OperationRepository;