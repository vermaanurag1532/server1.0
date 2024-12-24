import ProcurementGoodReceiptService from "../../../Service/Procurement/GoodReceiptNote/GoodReceiptNote.service.js";

const ProcurementGoodReceiptController = {
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
  }
};

export default ProcurementGoodReceiptController;
