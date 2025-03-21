import connection from "../../../db/connection.js";

const ProcurementGoodReceiptRepository = {
  generateStockId: () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT \`Stock ID\` 
            FROM \`Procurement Good Receipt Note\` 
            WHERE \`Stock ID\` LIKE 'STC-%' 
            ORDER BY CAST(SUBSTRING(\`Stock ID\`, 5) AS UNSIGNED) DESC 
            LIMIT 1
        `;

        connection.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }

            let nextNumber = 1;
            if (results.length > 0) {
                const lastStockId = results[0]["Stock ID"];
                const lastNumber = parseInt(lastStockId.split("-")[1], 10);
                nextNumber = lastNumber + 1;
            }

            const stockId = `STC-${nextNumber}`;
            resolve(stockId);
        });
    });
},


insert: async (data) => {
  const stockId = await ProcurementGoodReceiptRepository.generateStockId();

  const query = `
      INSERT INTO \`Procurement Good Receipt Note\` (
          \`Stock ID\`, \`Style\`, \`Varient Name\`, \`Old Varient\`, 
          \`Customer Varient\`, \`Base Varient\`, \`Vendor Code\`, \`Vendor\`, 
          \`Location\`, \`Department\`, \`Remark 1\`, \`Vendor Varient\`, \`Remark 2\`, 
          \`Created By\`, \`Std Buying Rate\`, \`Stone Max Wt\`, \`Remark\`, 
          \`Stone Min Wt\`, \`Karat Color\`, \`Delivery Days\`, \`For Web\`, 
          \`Row Status\`, \`Verified Status\`, \`Length\`, \`Codegen Sr No\`, 
          \`CATEGORY\`, \`Sub-Category\`, \`STYLE KARAT\`, \`Varient\`, 
          \`HSN - SAC CODE\`, \`LINE OF BUSINESS\`, \`BOM\`, \`Operation\`, 
          \`Image Details\`, \`Formula Details\`, \`Pieces\`, \`Weight\`, 
          \`Net Weight\`, \`Dia Weight\`, \`Dia Pieces\`, \`Location Code\`, 
          \`Item Group\`, \`Metal Color\`, \`Style Metal Color\`, \`Inward Doc\`, 
          \`Last Trans\`, \`isRawMaterial\`, \`Variant Type\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
      stockId, data.style, data.varientName, data.oldVarient,
      data.customerVarient, data.baseVarient, data.vendorCode, data.vendor,
      data.location, data.department, data.remark1, data.vendorVarient, data.remark2,
      data.createdBy, data.stdBuyingRate, data.stoneMaxWt, data.remark, data.stoneMinWt,
      data.karatColor, data.deliveryDays, data.forWeb, data.rowStatus, data.verifiedStatus,
      data.length, data.codegenSrNo, data.category, data.subCategory, data.styleKarat,
      data.varient, data.hsnSacCode, data.lineOfBusiness, JSON.stringify(data.bom),
      JSON.stringify(data.operation), JSON.stringify(data.imageDetails),
      JSON.stringify(data.formulaDetails), data.pieces, data.weight, data.netWeight,
      data.diaWeight, data.diaPieces, data.locationCode, data.itemGroup, data.metalColor,
      data.styleMetalColor, data.inwardDoc, data.lastTrans, data.isRawMaterial, data.variantType
  ];

  return new Promise((resolve, reject) => {
      connection.query(query, values, (err, results) => {
          if (err) {
              reject(err);
          } else {
              resolve(stockId); // Return only the stockId
          }
      });
  });
},

    findAll: () => {
        const query = "SELECT * FROM `Procurement Good Receipt Note`";
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
        const query = "SELECT * FROM `Procurement Good Receipt Note` WHERE `Stock ID` = ?";
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
          UPDATE \`Procurement Good Receipt Note\` SET 
            \`Style\` = ?, \`Varient Name\` = ?, \`Old Varient\` = ?, 
            \`Customer Varient\` = ?, \`Base Varient\` = ?, \`Vendor Code\` = ?, 
            \`Vendor\` = ?, \`Location\` = ?, \`Department\` = ?, \`Remark 1\` = ?, 
            \`Vendor Varient\` = ?, \`Remark 2\` = ?, \`Created By\` = ?, 
            \`Std Buying Rate\` = ?, \`Stone Max Wt\` = ?, \`Remark\` = ?, 
            \`Stone Min Wt\` = ?, \`Karat Color\` = ?, \`Delivery Days\` = ?, 
            \`For Web\` = ?, \`Row Status\` = ?, \`Verified Status\` = ?, 
            \`Length\` = ?, \`Codegen Sr No\` = ?, \`CATEGORY\` = ?, 
            \`Sub-Category\` = ?, \`STYLE KARAT\` = ?, \`Varient\` = ?, 
            \`HSN - SAC CODE\` = ?, \`LINE OF BUSINESS\` = ?, 
            \`BOM\` = ?, \`Operation\` = ?, \`Image Details\` = ?, 
            \`Formula Details\` = ?, \`Pieces\` = ?, \`Weight\` = ?, 
            \`Net Weight\` = ?, \`Dia Weight\` = ?, \`Dia Pieces\` = ?, 
            \`Location Code\` = ?, \`Item Group\` = ?, \`Metal Color\` = ?, 
            \`Style Metal Color\` = ? WHERE \`Stock ID\` = ?
        `;
        const values = [
          data.style, data.varientName, data.oldVarient, data.customerVarient,
          data.baseVarient, data.vendorCode, data.vendor, data.location,
          data.department, data.remark1, data.vendorVarient, data.remark2,
          data.createdBy, data.stdBuyingRate, data.stoneMaxWt, data.remark,
          data.stoneMinWt, data.karatColor, data.deliveryDays, data.forWeb,
          data.rowStatus, data.verifiedStatus, data.length, data.codegenSrNo,
          data.category, data.subCategory, data.styleKarat, data.varient,
          data.hsnSacCode, data.lineOfBusiness, JSON.stringify(data.bom),
          JSON.stringify(data.operation), JSON.stringify(data.imageDetails),
          JSON.stringify(data.formulaDetails), data.pieces, data.weight,
          data.netWeight, data.diaWeight, data.diaPieces, data.locationCode,
          data.itemGroup, data.metalColor, data.styleMetalColor, id
        ];
        return new Promise((resolve, reject) => {
          connection.query(query, values, (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
      },
    
      delete: (id) => {
        const query = "DELETE FROM `Procurement Good Receipt Note` WHERE `Stock ID` = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
      },
};

export default ProcurementGoodReceiptRepository;
