import connection from '../../../../db/connection.js';
import { v4 as uuidv4 } from 'uuid';
import OperationRepository from '../../../operationDetail.repository.js';
import OperationService from '../../../../Service/operationDetail.service.js';

const StyleVariantRepository = {
  // Generate a BOM ID
  generateBomId: async () => {
    try {
      const [result] = await connection.promise().query(
        'SELECT MAX(CAST(SUBSTRING_INDEX(`BOM Id`, "-", -1) AS UNSIGNED)) AS maxBomId FROM `BOM Details`'
      );
  
      const nextBomId = `BOM-${(result[0].maxBomId || 0) + 1}`;
      return nextBomId;
    } catch (error) {
      console.error('Error generating BOM ID:', error.message);
      return 'BOM-1';
    }
  },

  // Generate variant name based on business logic
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
    
    const [result] = await connection.promise().query(countQuery, countValues);
    const count = result[0].count + 1;
    
    return `${data.lineOfBusiness}-${data.category}-${data.subCategory}-${data.variety}-${data.styleKarat}-${count}`;
  },

  // Save operation data with improved logic
  saveOperationData: async (operationData, operationId = null) => {
    try {
      console.log('=== SAVE OPERATION DATA START ===');
      console.log('Input operationId:', operationId);
      console.log('Input operationData:', operationData);
      
      // If operationData is a string, parse it to an object
      let operations = operationData;
      if (typeof operationData === 'string') {
        try {
          operations = JSON.parse(operationData);
          console.log('Parsed operation data:', operations);
        } catch (e) {
          console.error('Error parsing operation data:', e);
          operations = [];
        }
      }

      // If operations is not an array, convert it to an array
      if (!Array.isArray(operations)) {
        operations = [operations];
      }

      console.log('Final operations array:', operations);

      // If no operations or empty array, return null
      if (!operations.length || operations.every(op => !op || Object.keys(op).length === 0)) {
        console.log('No valid operations found, returning null');
        return null;
      }

      // Generate operation ID if not provided
      if (!operationId) {
        const currentMax = await OperationRepository.getMaxOperationNumber();
        operationId = `Operation-${currentMax + 1}`;
        console.log('Generated new operation ID:', operationId);
      } else {
        console.log('Using provided operation ID:', operationId);
      }

      // First delete any existing operations with this ID to avoid duplicates
      console.log('Deleting existing operations with ID:', operationId);
      await OperationRepository.delete(operationId);

      // Save each operation with the same operation ID
      for (const [index, operation] of operations.entries()) {
        console.log(`Processing operation ${index + 1}:`, operation);
        
        // Create operation object with necessary fields
        const operationObj = {
          OperationId: operationId,
          VariantName: operation.VariantName || '',
          CalcBOM: operation.CalcBOM || '',
          CalcCF: parseFloat(operation.CalcCF || 0),
          CalcMethod: operation.CalcMethod || '',
          CalcMethodVal: operation.CalcMethodVal || '',
          CalcQty: parseFloat(operation.CalcQty || 0),
          CalculateFormula: operation.CalculateFormula || '',
          DepdBOM: operation.DepdBOM || null,
          DepdMethod: operation.DepdMethod || null,
          DepdMethodVal: parseFloat(operation.DepdMethodVal || 0),
          DepdQty: parseFloat(operation.DepdQty || 0),
          LabourAmount: parseFloat(operation.LabourAmount || 0),
          LabourAmountLocal: parseFloat(operation.LabourAmountLocal || 0),
          LabourRate: parseFloat(operation.LabourRate || 0),
          MaxRateValue: parseFloat(operation.MaxRateValue || 0),
          MinRateValue: parseFloat(operation.MinRateValue || 0),
          Operation: operation.Operation || '',
          OperationType: operation.OperationType || null,
          RateAsPerFormula: parseFloat(operation.RateAsPerFormula || 0),
          RowStatus: parseInt(operation.RowStatus || 1),
          Rate_Edit_Ind: parseInt(operation.Rate_Edit_Ind || 0)
        };

        console.log('Inserting operation object:', operationObj);
        
        // Insert the operation data
        const result = await OperationRepository.create(operationObj);
        console.log('Operation inserted successfully:', result);
      }

      console.log('All operations saved successfully with ID:', operationId);
      console.log('=== SAVE OPERATION DATA END ===');
      return operationId;
    } catch (error) {
      console.error('Error saving operation data:', error);
      throw error;
    }
  },

  // Test method to verify operation creation works
  testOperationCreation: async (testData = null) => {
    try {
      console.log('=== TESTING OPERATION CREATION ===');
      
      const defaultTestData = [
        {
          Operation: 'Test Operation 1',
          LabourRate: 100,
          LabourAmount: 500,
          CalcQty: 1,
          RowStatus: 1
        }
      ];
      
      const operationData = testData || defaultTestData;
      console.log('Test operation data:', operationData);
      
      // Don't pass operationId, let it generate automatically
      const result = await StyleVariantRepository.saveOperationData(operationData);
      console.log('Test result:', result);
      
      // Verify the operation was created
      const verification = await OperationService.getById(result);
      console.log('Verification result:', verification);
      
      return result;
    } catch (error) {
      console.error('Test operation creation failed:', error);
      throw error;
    }
  },

  // Get BOM details by BOM ID
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

  // Create a new style variant with improved operation handling
  createStyleVariant: async (data) => {
    return new Promise((resolve, reject) => {
      connection.beginTransaction(async (err) => {
        if (err) {
          return reject(err);
        }
        
        try {
          // DEBUG: Log all incoming data
          console.log('=== STYLE VARIANT CREATION DEBUG ===');
          console.log('Full data object:', JSON.stringify(data, null, 2));
          console.log('data.operation exists:', !!data.operation);
          console.log('data.operation type:', typeof data.operation);
          console.log('data.operation value:', data.operation);
          
          // Generate variant name
          const variantName = await StyleVariantRepository.generateVariantName(data);
          console.log('Generated variant name:', variantName);
          
          // Generate BOM ID if not provided
          const bomId = data.bomId || await StyleVariantRepository.generateBomId();
          console.log('Using BOM ID:', bomId);
          
          // Parse BOM data if it's a string
          let bomData = [];
          if (data.BOM) {
            if (typeof data.BOM === 'string') {
              try {
                bomData = JSON.parse(data.BOM);
              } catch (e) {
                console.error('Error parsing BOM data:', e);
                bomData = [];
              }
            } else if (Array.isArray(data.BOM)) {
              bomData = data.BOM;
            }
          }

          // Handle operation data BEFORE using operationId
          let operationId = null;
          
          console.log('=== OPERATION PROCESSING START ===');
          console.log('Checking operation data...');
          
          // Check all possible operation field names
          const possibleOperationFields = ['operation', 'operations', 'Operation', 'Operations'];
          let operationData = null;
          
          for (const field of possibleOperationFields) {
            if (data[field]) {
              console.log(`Found operation data in field '${field}':`, data[field]);
              operationData = data[field];
              break;
            }
          }
          
          if (operationData) {
            console.log('Processing operation data:', operationData);
            console.log('Operation data type:', typeof operationData);
            console.log('Is operation data array?', Array.isArray(operationData));
            
            // Additional validation
            let isValidOperation = false;
            if (Array.isArray(operationData) && operationData.length > 0) {
              isValidOperation = true;
            } else if (typeof operationData === 'object' && operationData !== null && Object.keys(operationData).length > 0) {
              isValidOperation = true;
            } else if (typeof operationData === 'string' && operationData.trim() !== '') {
              isValidOperation = true;
            }
            
            console.log('Is valid operation?', isValidOperation);
            
            if (isValidOperation) {
              try {
                // Save operation data without pre-generating ID - let saveOperationData handle it
                const savedOperationId = await StyleVariantRepository.saveOperationData(operationData);
                console.log('Saved operation ID:', savedOperationId);
                
                operationId = savedOperationId;
              } catch (operationError) {
                console.error('Error saving operation data:', operationError);
                // Continue without operation data
                operationId = null;
              }
            } else {
              console.log('Operation data is not valid - skipping operation creation');
            }
          } else {
            console.log('No operation data found in any expected fields');
            console.log('Available data fields:', Object.keys(data));
          }
          
          console.log('Final operationId:', operationId);
          console.log('=== OPERATION PROCESSING END ===');
          
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
              variantName,
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
          
          // Insert Style Variant record
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
                \`BOM Data\`, \`BOM Id\`, \`Operation\`, \`Operation Id\`, 
                \`Image Details\`
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const values = [
              variantName, data.style, data.oldVariant, data.customerVariant,
              data.baseVariant, data.vendor, data.remark1, data.vendorVariant, data.remark2,
              data.createdBy, data.stdBuyingRate, data.stoneMaxWt, data.remark, data.stoneMinWt,
              data.karatColor, data.deliveryDays, data.forWeb, data.rowStatus, data.verifiedStatus,
              data.length, data.codegenSrNo, data.category, data.subCategory, data.styleKarat,
              data.variety, data.hsnSacCode, data.lineOfBusiness, data.size, data.brand,
              data.ossasion, data.gender, data.sizingPossibility, data.styleColor,
              data.vendorSubProduct, data.subCluster, 
              JSON.stringify(bomData), 
              bomId,  
              typeof data.operation === 'string' ? data.operation : JSON.stringify(data.operation || {}),
              operationId,
              JSON.stringify(data.imageDetails || [])
          ];
          
          await connection.promise().query(query, values);
          
          // Commit transaction
          await connection.promise().commit();
          resolve({ variantName, bomId, operationId });
        } catch (error) {
          // Rollback transaction if any error occurs
          await connection.promise().rollback();
          console.error('Error in Style Variant insert:', error);
          reject(error);
        }
      });
    });
  },

  // Get all style variants
  findAll: async () => {
    try {
      const [rows] = await connection.promise().query(
        "SELECT * FROM `Item Master and Variant Style Style Varient`"
      );
      return rows;
    } catch (error) {
      console.error('Error fetching all style variants:', error);
      throw error;
    }
  },

  // Find a style variant by variant name with improved operation retrieval
  findByVariantName: async (variantName) => {
    try {
      const [rows] = await connection.promise().query(
        "SELECT * FROM `Item Master and Variant Style Style Varient` WHERE `Variant Name` = ?",
        [variantName]
      );
      
      if (rows.length === 0) {
        return null;
      }
      
      const variant = rows[0];
      
      // Get BOM details if BOM ID exists
      if (variant['BOM Id']) {
        const bomDetails = await StyleVariantRepository.getBomDetailsByBomId(variant['BOM Id']);
        variant.bomDetails = bomDetails;
      }
      
      // Get operation details if Operation ID exists
      if (variant['Operation Id']) {
        // Use the OperationService to get operation details
        const operationDetails = await OperationService.getById(variant['Operation Id']);
        variant.operationDetails = operationDetails;
      }
      
      return variant;
    } catch (error) {
      console.error('Error fetching style variant:', error);
      throw error;
    }
  },
  
  // Update a style variant with improved operation handling
  update: async (variantName, data) => {
    return new Promise((resolve, reject) => {
      connection.beginTransaction(async (err) => {
        if (err) {
          return reject(err);
        }
        
        try {
          console.log('=== STYLE VARIANT UPDATE DEBUG ===');
          console.log('Updating variant:', variantName);
          console.log('Update data:', JSON.stringify(data, null, 2));
          
          // Get current record to find BOM ID and Operation ID
          const [currentRecord] = await connection.promise().query(
            "SELECT `BOM Id`, `Operation Id` FROM `Item Master and Variant Style Style Varient` WHERE `Variant Name` = ?",
            [variantName]
          );
          
          if (currentRecord.length === 0) {
            throw new Error(`Style variant with name ${variantName} not found`);
          }
          
          // Use existing BOM ID or generate a new one
          const bomId = data.bomId || 
            currentRecord[0]['BOM Id'] || 
            await StyleVariantRepository.generateBomId();
          
          // Handle operations update
          let operationId = currentRecord[0]['Operation Id'];
          
          // Check for operation data in various field names
          const possibleOperationFields = ['operation', 'operations', 'Operation', 'Operations'];
          let operationData = null;
          
          for (const field of possibleOperationFields) {
            if (data[field]) {
              console.log(`Found operation data in field '${field}' for update:`, data[field]);
              operationData = data[field];
              break;
            }
          }
          
          if (operationData) {
            console.log('Updating operation data...');
            if (operationId) {
              // Update existing operations with the same ID
              operationId = await StyleVariantRepository.saveOperationData(operationData, operationId);
            } else {
              // Create new operations
              operationId = await StyleVariantRepository.saveOperationData(operationData);
            }
            console.log('Operation updated with ID:', operationId);
          }
          
          // Parse BOM data
          let bomData = [];
          if (data.BOM) {
            if (typeof data.BOM === 'string') {
              try {
                bomData = JSON.parse(data.BOM);
              } catch (e) {
                console.error('Error parsing BOM data:', e);
                bomData = [];
              }
            } else if (Array.isArray(data.BOM)) {
              bomData = data.BOM;
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
                \`Avg Weight\`, \`Amount\`, \`SpChar\`, \`Operation\`, \`Type\`, \`FormulaID\`, \`Actions\`)
                VALUES ?
              `;
              
              const bomParams = bomData.map((bom, index) => [
                bom.rowNo || index + 1,
                bomId,
                variantName,
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
          }
          
          // Update Style Variant record
          const query = `
            UPDATE \`Item Master and Variant Style Style Varient\` SET 
              \`Style\` = ?, \`Old Variant\` = ?, \`Customer Variant\` = ?, 
              \`Base Variant\` = ?, \`Vendor\` = ?, \`Remark 1\` = ?, 
              \`Vendor Variant\` = ?, \`Remark 2\` = ?, \`Created By\` = ?, 
              \`Std Buying Rate\` = ?, \`Stone Max Wt\` = ?, \`Remark\` = ?, 
              \`Stone Min Wt\` = ?, \`Karat Color\` = ?, \`Delivery Days\` = ?, 
              \`For Web\` = ?, \`Row Status\` = ?, \`Verified Status\` = ?, 
              \`Length\` = ?, \`Codegen Sr No\` = ?, \`CATEGORY\` = ?, 
              \`SUB-CATEGORY\` = ?, \`STYLE KARAT\` = ?, \`VARIETY\` = ?, 
              \`HSN - SAC CODE\` = ?, \`LINE OF BUSINESS\` = ?, \`SIZE\` = ?, 
              \`BRAND\` = ?, \`OSSASION\` = ?, \`GENDER\` = ?, 
              \`SIZING POSSIBILITY\` = ?, \`STYLE COLOR\` = ?, 
              \`VENDOR SUB PRODUCT\` = ?, \`SUB CLUSTER\` = ?, 
              \`BOM Data\` = ?, \`BOM Id\` = ?, \`Operation\` = ?, 
              \`Operation Id\` = ?, \`Image Details\` = ?, \`variables\` = ? 
            WHERE \`Variant Name\` = ?
          `;
          
          const values = [
            data.style, data.oldVariant, data.customerVariant, data.baseVariant,
            data.vendor, data.remark1, data.vendorVariant, data.remark2,
            data.createdBy, data.stdBuyingRate, data.stoneMaxWt, data.remark,
            data.stoneMinWt, data.karatColor, data.deliveryDays, data.forWeb,
            data.rowStatus, data.verifiedStatus, data.length, data.codegenSrNo,
            data.category, data.subCategory, data.styleKarat, data.variety,
            data.hsnSacCode, data.lineOfBusiness, data.size, data.brand,
            data.ossasion, data.gender, data.sizingPossibility, data.styleColor,
            data.vendorSubProduct, data.subCluster, 
            JSON.stringify(bomData), 
            bomId,
            typeof data.operation === 'string' ? data.operation : JSON.stringify(data.operation || {}),
            operationId,
            typeof data.imageDetails === 'string' ? data.imageDetails : JSON.stringify(data.imageDetails || []),
            typeof data.variables === 'string' ? data.variables : JSON.stringify(data.variables || {}),
            variantName
          ];
          
          await connection.promise().query(query, values);
          
          // Commit transaction
          await connection.promise().commit();
          console.log('=== STYLE VARIANT UPDATE COMPLETE ===');
          resolve({ variantName, bomId, operationId });
        } catch (error) {
          // Rollback transaction if any error occurs
          await connection.promise().rollback();
          console.error('Error in Style Variant update:', error);
          reject(error);
        }
      });
    });
  },
  
  // Delete a style variant with improved operation cleanup
  delete: async (variantName) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('=== STYLE VARIANT DELETE DEBUG ===');
        console.log('Deleting variant:', variantName);
        
        // Start a transaction to ensure data consistency
        await connection.promise().beginTransaction();
        
        // Get the BOM ID and Operation ID before deletion
        const [styleVariant] = await connection.promise().query(
          "SELECT `BOM Id`, `Operation Id` FROM `Item Master and Variant Style Style Varient` WHERE `Variant Name` = ?",
          [variantName]
        );
        
        if (styleVariant.length > 0) {
          // Delete associated BOM details if BOM ID exists
          if (styleVariant[0]['BOM Id']) {
            const bomId = styleVariant[0]['BOM Id'];
            console.log('Deleting BOM details for BOM ID:', bomId);
            
            await connection.promise().query(
              "DELETE FROM `BOM Details` WHERE `BOM Id` = ?",
              [bomId]
            );
          }
          
          // Delete associated operations if Operation ID exists
          if (styleVariant[0]['Operation Id']) {
            const operationId = styleVariant[0]['Operation Id'];
            console.log('Deleting operations for Operation ID:', operationId);
            
            await OperationRepository.delete(operationId);
          }
        }
        
        // Delete the Style Variant record
        const [result] = await connection.promise().query(
          "DELETE FROM `Item Master and Variant Style Style Varient` WHERE `Variant Name` = ?",
          [variantName]
        );
        
        // Commit the transaction
        await connection.promise().commit();
        console.log('=== STYLE VARIANT DELETE COMPLETE ===');
        
        resolve(result);
      } catch (error) {
        // Rollback in case of error
        await connection.promise().rollback();
        console.error('Error in Style Variant delete:', error);
        reject(error);
      }
    });
  }
};

export default StyleVariantRepository;