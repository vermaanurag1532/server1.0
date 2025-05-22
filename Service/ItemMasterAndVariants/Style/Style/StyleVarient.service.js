import repository from '../../../../Repository/ItemMasterAndVariants/Style/Style/StyleVarient.repository.js';
import connection from '../../../../db/connection.js';

const createItemMasterVariant = async (itemData) => {
  try {
    // Extract BOM, operation, and imageDetails from the input data
    const { bom, operation, imageDetails, ...itemMasterData } = itemData;
    
    // Create the style variant using the repository
    const result = await repository.createStyleVariant({
      ...itemMasterData,
      bom: bom, // Pass bom using the field name that the repository expects
      operation: operation,
      imageDetails: imageDetails
    });
    
    return { 
      variantName: result.variantName,
      bomId: result.bomId,
      operationId: result.operationId
    };
  } catch (error) {
    console.error('Error in createItemMasterVariant service:', error);
    throw new Error(`Failed to create item master variant: ${error.message}`);
  }
};

const getBomDetails = async (bomId) => {
  try {
    if (!bomId) {
      throw new Error('BOM ID is required');
    }
    
    // Use getBomDetailsByBomId from the repository
    const bomDetails = await repository.getBomDetailsByBomId(bomId);
    
    if (!bomDetails || bomDetails.length === 0) {
      return null;
    }
    
    return bomDetails;
  } catch (error) {
    console.error('Error in getBomDetails service:', error);
    throw new Error(`Failed to get BOM details: ${error.message}`);
  }
};

const getAllItemMasterVariants = async () => {
  try {
    // Use findAll from the repository
    const items = await repository.findAll();
    
    // For each item, get its BOM details if it has a BOM Id
    const itemsWithBom = await Promise.all(items.map(async item => {
      if (item['BOM Id']) {
        const bomDetails = await repository.getBomDetailsByBomId(item['BOM Id']);
        return { ...item, bomDetails };
      }
      return item;
    }));
    
    return itemsWithBom;
  } catch (error) {
    console.error('Error in getAllItemMasterVariants service:', error);
    throw error;
  }
};

const getItemMasterVariantByVariantName = async (variantName) => {
  try {
    // Use findByVariantName from the repository
    const item = await repository.findByVariantName(variantName);
    
    if (!item) return null;
    
    // BOM details should already be included by the repository method
    // but we'll double-check to ensure compatibility
    if (item['BOM Id'] && !item.bomDetails) {
      const bomDetails = await repository.getBomDetailsByBomId(item['BOM Id']);
      return { ...item, bomDetails };
    }
    
    return item;
  } catch (error) {
    console.error('Error in getItemMasterVariantByVariantName service:', error);
    throw error;
  }
};

const updateItemMasterVariant = async (variantName, itemData) => {
  try {
    // Extract BOM, operation, and imageDetails from the input data
    const { bom, operation, imageDetails, ...itemMasterData } = itemData;
    
    // Update the style variant using the repository
    const result = await repository.update(variantName, {
      ...itemMasterData,
      bom: bom, // Pass bom using the field name that the repository expects
      operation: operation,
      imageDetails: imageDetails
    });
    
    return { 
      variantName, 
      bomId: result.bomId, 
      operationId: result.operationId,
      ...itemMasterData,
      bom,
      operation,
      imageDetails 
    };
  } catch (error) {
    console.error('Error in updateItemMasterVariant service:', error);
    throw error;
  }
};

const deleteItemMasterVariant = async (variantName) => {
  try {
    // Use delete from the repository
    await repository.delete(variantName);
    return { success: true, message: `Style variant ${variantName} deleted successfully` };
  } catch (error) {
    console.error('Error in deleteItemMasterVariant service:', error);
    throw error;
  }
};

export default {
  createItemMasterVariant,
  getAllItemMasterVariants,
  getItemMasterVariantByVariantName,
  updateItemMasterVariant,
  deleteItemMasterVariant,
  getBomDetails
};