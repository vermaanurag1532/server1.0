import connection from "../../../db/connection.js";

const RawMaterialRepository = {
  generateStockId: async () => {
    return new Promise((resolve, reject) => {
        connection.beginTransaction((err) => {
            if (err) return reject(err);

            const query = `
                SELECT \`Stock ID\` 
                FROM \`Raw Material\` 
                WHERE \`Stock ID\` REGEXP '^RW-[0-9]+$' 
                ORDER BY CAST(SUBSTRING_INDEX(\`Stock ID\`, '-', -1) AS UNSIGNED) DESC 
                LIMIT 1
            `;

            connection.query(query, (err, results) => {
                if (err) {
                    return connection.rollback(() => reject(err));
                }

                let nextNumber = 1;
                if (results.length > 0) {
                    const lastStockId = results[0]["Stock ID"];
                    const lastNumber = parseInt(lastStockId.split("-")[1], 10);
                    nextNumber = lastNumber + 1;
                }

                const stockId = `RW-${nextNumber}`;

                const checkQuery = "SELECT 1 FROM \`Raw Material\` WHERE \`Stock ID\` = ? LIMIT 1";
                connection.query(checkQuery, [stockId], (err, checkResults) => {
                    if (err) {
                        return connection.rollback(() => reject(err));
                    }

                    if (checkResults.length > 0) {
                        return connection.rollback(() => reject(new Error("Stock ID already exists, try again.")));
                    }

                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => reject(err));
                        }
                        resolve(stockId);
                    });
                });
            });
        });
    });
},



    insert: async (data) => {
        const stockId = await RawMaterialRepository.generateStockId();

        const query = `
        INSERT INTO \`Raw Material\` (
          \`Stock ID\`, \`Style\`, \`Varient Name\`, \`Old Varient\`, 
          \`Customer Varient\`, \`Base Varient\`, \`Vendor Code\`, \`Vendor\`, 
          \`Location\`, \`Department\`, \`Remark 1\`, \`Vendor Varient\`, \`Remark 2\`, 
          \`Created By\`, \`Std Buying Rate\`, \`Stone Max Wt\`, \`Remark\`, 
          \`Stone Min Wt\`, \`Karat Color\`, \`Delivery Days\`, \`For Web\`, 
          \`Row Status\`, \`Verified Status\`, \`Length\`, \`Codegen Sr No\`, 
          \`CATEGORY\`, \`Sub-Category\`, \`STYLE KARAT\`, \`Varient\`, 
          \`HSN - SAC CODE\`, \`LINE OF BUSINESS\`,
          \`Image Details\`, \`Pieces\`, \`Weight\`, 
          \`Net Weight\`, \`Dia Weight\`, \`Dia Pieces\`, \`Location Code\`, 
          \`Item Group\`, \`Metal Color\`, \`Style Metal Color\`, \`Inward Doc\`, \`Last Trans\`
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [
        stockId, data.style, data.varientName, data.oldVarient,
        data.customerVarient, data.baseVarient, data.vendorCode, data.vendor,
        data.location, data.department, data.remark1, data.vendorVarient, data.remark2,
        data.createdBy, data.stdBuyingRate, data.stoneMaxWt, data.remark, data.stoneMinWt,
        data.karatColor, data.deliveryDays, data.forWeb, data.rowStatus, data.verifiedStatus,
        data.length, data.codegenSrNo, data.category, data.subCategory, data.styleKarat,
        data.varient, data.hsnSacCode, data.lineOfBusiness,
        JSON.stringify(data.imageDetails),data.pieces, data.weight, data.netWeight,
        data.diaWeight, data.diaPieces, data.locationCode, data.itemGroup, data.metalColor,
        data.styleMetalColor ,data.inwardDoc , data.lastTrans
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
        const query = "SELECT * FROM `Raw Material`";
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
        const query = "SELECT * FROM `Raw Material` WHERE `Stock ID` = ?";
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
          UPDATE \`Raw Material\` SET 
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
            \`Image Details\` = ?,\`Pieces\` = ?, \`Weight\` = ?, 
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
          data.hsnSacCode, data.lineOfBusiness,JSON.stringify(data.imageDetails),
          data.pieces, data.weight,
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
        const query = "DELETE FROM `Raw Material` WHERE `Stock ID` = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
      },
};

export default RawMaterialRepository;
