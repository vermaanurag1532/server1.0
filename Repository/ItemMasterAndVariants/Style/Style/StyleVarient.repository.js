import connection from "../../../../db/connection.js";

const ItemMasterVariantRepository = {
  insert: (data) => {
    const query = `
      INSERT INTO \`Item Master and Variant Style Style Varient\` (
        \`Style\`, \`Varient Name\`, \`Old Varient\`, \`Customer Varient\`,
        \`Base Varient\`, \`Vendor\`, \`Remark 1\`, \`Vendor Varient\`,
        \`Remark 2\`, \`Created By\`, \`Std Buying Rate\`, \`Stone Max Wt\`,
        \`Remark\`, \`Stone Min Wt\`, \`Karat Color\`, \`Delivery Days\`,
        \`For Web\`, \`Row Status\`, \`Verified Status\`, \`Length\`,
        \`Codegen Sr No\`, \`Category\`, \`Sub-Category\`, \`Style Karat\`,
        \`Varient\`, \`HSN-SAC Code\`, \`Line of Business\`, \`BOM\`, \`Operation\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.style, data.variantName, data.oldVariant, data.customerVariant,
      data.baseVariant, data.vendor, data.remark1, data.vendorVariant,
      data.remark2, data.createdBy, data.stdBuyingRate, data.stoneMaxWt,
      data.remark, data.stoneMinWt, data.karatColor, data.deliveryDays,
      data.forWeb, data.rowStatus, data.verifiedStatus, data.length,
      data.codegenSrNo, data.category, data.subCategory, data.styleKarat,
      data.variant, data.hsnSacCode, data.lineOfBusiness, JSON.stringify(data.bom), JSON.stringify(data.operation)
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
    const query = `SELECT * FROM \`Item Master and Variant Style Style Varient\``;
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
};

export default ItemMasterVariantRepository;
