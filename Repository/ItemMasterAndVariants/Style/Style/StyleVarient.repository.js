import connection from '../../../../db/connection.js';
import { v4 as uuidv4 } from 'uuid';

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


const createItemMasterVariant = async (itemData, bomData, operation, imageDetails) => {
  const variantName = await generateVariantName(itemData);
  const bomId = await generateBomId();

  // Properly escape JSON data
  const bomDataJson = JSON.stringify(bomData || []);
  const operationJson = JSON.stringify(operation || {});
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
    operationJson,
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

  return { variantName, bomId };
};
const getAllItemMasterVariants = async () => {
    const query = `SELECT * FROM \`Item Master and Variant Style Style Varient\``;
    const [rows] = await connection.promise().query(query);
    return rows;
};

const getItemMasterVariantByVariantName = async (variantName) => {
    const query = `SELECT * FROM \`Item Master and Variant Style Style Varient\` WHERE Variant_Name = ?`;
    const [rows] = await connection.query(query, [variantName]);
    return rows[0] || null;
};

const getBomDetailsByBomId = async (bomId) => {
    const query = `SELECT * FROM \`BOM Details\` WHERE BOM_Id = ?`;
    const [rows] = await connection.promise().query(query, [bomId]);
    return rows;
};

const updateItemMasterVariant = async (variantName, itemData, bomData, operation, imageDetails, transactionConn) => {
    // First update the main item
    const updateQuery = `
        UPDATE \`Item Master and Variant Style Style Varient\`
        SET Style = ?, Old_Variant = ?, Customer_Variant = ?, Base_Variant = ?, Vendor = ?, 
            Remark_1 = ?, Vendor_Variant = ?, Remark_2 = ?, Created_By = ?, Std_Buying_Rate = ?, 
            Stone_Max_Wt = ?, Remark = ?, Stone_Min_Wt = ?, Karat_Color = ?, Delivery_Days = ?, 
            For_Web = ?, Row_Status = ?, Verified_Status = ?, Length = ?, Codegen_Sr_No = ?, 
            CATEGORY = ?, SUB-CATEGORY = ?, STYLE_KARAT = ?, VARIETY = ?, HSN - SAC_CODE = ?, 
            LINE_OF_BUSINESS = ?, SIZE = ?, BRAND = ?, OSSASION = ?, GENDER = ?, 
            SIZING_POSSIBILITY = ?, STYLE_COLOR = ?, VENDOR_SUB_PRODUCT = ?, SUB_CLUSTER = ?, 
            BOM_Data = ?, Operation = ?, Image_Details = ?
        WHERE Variant_Name = ?
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
        JSON.stringify(operation) || null,
        JSON.stringify(imageDetails) || null,
        variantName
    ];

    await transactionConn.promise().query(updateQuery, updateParams);

    // Get the existing BOM ID
    const [existingItem] = await transactionConn.query(
        'SELECT BOM_Id FROM `Item Master and Variant Style Style Varient` WHERE Variant_Name = ?',
        [variantName]
    );
    const bomId = existingItem[0].BOM_Id;

    // Delete existing BOM details
    await transactionConn.promise().query('DELETE FROM `BOM Details` WHERE BOM_Id = ?', [bomId]);

    // Insert new BOM details if provided
    if (bomData && bomData.length > 0) {
        const bomQuery = `
            INSERT INTO \`BOM Details\` 
            (Row_No, BOM_Id, Variant_Name, Item_Group, Pieces, Weight, Rate, Avg_Weight, 
             Amount, SpChar, Operation, Type, Actions)
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

    return bomId;
};

const deleteItemMasterVariant = async (variantName, transactionConn) => {
    // First get the BOM ID to delete related BOM details
    const [existingItem] = await transactionConn.query(
        'SELECT BOM_Id FROM `Item Master and Variant Style Style Varient` WHERE Variant_Name = ?',
        [variantName]
    );
    
    if (existingItem.length > 0) {
        const bomId = existingItem[0].BOM_Id;
        // Delete BOM details first
        await transactionConn.promise().query('DELETE FROM `BOM Details` WHERE BOM_Id = ?', [bomId]);
    }
    
    // Then delete the main item
    const deleteQuery = 'DELETE FROM `Item Master and Variant Style Style Varient` WHERE Variant_Name = ?';
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