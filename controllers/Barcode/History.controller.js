import BarcodeHistoryService from "../../Service/Barcode/History.service.js";

const BarcodeHistoryController = {
  createBarcodeHistory: async (req, res) => {
    try {
      const data = req.body;
      const result = await BarcodeHistoryService.createBarcodeHistory(data);
      res.status(201).json({
        message: "Barcode history created successfully",
        result,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllBarcodeHistories: async (req, res) => {
    try {
      const result = await BarcodeHistoryService.getAllBarcodeHistories();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBarcodeHistoryByStockId: async (req, res) => {
    try {
      const { stockId } = req.params;
      const result = await BarcodeHistoryService.getBarcodeHistoryByStockId(stockId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBarcodeHistoryByStockId: async (req, res) => {
    try {
      const { stockId } = req.params;
      const result = await BarcodeHistoryService.deleteBarcodeHistoryByStockId(stockId);
      res.status(200).json({
        message: "Barcode history deleted successfully",
        result,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default BarcodeHistoryController;
