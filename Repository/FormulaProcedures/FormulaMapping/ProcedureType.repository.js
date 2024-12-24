import connection from "../../../db/connection.js";

class FormulaRepository {
  async getAll() {
    try {
      const query = "SELECT * FROM `Formula Procedure Formula Mapping Procedure Type`";
      const [rows] = await connection.promise().query(query); // Added `.promise()` to connection
      return rows;
    } catch (error) {
      throw new Error(`Error fetching all records: ${error.message}`);
    }
  }

  async getById(configId) {
    try {
      const query = "SELECT * FROM `Formula Procedure Formula Mapping Procedure Type` WHERE `Config Id` = ?";
      const [rows] = await connection.promise().query(query, [configId]); // Added `.promise()`
      return rows[0];
    } catch (error) {
      throw new Error(`Error fetching record by ID: ${error.message}`);
    }
  }

  async create(data) {
    try {
      const query = `
        INSERT INTO \`Formula Procedure Formula Mapping Procedure Type\` (
          \`Config Id\`, \`Config code\`, \`Config value\`, \`Config remark3\`, \`Config remark2\`
        ) VALUES (?, ?, ?, ?, ?)
      `;
      const values = [data.configId, data.configCode, data.configValue, data.configRemark3, data.configRemark2];
      const [result] = await connection.promise().query(query, values); // Added `.promise()`
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating record: ${error.message}`);
    }
  }
}

export default new FormulaRepository();
