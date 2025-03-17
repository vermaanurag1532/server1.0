import connection from "../../../../db/connection.js";

const DiamondVariantRepository = {

  generateStoneVariantName: (data) => {
    // Construct the variant name using the provided fields
    const stoneVariantName = `${data.stoneName}-${data.shape}-${data.quality}-${data.stoneColor}-${data.range}`;
    return Promise.resolve(stoneVariantName);
    },

  insert: async (data) => {
    const stoneVariantName = await DiamondVariantRepository.generateStoneVariantName(data);

    const query = `
      INSERT INTO \`Item Master and Variant Stone Diamond Variant\` (
        \`Stone Variant Name\`, \`Stone Name\`, \`Manual Code Gen\`, 
        \`Variant Type\`, \`Old Variant\`, \`Customer Variant Name\`,
        \`Vendor Name\`, \`Tag Remark\`, \`Std Selling Rate\`,
        \`Std Buying Rate\`, \`Average Weight\`, \`Used as BOM\`,
        \`Mix Variant\`, \`Row Status\`, \`Verified Status\`,
        \`SHAPE\`, \`QUALITY\`, \`RANGE\`, \`STONE COLOR\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      stoneVariantName, data.stoneName, data.manualCodeGen,
      data.variantType, data.oldVariant, data.customerVariantName,
      data.vendorName, data.tagRemark, data.stdSellingRate,
      data.stdBuyingRate, data.averageWeight, data.usedAsBom,
      data.mixVariant, data.rowStatus, data.verifiedStatus,
      data.shape, data.quality, data.range, data.stoneColor
    ];
    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: results.insertId, stoneVariantName });
        }
      });
    });
  },

  findAll: () => {
    const query = "SELECT * FROM `Item Master and Variant Stone Diamond Variant`";
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

  findById: (id) => {
    const query = "SELECT * FROM `Item Master and Variant Stone Diamond Variant` WHERE `Manual Code Gen` = ?";
    return new Promise((resolve, reject) => {
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  update: (id, data) => {
    const query = `
      UPDATE \`Item Master and Variant Stone Diamond Variant\`
      SET \`Stone Variant Name\` = ?, \`Stone Name\` = ?, \`Variant Type\` = ?,
          \`Old Variant\` = ?, \`Customer Variant Name\` = ?, \`Vendor Name\` = ?,
          \`Tag Remark\` = ?, \`Std Selling Rate\` = ?, \`Std Buying Rate\` = ?,
          \`Average Weight\` = ?, \`Used as BOM\` = ?, \`Mix Variant\` = ?,
          \`Row Status\` = ?, \`Verified Status\` = ?, \`SHAPE\` = ?,
          \`QUALITY\` = ?, \`RANGE\` = ?, \`STONE COLOR\` = ?
      WHERE \`Manual Code Gen\` = ?
    `;
    const values = [
      data.stoneVariantName, data.stoneName, data.variantType,
      data.oldVariant, data.customerVariantName, data.vendorName,
      data.tagRemark, data.stdSellingRate, data.stdBuyingRate,
      data.averageWeight, data.usedAsBom, data.mixVariant,
      data.rowStatus, data.verifiedStatus, data.shape,
      data.quality, data.range, data.stoneColor, id
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

  delete: (id) => {
    const query = "DELETE FROM `Item Master and Variant Stone Diamond Variant` WHERE `Manual Code Gen` = ?";
    return new Promise((resolve, reject) => {
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
};

export default DiamondVariantRepository;
