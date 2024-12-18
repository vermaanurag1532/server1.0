import DiamondVariantService from "../../../../Service/ItemMasterAndVariants/Stone/Diamond/DiamondVariant.service.js";

const DiamondVariantController = {
  create: async (req, res) => {
    try {
      const result = await DiamondVariantService.create(req.body);
      res.status(201).json( result );
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await DiamondVariantService.getAll();
      res.status(200).json( result );
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const result = await DiamondVariantService.getById(req.params.id);
      res.status(200).json( result );
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const result = await DiamondVariantService.update(req.params.id, req.body);
      res.status(200).json( result );
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const result = await DiamondVariantService.delete(req.params.id);
      res.status(200).json( result );
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

export default DiamondVariantController;
