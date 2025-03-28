import service from '../../../../Service/ItemMasterAndVariants/Style/Style/StyleVarient.service.js';

const createItemMasterVariant = async (req, res) => {
    try {
        const itemData = req.body;
        const result = await service.createItemMasterVariant(itemData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBomDetails = async (req, res) => {
  try {
      const { bomId } = req.params;
      
      if (!bomId) {
          return res.status(400).json({ 
              success: false,
              message: 'BOM ID is required' 
          });
      }
      
      const bomDetails = await service.getBomDetails(bomId);
      
      if (!bomDetails) {
          return res.status(404).json({ 
              success: false,
              message: 'BOM not found' 
          });
      }
      
      res.status(200).json(bomDetails);
  } catch (error) {
      res.status(500).json({ 
          success: false,
          message: error.message 
      });
  }
};

const getAllItemMasterVariants = async (req, res) => {
    try {
        const items = await service.getAllItemMasterVariants();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getItemMasterVariantByVariantName = async (req, res) => {
    try {
        const { variantName } = req.params;
        const item = await service.getItemMasterVariantByVariantName(variantName);
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateItemMasterVariant = async (req, res) => {
    try {
        const { variantName } = req.params;
        const itemData = req.body;
        
        const result = await service.updateItemMasterVariant(variantName, itemData);
        
        if (!result) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteItemMasterVariant = async (req, res) => {
    try {
        const { variantName } = req.params;
        await service.deleteItemMasterVariant(variantName);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
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