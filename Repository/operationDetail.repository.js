import db from '../db/connection.js'

const OperationRepository = {
  getAll: () => {
    return db.promise().query('SELECT * FROM Operations');
  },

  getById: (operationId) => {
    return db.promise().query('SELECT * FROM Operations WHERE OperationId = ?', [operationId]);
  },

  getMaxOperationNumber: async () => {
    const [rows] = await db.promise().query(`SELECT OperationId FROM Operations ORDER BY OperationId DESC LIMIT 1`);
    if (rows.length > 0) {
      const lastId = rows[0].OperationId;
      const num = parseInt(lastId.split('-')[1] || '0');
      return num;
    }
    return 0;
  },

  create: (data) => {
    return db.promise().query('INSERT INTO Operations SET ?', data);
  },

  update: (operationId, data) => {
    return db.promise().query('UPDATE Operations SET ? WHERE OperationId = ?', [data, operationId]);
  },

  delete: (operationId) => {
    return db.promise().query('DELETE FROM Operations WHERE OperationId = ?', [operationId]);
  }
};

export default OperationRepository;
