// Updated ItemMasterVariant.repository.js
import connection from "../../../../db/connection.js";

const ItemMasterVariantRepository = {
  generateVariantName: async (data) => {
    const countQuery = `
      SELECT COUNT(*) as count 
      FROM \`Item Master and Variant Style Style Varient\`
      WHERE \`LINE OF BUSINESS\` = ? 
      AND \`CATEGORY\` = ? 
      AND \`SUB-CATEGORY\` = ? 
      AND \`VARIETY\` = ? 
      AND \`STYLE KARAT\` = ?
    `;
    
    const countValues = [
      data.lineOfBusiness,
      data.category,
      data.subCategory,
      data.variety,
      data.styleKarat
    ];
    
    const countResult = await new Promise((resolve, reject) => {
      connection.query(countQuery, countValues, (err, results) => {
        if (err) reject(err);
        else resolve(results[0].count + 1);
      });
    });
    
    return `${data.lineOfBusiness}-${data.category}-${data.subCategory}-${data.variety}-${data.styleKarat}-${countResult}`;
  },

  insert: async (data) => {
    const variantName = await ItemMasterVariantRepository.generateVariantName(data);
    
    // Updated query with correct column count (38 columns)
    const query = `
      INSERT INTO \`Item Master and Variant Style Style Varient\` (
        \`Variant Name\`, \`Style\`, \`Old Variant\`, \`Customer Variant\`,
        \`Base Variant\`, \`Vendor\`, \`Remark 1\`, \`Vendor Variant\`,
        \`Remark 2\`, \`Created By\`, \`Std Buying Rate\`, \`Stone Max Wt\`,
        \`Remark\`, \`Stone Min Wt\`, \`Karat Color\`, \`Delivery Days\`,
        \`For Web\`, \`Row Status\`, \`Verified Status\`, \`Length\`,
        \`Codegen Sr No\`, \`CATEGORY\`, \`SUB-CATEGORY\`, \`STYLE KARAT\`,
        \`VARIETY\`, \`HSN - SAC CODE\`, \`LINE OF BUSINESS\`, \`SIZE\`,
        \`BRAND\`, \`OSSASION\`, \`GENDER\`, \`SIZING POSSIBILITY\`,
        \`STYLE COLOR\`, \`VENDOR SUB PRODUCT\`, \`SUB CLUSTER\`,
        \`BOM\`, \`Operation\`, \`Image Details\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    // Updated values array (38 values)
    const values = [
      variantName, // 1
      data.style || null, // 2
      data.oldVariant || null, // 3
      data.customerVariant || null, // 4
      data.baseVariant || null, // 5
      data.vendor || null, // 6
      data.remark1 || null, // 7
      data.vendorVariant || null, // 8
      data.remark2 || null, // 9
      data.createdBy || null, // 10
      data.stdBuyingRate || null, // 11
      data.stoneMaxWt || null, // 12
      data.remark || null, // 13
      data.stoneMinWt || null, // 14
      data.karatColor || null, // 15
      data.deliveryDays || null, // 16
      data.forWeb || null, // 17
      data.rowStatus || 'Active', // 18
      data.verifiedStatus || 'Pending', // 19
      data.length || null, // 20
      data.codegenSrNo || null, // 21
      data.category || null, // 22
      data.subCategory || null, // 23
      data.styleKarat || null, // 24
      data.variety || null, // 25
      data.hsnSacCode || null, // 26
      data.lineOfBusiness || null, // 27
      data.size || null, // 28
      data.brand || null, // 29
      data.ossasion || null, // 30
      data.gender || null, // 31
      data.sizingPossibility || null, // 32
      data.styleColor || null, // 33
      data.vendorSubProduct || null, // 34
      data.subCluster || null, // 35
      data.bom ? JSON.stringify(data.bom) : null, // 36
      data.operation ? JSON.stringify(data.operation) : null, // 37
      data.imageDetails ? JSON.stringify(data.imageDetails) : null // 38
    ];
    
    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Database error:', err); // Log detailed error
          reject(err);
        } else {
          resolve({...results, variantName});
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