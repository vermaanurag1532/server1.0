import connection from "../../../db/connection.js";

class FormulaTransactionRepository {
  // Fetch all records
  async getAll() {
    const query = "SELECT * FROM `Formula Procedure Formula Mapping Transaction Type`";
    const [rows] = await connection.promise().query(query);
    return rows;
  }

  // Fetch a record by ID
  async getById(configId) {
    const query = "SELECT * FROM `Formula Procedure Formula Mapping Transaction Type` WHERE `Config Id` = ?";
    const [rows] = await connection.promise().query(query, [configId]);
    return rows[0];
  }

  // Insert a new record
  async create(data) {
    const query = `
      INSERT INTO \`Formula Procedure Formula Mapping Transaction Type\` (
        \`Config Id\`, \`Config code\`, \`Config value\`, 
        \`Config remark1\`, \`Config remark2\`, \`Config remark3\`, \`Depd Config_ID\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.configId,
      data.configCode,
      data.configValue,
      data.configRemark1,
      data.configRemark2,
      data.configRemark3,
      data.depdConfigId,
    ];
    const [result] = await connection.promise().query(query, values);
    return result.insertId;
  }
}

export default new FormulaTransactionRepository();
