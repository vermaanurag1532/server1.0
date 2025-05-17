import connection from '../../../../db/connection.js';
import { v4 as uuidv4 } from 'uuid';
import OperationRepository from '../../../operationDetail.repository.js';
import OperationService from '../../../../Service/operationDetail.service.js';

const generateBomId = async () => {
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
};

const generateVariantName = async (data) => {
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
};

const getBomDetailsById = async (bomId) => {
  try {
      const [rows] = await connection.promise().query(
          'SELECT * FROM `BOM Details` WHERE `BOM Id` = ? ORDER BY `Row No`',
          [bomId]
      );
      return rows;
  } catch (error) {
      throw new Error(`Error fetching BOM details: ${error.message}`);
  }
};

// Function to create operations in Operations table
const createOperationsForVariant = async (operations, variantName) => {
  if (!operations || !Array.isArray(operations) || operations.length === 0) {
    return null;
  }

  try {
    // Create operations with the same OperationId
    // Don't modify the operations data - use it as is
    const result = await OperationService.create(operations);
    
    return result.OperationId;
  } catch (error) {
    console.error('Error creating operations:', error);
    throw new Error(`Failed to create operations: ${error.message}`);
  }
};

// Function to update operations in Operations table
const updateOperationsForVariant = async (operationId, operations, variantName) => {
  if (!operations || !Array.isArray(operations) || operations.length === 0) {
    return operationId;
  }

  try {
    if (operationId) {
      // Update existing operations without modifying the operations data
      await OperationService.update(operationId, operations);
      return operationId;
    } else {
      // Create new operations
      const result = await createOperationsForVariant(operations, variantName);
      return result;
    }
  } catch (error) {
    console.error('Error updating operations:', error);
    throw new Error(`Failed to update operations: ${error.message}`);
  }
};

const createItemMasterVariant = async (itemData, bomData, operations, imageDetails) => {
  const variantName = await generateVariantName(itemData);
  const bomId = await generateBomId();

  // Create operations in Operations table and get the OperationId
  const operationId = await createOperationsForVariant(operations, variantName);
  
  // Store the JSON representation of operations for reference
  const operationsJson = JSON.stringify(operations || []);
  
  // Properly escape JSON data
  const bomDataJson = JSON.stringify(bomData || []);
  const imageDetailsJson = JSON.stringify(imageDetails || []);

  const itemQuery = `
    INSERT INTO \`Item Master and Variant Style Style Varient\` 
    SET
      \`Variant Name\` = ?,
      \`Style\` = ?,
      \`Old Variant\` = ?,
      \`Customer Variant\` = ?,
      \`Base Variant\` = ?,
      \`Vendor\` = ?,
      \`Remark 1\` = ?,
      \`Vendor Variant\` = ?,
      \`Remark 2\` = ?,
      \`Created By\` = ?,
      \`Std Buying Rate\` = ?,
      \`Stone Max Wt\` = ?,
      \`Remark\` = ?,
      \`Stone Min Wt\` = ?,
      \`Karat Color\` = ?,
      \`Delivery Days\` = ?,
      \`For Web\` = ?,
      \`Row Status\` = ?,
      \`Verified Status\` = ?,
      \`Length\` = ?,
      \`Codegen Sr No\` = ?,
      \`CATEGORY\` = ?,
      \`SUB-CATEGORY\` = ?,
      \`STYLE KARAT\` = ?,
      \`VARIETY\` = ?,
      \`HSN - SAC CODE\` = ?,
      \`LINE OF BUSINESS\` = ?,
      \`SIZE\` = ?,
      \`BRAND\` = ?,
      \`OSSASION\` = ?,
      \`GENDER\` = ?,
      \`SIZING POSSIBILITY\` = ?,
      \`STYLE COLOR\` = ?,
      \`VENDOR SUB PRODUCT\` = ?,
      \`SUB CLUSTER\` = ?,
      \`BOM Data\` = ?,
      \`BOM Id\` = ?,
      \`Operation\` = ?,
      \`Operation Id\` = ?,
      \`Image Details\` = ?
  `;
  
  const [result] = await connection.promise().query(itemQuery, [
    variantName,
    itemData.style,
    itemData.oldVariant,
    itemData.customerVariant,
    itemData.baseVariant,
    itemData.vendor,
    itemData.remark1,
    itemData.vendorVariant,
    itemData.remark2,
    itemData.createdBy,
    itemData.stdBuyingRate,
    itemData.stoneMaxWt,
    itemData.remark,
    itemData.stoneMinWt,
    itemData.karatColor,
    itemData.deliveryDays,
    itemData.forWeb,
    itemData.rowStatus,
    itemData.verifiedStatus,
    itemData.length,
    itemData.codegenSrNo,
    itemData.category,
    itemData.subCategory,
    itemData.styleKarat,
    itemData.variety,
    itemData.hsnSacCode,
    itemData.lineOfBusiness,
    itemData.size,
    itemData.brand,
    itemData.ossasion,
    itemData.gender,
    itemData.sizingPossibility,
    itemData.styleColor,
    itemData.vendorSubProduct,
    itemData.subCluster,
    bomDataJson,
    bomId,
    operationsJson,
    operationId,  // Store the operationId reference
    imageDetailsJson
  ]);

  if (bomData?.length) {
    const bomQuery = `
      INSERT INTO \`BOM Details\` 
      (\`Row No\`, \`BOM Id\`, \`Variant Name\`, \`Item Group\`, \`Pieces\`, \`Weight\`, \`Rate\`, 
       \`Avg Weight\`, \`Amount\`, \`SpChar\`, \`Operation\`, \`Type\`, \`Actions\`)
      VALUES ?
    `;
    
    const bomParams = bomData.map(bom => [
      bom.rowNo,
      bomId,
      bom.variantName,
      bom.itemGroup,
      bom.pieces,
      bom.weight,
      bom.rate,
      bom.avgWeight,
      bom.amount,
      bom.spChar,
      bom.operation,
      bom.type,
      JSON.stringify(bom.actions || [])
    ]);

    await connection.promise().query(bomQuery, [bomParams]);
  }

  return { variantName, bomId, operationId };
};

const getAllItemMasterVariants = async () => {
    const query = `SELECT * FROM \`Item Master and Variant Style Style Varient\``;
    const [rows] = await connection.promise().query(query);
    return rows;
};

const getItemMasterVariantByVariantName = async (variantName) => {
    const query = `SELECT * FROM \`Item Master and Variant Style Style Varient\` WHERE \`Variant Name\` = ?`;
    const [rows] = await connection.promise().query(query, [variantName]);
    return rows[0] || null;
};

const getBomDetailsByBomId = async (bomId) => {
    const query = `SELECT * FROM \`BOM Details\` WHERE \`BOM Id\` = ?`;
    const [rows] = await connection.promise().query(query, [bomId]);
    return rows;
};

const updateItemMasterVariant = async (variantName, itemData, bomData, operations, imageDetails, transactionConn) => {
    // Get the existing variant to retrieve the current OperationId
    const [existingItemResult] = await transactionConn.promise().query(
        'SELECT \`BOM Id\`, \`OperationId\` FROM \`Item Master and Variant Style Style Varient\` WHERE \`Variant Name\` = ?',
        [variantName]
    );
    
    if (!existingItemResult.length) {
        throw new Error(`Variant ${variantName} not found`);
    }
    
    const existingItem = existingItemResult[0];
    const bomId = existingItem['BOM Id'];
    const existingOperationId = existingItem.OperationId;
    
    // Update operations in Operations table
    const operationId = await updateOperationsForVariant(existingOperationId, operations, variantName);
    
    // First update the main item
    const updateQuery = `
        UPDATE \`Item Master and Variant Style Style Varient\`
        SET 
            \`Style\` = ?, 
            \`Old Variant\` = ?, 
            \`Customer Variant\` = ?, 
            \`Base Variant\` = ?, 
            \`Vendor\` = ?, 
            \`Remark 1\` = ?, 
            \`Vendor Variant\` = ?, 
            \`Remark 2\` = ?, 
            \`Created By\` = ?, 
            \`Std Buying Rate\` = ?, 
            \`Stone Max Wt\` = ?, 
            \`Remark\` = ?, 
            \`Stone Min Wt\` = ?, 
            \`Karat Color\` = ?, 
            \`Delivery Days\` = ?, 
            \`For Web\` = ?, 
            \`Row Status\` = ?, 
            \`Verified Status\` = ?, 
            \`Length\` = ?, 
            \`Codegen Sr No\` = ?, 
            \`CATEGORY\` = ?, 
            \`SUB-CATEGORY\` = ?, 
            \`STYLE KARAT\` = ?, 
            \`VARIETY\` = ?, 
            \`HSN - SAC CODE\` = ?, 
            \`LINE OF BUSINESS\` = ?, 
            \`SIZE\` = ?, 
            \`BRAND\` = ?, 
            \`OSSASION\` = ?, 
            \`GENDER\` = ?, 
            \`SIZING POSSIBILITY\` = ?, 
            \`STYLE COLOR\` = ?, 
            \`VENDOR SUB PRODUCT\` = ?, 
            \`SUB CLUSTER\` = ?, 
            \`BOM Data\` = ?, 
            \`Operation\` = ?, 
            \`OperationId\` = ?, 
            \`Image Details\` = ?
        WHERE \`Variant Name\` = ?
    `;
    
    const updateParams = [
        itemData.style || null,
        itemData.oldVariant || null,
        itemData.customerVariant || null,
        itemData.baseVariant || null,
        itemData.vendor || null,
        itemData.remark1 || null,
        itemData.vendorVariant || null,
        itemData.remark2 || null,
        itemData.createdBy || null,
        itemData.stdBuyingRate || null,
        itemData.stoneMaxWt || null,
        itemData.remark || null,
        itemData.stoneMinWt || null,
        itemData.karatColor || null,
        itemData.deliveryDays || null,
        itemData.forWeb || null,
        itemData.rowStatus || null,
        itemData.verifiedStatus || null,
        itemData.length || null,
        itemData.codegenSrNo || null,
        itemData.category || null,
        itemData.subCategory || null,
        itemData.styleKarat || null,
        itemData.variety || null,
        itemData.hsnSacCode || null,
        itemData.lineOfBusiness || null,
        itemData.size || null,
        itemData.brand || null,
        itemData.ossasion || null,
        itemData.gender || null,
        itemData.sizingPossibility || null,
        itemData.styleColor || null,
        itemData.vendorSubProduct || null,
        itemData.subCluster || null,
        JSON.stringify(bomData) || null,
        JSON.stringify(operations) || null,
        operationId, // Update with new or existing operationId
        JSON.stringify(imageDetails) || null,
        variantName
    ];

    await transactionConn.promise().query(updateQuery, updateParams);

    // Delete existing BOM details
    await transactionConn.promise().query('DELETE FROM \`BOM Details\` WHERE \`BOM Id\` = ?', [bomId]);

    // Insert new BOM details if provided
    if (bomData && bomData.length > 0) {
        const bomQuery = `
            INSERT INTO \`BOM Details\` 
            (\`Row No\`, \`BOM Id\`, \`Variant Name\`, \`Item Group\`, \`Pieces\`, \`Weight\`, \`Rate\`, 
             \`Avg Weight\`, \`Amount\`, \`SpChar\`, \`Operation\`, \`Type\`, \`Actions\`)
            VALUES ?
        `;
        
        const bomParams = bomData.map(bom => [
            bom.rowNo || null,
            bomId,
            bom.variantName || null,
            bom.itemGroup || null,
            bom.pieces || null,
            bom.weight || null,
            bom.rate || null,
            bom.avgWeight || null,
            bom.amount || null,
            bom.spChar || null,
            bom.operation || null,
            bom.type || null,
            JSON.stringify(bom.actions) || null
        ]);

        await transactionConn.promise().query(bomQuery, [bomParams]);
    }

    return { bomId, operationId };
};

const deleteItemMasterVariant = async (variantName, transactionConn) => {
    // First get the BOM ID and OperationId to delete related records
    const [existingItem] = await transactionConn.promise().query(
        'SELECT \`BOM Id\`, \`OperationId\` FROM \`Item Master and Variant Style Style Varient\` WHERE \`Variant Name\` = ?',
        [variantName]
    );
    
    if (existingItem.length > 0) {
        const bomId = existingItem[0]['BOM Id'];
        const operationId = existingItem[0].OperationId;
        
        // Delete BOM details
        await transactionConn.promise().query('DELETE FROM \`BOM Details\` WHERE \`BOM Id\` = ?', [bomId]);
        
        // Delete Operations if they exist
        if (operationId) {
            await OperationService.delete(operationId);
        }
    }
    
    // Then delete the main item
    const deleteQuery = 'DELETE FROM \`Item Master and Variant Style Style Varient\` WHERE \`Variant Name\` = ?';
    await transactionConn.promise().query(deleteQuery, [variantName]);
};

export default {
    createItemMasterVariant,
    getAllItemMasterVariants,
    getItemMasterVariantByVariantName,
    getBomDetailsByBomId,
    updateItemMasterVariant,
    deleteItemMasterVariant,
    getBomDetailsById
};