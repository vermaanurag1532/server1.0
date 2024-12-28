import connection from "../../../db/connection.js";

class FormulaMappingRepository {
  async getAll() {
    const query = "SELECT * FROM `Formula Procedure Formula Mapping`";
    const [rows] = await connection.promise().query(query);
    return rows;
  }

  async getById(procedureName) {
    const query = "SELECT * FROM `Formula Procedure Formula Mapping` WHERE `Procedure Name` = ?";
    const [rows] = await connection.promise().query(query, [procedureName]);
    return rows[0];
  }

  async create(data) {
    const query = `
      INSERT INTO \`Formula Procedure Formula Mapping\` (
        \`Procedure Type\`, \`Transaction Type\`, \`Document Type\`, 
        \`Transaction Category\`, \`Party Name\`, \`Variant Name\`, 
        \`Item Group\`, \`Attribute Type\`, \`Attribute Value\`, 
        \`Operation\`, \`Operation Type\`, \`Procedure Name\`, 
        \`Trans Type\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.procedureType,
      data.transactionType,
      data.documentType,
      data.transactionCategory,
      data.partyName,
      data.variantName,
      data.itemGroup,
      data.attributeType,
      data.attributeValue,
      data.operation,
      data.operationType,
      data.procedureName,
      data.transType,
    ];
    const [result] = await connection.promise().query(query, values);
    return result.insertId;
  }
}

export default new FormulaMappingRepository();
