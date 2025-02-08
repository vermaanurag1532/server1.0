import ProcurementGoodReceiptService from "../../../Service/Procurement/RawMaterial/RawMaterial.service.js";

const RawMaterialController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const response = await ProcurementGoodReceiptService.create(data);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const results = await ProcurementGoodReceiptService.getAll();
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await ProcurementGoodReceiptService.getById(id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await ProcurementGoodReceiptService.update(id, data);
      res.status(200).json({ message: "Record updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      await ProcurementGoodReceiptService.delete(id);
      res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default RawMaterialController;
