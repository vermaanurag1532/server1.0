// BarcodeDetail.repository.js
import connection from '../../db/connection.js'; // Update with your actual DB connection file

const BarcodeDetailRepository = {
  // Fetch all Barcode Details
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `Barcode detail`';
      connection.query(query, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },

  // Fetch a Barcode Detail by Stock ID
  getByStockId: (stockId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `Barcode detail` WHERE `Stock ID` = ?';
      connection.query(query, [stockId], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },

  // Add a new Barcode Detail
  create: (barcodeDetail) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO \`Barcode detail\` (
                \`Stock ID\`, \`Date\`, \`Trans No\`, \`Trans Type\`, \`Source\`, \`Destination\`,
                \`Customer\`, \`Vendor\`, \`Source Dept\`, \`Destination Dept\`, \`Exchange rate\`,
                \`Currency\`, \`Sales Person\`, \`Term\`, \`Remark\`, \`Created By\`, \`Varient\`,
                \`Posting Date\`
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            barcodeDetail.stockId,
            barcodeDetail.date,
            barcodeDetail.transNo,
            barcodeDetail.transType,
            barcodeDetail.source,
            barcodeDetail.destination,
            barcodeDetail.customer,
            barcodeDetail.vendor,
            barcodeDetail.sourceDept,
            barcodeDetail.destinationDept,
            barcodeDetail.exchangeRate,
            barcodeDetail.currency,
            barcodeDetail.salesPerson,
            barcodeDetail.term,
            barcodeDetail.remark,
            barcodeDetail.createdBy,
            barcodeDetail.varient,
            barcodeDetail.postingDate,
        ];
        connection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
},

  // Delete a Barcode Detail by Stock ID
  deleteByStockId: (stockId) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM `Barcode detail` WHERE `Stock ID` = ?';
      connection.query(query, [stockId], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },
};

export default BarcodeDetailRepository;
