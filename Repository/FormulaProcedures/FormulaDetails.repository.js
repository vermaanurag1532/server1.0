import connection from "../../db/connection.js";

class FormulaDetailsRepository {
  /**
   * Get all formula details
   * @returns {Promise<Array>} All formula details
   */
  async getAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM `Formula Details`";
      connection.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  /**
   * Get formula details by formula ID
   * @param {string} formulaId - The formula ID to search for
   * @returns {Promise<Array>} Formula details with the given formula ID
   */
  async getByFormulaId(formulaId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM `Formula Details` WHERE `formulaId` = ?";
      connection.query(query, [formulaId], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  /**
   * Get the latest formula ID
   * @returns {Promise<string>} The latest formula ID
   */
  async getLatestFormulaId() {
    return new Promise((resolve, reject) => {
      // Modified query to handle numeric extraction and sorting
      const query = `
        SELECT formulaId 
        FROM \`Formula Details\` 
        WHERE formulaId LIKE 'Formula-%' 
        ORDER BY CAST(SUBSTRING_INDEX(formulaId, '-', -1) AS UNSIGNED) DESC 
        LIMIT 1
      `;
      
      connection.query(query, (err, results) => {
        if (err) reject(err);
        else {
          // If no results, start with Formula-0
          if (results.length === 0) {
            resolve("Formula-0");
          } else {
            resolve(results[0].formulaId);
          }
        }
      });
    });
  }

  /**
   * Create a new formula detail
   * @param {Object} formulaDetail - The formula detail to create
   * @returns {Promise<Object>} Result of the insert operation
   */
  async create(formulaDetail) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO \`Formula Details\` (
          \`formulaId\`, \`id\`, \`rowNo\`, \`mrpInd\`, \`rowType\`, 
          \`rangeDtl\`, \`rowValue\`, \`rowStatus\`, \`variantId\`, 
          \`visibleInd\`, \`editableInd\`, \`maxRateValue\`, \`minRateValue\`,
          \`rowExpression\`, \`rowDescription\`, \`rowExpressionId\`, 
          \`rateAsPerFormula\`, \`rowExpressionValue\`, \`validateExpression\`,
          \`hideDefaultValueInd\`, \`attribTypeAndAttribId\`, \`dataType\`
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        formulaDetail.formulaId,
        formulaDetail.id,
        formulaDetail.rowNo,
        formulaDetail.mrpInd,
        formulaDetail.rowType,
        formulaDetail.rangeDtl,
        formulaDetail.rowValue,
        formulaDetail.rowStatus,
        formulaDetail.variantId,
        formulaDetail.visibleInd,
        formulaDetail.editableInd,
        formulaDetail.maxRateValue,
        formulaDetail.minRateValue,
        formulaDetail.rowExpression,
        formulaDetail.rowDescription,
        formulaDetail.rowExpressionId,
        formulaDetail.rateAsPerFormula,
        formulaDetail.rowExpressionValue,
        formulaDetail.validateExpression,
        formulaDetail.hideDefaultValueInd,
        formulaDetail.attribTypeAndAttribId,
        formulaDetail.dataType
      ];
      connection.query(query, values, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  /**
   * Update a formula detail
   * @param {string} formulaId - The formula ID to update
   * @param {string} id - The row ID to update
   * @param {Object} formulaDetail - The updated formula detail
   * @returns {Promise<Object>} Result of the update operation
   */
  async update(formulaId, id, formulaDetail) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE \`Formula Details\` SET
          \`rowNo\` = ?,
          \`mrpInd\` = ?,
          \`rowType\` = ?,
          \`rangeDtl\` = ?,
          \`rowValue\` = ?,
          \`rowStatus\` = ?,
          \`variantId\` = ?,
          \`visibleInd\` = ?,
          \`editableInd\` = ?,
          \`maxRateValue\` = ?,
          \`minRateValue\` = ?,
          \`rowExpression\` = ?,
          \`rowDescription\` = ?,
          \`rowExpressionId\` = ?,
          \`rateAsPerFormula\` = ?,
          \`rowExpressionValue\` = ?,
          \`validateExpression\` = ?,
          \`hideDefaultValueInd\` = ?,
          \`attribTypeAndAttribId\` = ?,
          \`dataType\` = ?
        WHERE \`formulaId\` = ? AND \`id\` = ?
      `;
      const values = [
        formulaDetail.rowNo,
        formulaDetail.mrpInd,
        formulaDetail.rowType,
        formulaDetail.rangeDtl,
        formulaDetail.rowValue,
        formulaDetail.rowStatus,
        formulaDetail.variantId,
        formulaDetail.visibleInd,
        formulaDetail.editableInd,
        formulaDetail.maxRateValue,
        formulaDetail.minRateValue,
        formulaDetail.rowExpression,
        formulaDetail.rowDescription,
        formulaDetail.rowExpressionId,
        formulaDetail.rateAsPerFormula,
        formulaDetail.rowExpressionValue,
        formulaDetail.validateExpression,
        formulaDetail.hideDefaultValueInd,
        formulaDetail.attribTypeAndAttribId,
        formulaDetail.dataType,
        formulaId,
        id
      ];
      connection.query(query, values, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  /**
   * Delete formula details by formula ID
   * @param {string} formulaId - The formula ID to delete
   * @returns {Promise<Object>} Result of the delete operation
   */
  async deleteByFormulaId(formulaId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM `Formula Details` WHERE `formulaId` = ?";
      connection.query(query, [formulaId], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  /**
   * Delete a specific formula detail
   * @param {string} formulaId - The formula ID to delete
   * @param {string} id - The row ID to delete
   * @returns {Promise<Object>} Result of the delete operation
   */
  async deleteFormulaDetail(formulaId, id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM `Formula Details` WHERE `formulaId` = ? AND `id` = ?";
      connection.query(query, [formulaId, id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}

export default new FormulaDetailsRepository();