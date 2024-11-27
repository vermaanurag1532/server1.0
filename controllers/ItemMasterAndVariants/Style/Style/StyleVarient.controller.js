import ItemMasterVariantService from "../../../../Service/ItemMasterAndVariants/Style/Style/StyleVarient.service.js";

const StyleVariantController = {
  createItemVariant: async (req, res) => {
    try {
      const result = await ItemMasterVariantService.createItemVariant(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getAllItemVariants: async (req, res) => {
    try {
      const result = await ItemMasterVariantService.getAllItemVariants();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default StyleVariantController;
