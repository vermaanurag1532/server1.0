import connection from "../../db/connection.js";

const BarcodeHistoryRepository = {
  insert: async (data) => {
    const query = `
      INSERT INTO \`Barcode History\` (
        \`Stock ID\`, \`Attribute\`, \`Varient\`, \`Transaction Number\`,
        \`Date\`, \`BOM\`, \`Operation\`, \`Formula\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.stockId,
      data.attribute,
      data.varient,
      data.transactionNumber,
      data.date,
      JSON.stringify(data.bom),
      JSON.stringify(data.operation),
      JSON.stringify(data.formula),
    ];
    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  findAll: () => {
    const query = "SELECT * FROM `Barcode History`";
    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  findByStockId: (stockId) => {
    const query = "SELECT * FROM `Barcode History` WHERE `Stock ID` = ?";
    return new Promise((resolve, reject) => {
      connection.query(query, [stockId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  deleteByStockId: (stockId) => {
    const query = "DELETE FROM `Barcode History` WHERE `Stock ID` = ?";
    return new Promise((resolve, reject) => {
      connection.query(query, [stockId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};

export default BarcodeHistoryRepository;
