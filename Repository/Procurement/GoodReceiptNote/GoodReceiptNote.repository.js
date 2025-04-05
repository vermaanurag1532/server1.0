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

  // Generate a BOM ID
  generateBomId: async () => {
    try {
        const [result] = await connection.promise().query(
            'SELECT MAX(CAST(SUBSTRING(`BOM Id`, 5) AS UNSIGNED)) AS max_num FROM `BOM Details`'
        );
        
        const nextNumber = (result[0]?.max_num || 0) + 1;
        return `BOM-${nextNumber}`;
    } catch (error) {
        console.error('Error generating BOM ID:', error.message);
        return 'BOM-1';
    }
  },

  insert: async (data) => {
    // Generate stock ID
    const stockId = await ProcurementGoodReceiptRepository.generateStockId();
    
    // Generate BOM ID if not provided
    const bomId = data.bomId || await ProcurementGoodReceiptRepository.generateBomId();
    
    return new Promise((resolve, reject) => {
      connection.beginTransaction(async (err) => {
        if (err) {
          return reject(err);
        }
        
        try {
          // Parse BOM data if it's a string
          let bomData = [];
          if (data.bomData) {
            if (typeof data.bomData === 'string') {
              try {
                bomData = JSON.parse(data.bomData);
              } catch (e) {
                console.error('Error parsing BOM data:', e);
                bomData = [];
              }
            } else if (Array.isArray(data.bomData)) {
              bomData = data.bomData;
            }
          }
          
          // Insert BOM details into the BOM Details table if provided
          if (bomData?.length) {
            const bomQuery = `
              INSERT INTO \`BOM Details\` 
              (\`Row No\`, \`BOM Id\`, \`Variant Name\`, \`Item Group\`, \`Pieces\`, \`Weight\`, \`Rate\`, 
               \`Avg Weight\`, \`Amount\`, \`SpChar\`, \`Operation\`, \`Type\`, \`FormulaID\`, \`Actions\`)
              VALUES ?
            `;
            
            const bomParams = bomData.map((bom, index) => [
              bom.rowNo || index + 1,
              bomId,
              data.variantName,
              bom.itemGroup || '',
              bom.pieces || 0,
              bom.weight || 0,
              bom.rate || 0,
              bom.avgWeight || 0,
              bom.amount || 0,
              bom.spChar || '',
              bom.operation || '',
              bom.type || '',
              bom.formulaID || '',
              JSON.stringify(bom.actions || [])
            ]);

            await connection.promise().query(bomQuery, [bomParams]);
          }
          
          // Insert GRN record with bomId and BOM JSON
          const query = `
              INSERT INTO \`Procurement Good Receipt Note\` (
                  \`Stock ID\`, \`Style\`, \`Varient Name\`, \`Old Varient\`, 
                  \`Customer Varient\`, \`Base Varient\`, \`Vendor Code\`, \`Vendor\`, 
                  \`Location\`, \`Department\`, \`Remark 1\`, \`Vendor Varient\`, \`Remark 2\`, 
                  \`Created By\`, \`Std Buying Rate\`, \`Stone Max Wt\`, \`Remark\`, 
                  \`Stone Min Wt\`, \`Karat Color\`, \`Delivery Days\`, \`For Web\`, 
                  \`Row Status\`, \`Verified Status\`, \`Length\`, \`Codegen Sr No\`, 
                  \`CATEGORY\`, \`Sub-Category\`, \`STYLE KARAT\`, \`Varient\`, 
                  \`HSN - SAC CODE\`, \`LINE OF BUSINESS\`, \`BOM\`, \`BOM Id\`, \`Operation\`, 
                  \`Image Details\`, \`Formula Details\`, \`Pieces\`, \`Weight\`, 
                  \`Net Weight\`, \`Dia Weight\`, \`Dia Pieces\`, \`Location Code\`, 
                  \`Item Group\`, \`Metal Color\`, \`Style Metal Color\`, \`Inward Doc\`, 
                  \`Last Trans\`, \`isRawMaterial\`, \`Variant type\`, \`variantForumalaID\`
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const values = [
              stockId, data.style, data.varientName, data.oldVarient,
              data.customerVarient, data.baseVarient, data.vendorCode, data.vendor,
              data.location, data.department, data.remark1, data.vendorVarient, data.remark2,
              data.createdBy, data.stdBuyingRate, data.stoneMaxWt, data.remark, data.stoneMinWt,
              data.karatColor, data.deliveryDays, data.forWeb, data.rowStatus, data.verifiedStatus,
              data.length, data.codegenSrNo, data.category, data.subCategory, data.styleKarat,
              data.varient, data.hsnSacCode, data.lineOfBusiness, 
              JSON.stringify(bomData), 
              bomId,  
              JSON.stringify(data.operation),
              JSON.stringify(data.imageDetails),
              JSON.stringify(data.formulaDetails),
              data.pieces, data.weight, data.netWeight,
              data.diaWeight, data.diaPieces, data.locationCode, data.itemGroup, data.metalColor,
              data.styleMetalColor, data.inwardDoc, data.lastTrans, data.isRawMaterial, data.variantType, 
              data.variantForumalaID
          ];
          
          await connection.promise().query(query, values);
          
          // Commit transaction
          await connection.promise().commit();
          resolve(stockId);
        } catch (error) {
          // Rollback transaction if any error occurs
          await connection.promise().rollback();
          console.error('Error in GRN insert:', error);
          reject(error);
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
  
  getBomDetailsByBomId: async (bomId) => {
      try {
          const [rows] = await connection.promise().query(
              'SELECT * FROM `BOM Details` WHERE `BOM Id` = ? ORDER BY `Row No`',
              [bomId]
          );
          return rows;
      } catch (error) {
          throw new Error(`Error fetching BOM details: ${error.message}`);
      }
  },
  
  update: (id, data) => {
      return new Promise((resolve, reject) => {
          connection.beginTransaction(async (err) => {
              if (err) {
                  return reject(err);
              }
              
              try {
                  // Get current record to find BOM ID
                  const [currentRecord] = await connection.promise().query(
                      "SELECT `BOM Id` FROM `Procurement Good Receipt Note` WHERE `Stock ID` = ?",
                      [id]
                  );
                  
                  // Use existing BOM ID or generate a new one
                  const bomId = data.bomId || 
                      (currentRecord.length > 0 ? currentRecord[0]['BOM Id'] : null) || 
                      await ProcurementGoodReceiptRepository.generateBomId();
                  
                  // Parse BOM data
                  let bomData = [];
                  if (data.bom) {
                      if (typeof data.bom === 'string') {
                          try {
                              bomData = JSON.parse(data.bom);
                          } catch (e) {
                              console.error('Error parsing BOM data:', e);
                              bomData = [];
                          }
                      } else if (Array.isArray(data.bom)) {
                          bomData = data.bom;
                      }
                  }
                  
                  // Update BOM details if present
                  if (bomId) {
                      // Delete existing BOM details
                      await connection.promise().query(
                          "DELETE FROM `BOM Details` WHERE `BOM Id` = ?",
                          [bomId]
                      );
                      
                      // Insert new BOM details if provided
                      if (bomData?.length) {
                          const bomQuery = `
                              INSERT INTO \`BOM Details\` 
                              (\`Row No\`, \`BOM Id\`, \`Variant Name\`, \`Item Group\`, \`Pieces\`, \`Weight\`, \`Rate\`,
                              \`Avg Weight\`, \`Amount\`, \`SpChar\`, \`Operation\`, \`Type\`, \`Actions\`)
                              VALUES ?
                          `;
                          
                          const bomParams = bomData.map((bom, index) => [
                              bom.rowNo || index + 1,
                              bomId,
                              data.varientName,
                              bom.itemGroup || '',
                              bom.pieces || 0,
                              bom.weight || 0,
                              bom.rate || 0,
                              bom.avgWeight || 0,
                              bom.amount || 0,
                              bom.spChar || '',
                              bom.operation || '',
                              bom.type || '',
                              JSON.stringify(bom.actions || [])
                          ]);
                          
                          await connection.promise().query(bomQuery, [bomParams]);
                      }
                  }
                  
                  // Update GRN record
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
                          \`BOM\` = ?, \`BOM Id\` = ?, \`Operation\` = ?, \`Image Details\` = ?, 
                          \`Formula Details\` = ?, \`Pieces\` = ?, \`Weight\` = ?, 
                          \`Net Weight\` = ?, \`Dia Weight\` = ?, \`Dia Pieces\` = ?, 
                          \`Location Code\` = ?, \`Item Group\` = ?, \`Metal Color\` = ?, 
                          \`Style Metal Color\` = ?, \`variantForumalaID\` = ? 
                      WHERE \`Stock ID\` = ?
                  `;
                  
                  const values = [
                      data.style, data.varientName, data.oldVarient, data.customerVarient,
                      data.baseVarient, data.vendorCode, data.vendor, data.location,
                      data.department, data.remark1, data.vendorVarient, data.remark2,
                      data.createdBy, data.stdBuyingRate, data.stoneMaxWt, data.remark,
                      data.stoneMinWt, data.karatColor, data.deliveryDays, data.forWeb,
                      data.rowStatus, data.verifiedStatus, data.length, data.codegenSrNo,
                      data.category, data.subCategory, data.styleKarat, data.varient,
                      data.hsnSacCode, data.lineOfBusiness, 
                      JSON.stringify(bomData), 
                      bomId,
                      typeof data.operation === 'string' ? data.operation : JSON.stringify(data.operation || {}),
                      typeof data.imageDetails === 'string' ? data.imageDetails : JSON.stringify(data.imageDetails || []),
                      typeof data.formulaDetails === 'string' ? data.formulaDetails : JSON.stringify(data.formulaDetails || {}),
                      data.pieces, data.weight, data.netWeight, data.diaWeight, 
                      data.diaPieces, data.locationCode, data.itemGroup, data.metalColor,
                      data.styleMetalColor, data.variantForumalaID, id
                  ];
                  
                  await connection.promise().query(query, values);
                  
                  // Commit transaction
                  await connection.promise().commit();
                  resolve({ stockId: id, bomId: bomId });
              } catch (error) {
                  // Rollback transaction if any error occurs
                  await connection.promise().rollback();
                  console.error('Error in GRN update:', error);
                  reject(error);
              }
          });
      });
  },
  
  delete: (id) => {
      return new Promise(async (resolve, reject) => {
          try {
              // Start a transaction to ensure data consistency
              await connection.promise().beginTransaction();
              
              // Get the BOM ID before deletion
              const [goodReceipt] = await connection.promise().query(
                  "SELECT `BOM Id` FROM `Procurement Good Receipt Note` WHERE `Stock ID` = ?",
                  [id]
              );
              
              if (goodReceipt.length > 0 && goodReceipt[0]['BOM Id']) {
                  const bomId = goodReceipt[0]['BOM Id'];
                  
                  // Delete associated BOM details first
                  await connection.promise().query(
                      "DELETE FROM `BOM Details` WHERE `BOM Id` = ?",
                      [bomId]
                  );
              }
              
              // Delete the GRN record
              const [result] = await connection.promise().query(
                  "DELETE FROM `Procurement Good Receipt Note` WHERE `Stock ID` = ?",
                  [id]
              );
              
              // Commit the transaction
              await connection.promise().commit();
              
              resolve(result);
          } catch (error) {
              // Rollback in case of error
              await connection.promise().rollback();
              reject(error);
          }
      });
  }
};

export default ProcurementGoodReceiptRepository;