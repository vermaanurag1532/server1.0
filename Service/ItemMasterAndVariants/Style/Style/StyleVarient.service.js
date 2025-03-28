import repository from '../../../../Repository/ItemMasterAndVariants/Style/Style/StyleVarient.repository.js';
import connection from '../../../../db/connection.js';

const createItemMasterVariant = async (itemData) => {
  try {
      const { bom, operation, imageDetails, ...itemMasterData } = itemData;
      
      // Create the item and get both bomId and variantName
      const { bomId, variantName } = await repository.createItemMasterVariant(
          itemMasterData,
          bom,
          operation,
          imageDetails
      );
      
      return { 
          variantName,
          bomId
      };
  } catch (error) {
      // Enhance the error with more context
      throw new Error(`Failed to create item master variant: ${error.message}`);
  }
};

const getBomDetails = async (bomId) => {
  try {
      if (!bomId) {
          throw new Error('BOM ID is required');
      }
      
      const bomDetails = await repository.getBomDetailsById(bomId);
      
      if (!bomDetails || bomDetails.length === 0) {
          return null;
      }
      
      return bomDetails;
  } catch (error) {
      throw new Error(`Failed to get BOM details: ${error.message}`);
  }
};

const getAllItemMasterVariants = async () => {
    try {
        const items = await repository.getAllItemMasterVariants();
        
        // For each item, get its BOM details if it has a BOM ID
        const itemsWithBom = await Promise.all(items.map(async item => {
            if (item.BOM_Id) {
                const bomDetails = await repository.getBomDetailsByBomId(item.BOM_Id);
                return { ...item, bomDetails };
            }
            return item;
        }));
        
        return itemsWithBom;
    } catch (error) {
        throw error;
    }
};

const getItemMasterVariantByVariantName = async (variantName) => {
    try {
        const item = await repository.getItemMasterVariantByVariantName(variantName);
        if (!item) return null;
        
        if (item.BOM_Id) {
            const bomDetails = await repository.getBomDetailsByBomId(item.BOM_Id);
            return { ...item, bomDetails };
        }
        
        return item;
    } catch (error) {
        throw error;
    }
};

const updateItemMasterVariant = async (variantName, itemData) => {
    let transactionConn;
    try {
        transactionConn = await connection.getConnection();
        await transactionConn.beginTransaction();
        
        const { bom, operation, imageDetails, ...itemMasterData } = itemData;
        
        const bomId = await repository.updateItemMasterVariant(
            variantName,
            itemMasterData,
            bom,
            operation,
            imageDetails,
            transactionConn
        );
        
        await transactionConn.commit();
        
        return { ...itemMasterData, bomId, bom, operation, imageDetails };
    } catch (error) {
        if (transactionConn) {
            await transactionConn.rollback();
        }
        throw error;
    } finally {
        if (transactionConn) {
            transactionConn.release();
        }
    }
};

const deleteItemMasterVariant = async (variantName) => {
    let transactionConn;
    try {
        transactionConn = await connection.getConnection();
        await transactionConn.beginTransaction();
        
        await repository.deleteItemMasterVariant(variantName, transactionConn);
        
        await transactionConn.commit();
    } catch (error) {
        if (transactionConn) {
            await transactionConn.rollback();
        }
        throw error;
    } finally {
        if (transactionConn) {
            transactionConn.release();
        }
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