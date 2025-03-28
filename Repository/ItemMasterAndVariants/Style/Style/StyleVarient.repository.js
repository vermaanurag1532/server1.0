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
    
    const processBOMData = (bom) => {
      if (!bom || !bom.data) return bom;
      
      const processedBom = {...bom};
      processedBom.data = bom.data.map(item => {
        const processedItem = {...item};
        
        // Numeric fields to convert
        const numericFields = [
          'rate', 
          'rowNo', 
          'amount', 
          'pieces', 
          'weight', 
          'avgWeight'
        ];
        
        numericFields.forEach(field => {
          // Explicit conversion strategy
          if (item[field] !== undefined && item[field] !== null) {
            // Convert to float, with special handling
            let numValue;
            if (typeof item[field] === 'number') {
              // If already a number, use Number() to ensure float
              numValue = Number(item[field].toFixed(1));
            } else {
              // Parse string to float
              numValue = parseFloat(item[field]);
            }
            
            // Ensure it's a valid number, default to 0.0 if not
            processedItem[field] = isNaN(numValue) ? 0.0 : numValue;
            
            // Force decimal representation
            processedItem[field] = processedItem[field] === parseInt(processedItem[field]) 
              ? processedItem[field].toFixed(1) 
              : processedItem[field];
          } else {
            processedItem[field] = 0.0;
          }
        });
        
        return processedItem;
      });
      
      return processedBom;
    };
    
    const processNumericValue = (value) => {
      // Comprehensive numeric conversion
      if (value === undefined || value === null) return 0.0;
      
      const numValue = parseFloat(value);
      
      // If it's a whole number, force decimal
      return isNaN(numValue) 
        ? 0.0 
        : (Number.isInteger(numValue) ? numValue.toFixed(1) : numValue);
    };

    // Process Operation data to ensure numeric values
    const processOperationData = (operation) => {
      if (!operation) return operation;
      
      const processedOperation = {...operation};
      const numericFields = [
        'CalcCF', 'BomOperationLinkInd', 'CalcQty', 'DepdQty', 'RowStatus', 
        'LabourRate', 'RateEditInd', 'LabourAmount', 'MaxRateValue', 
        'MinRateValue', 'MaxRateRangeId', 'CalculateFormula', 'RateAsPerFormula'
      ];
      
      numericFields.forEach(field => {
        processedOperation[field] = processNumericValue(operation[field]);
      });
      
      return processedOperation;
    };
    
    // Updated values array (38 values)
    const values = [
      variantName, 
      data.style,
      data.oldVariant || '',
      data.customerVariant || '',
      data.baseVariant || '',
      data.vendor || '',
      data.remark1 || '',
      data.vendorVariant || '',
      data.remark2 || '',
      data.createdBy || '',
      processNumericValue(data.stdBuyingRate), // Convert to number
      processNumericValue(data.stoneMaxWt), // Convert to number
      data.remark || '',
      processNumericValue(data.stoneMinWt), // Convert to number
      data.karatColor || '',
      processNumericValue(data.deliveryDays), // Convert to number
      data.forWeb || '',
      data.rowStatus || 'Active',
      data.verifiedStatus || '',
      processNumericValue(data.length), // Convert to number
      data.codegenSrNo || '',
      data.category || '',
      data.subCategory || '',
      data.styleKarat || '',
      data.variety || '',
      data.hsnSacCode || '',
      data.lineOfBusiness || '',
      data.size || '',
      data.brand || '',
      data.ossasion || '',
      data.gender || '',
      data.sizingPossibility || '',
      data.styleColor || '',
      data.vendorSubProduct || '',
      data.subCluster || '',
      JSON.stringify(processBOMData(data.bom)), // Process BOM data
      JSON.stringify(processOperationData(data.operation)), // Process Operation data
      JSON.stringify(data.imageDetails || []) // Ensure array
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