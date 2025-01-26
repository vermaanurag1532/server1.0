import BarcodeHistoryRepository from "../../Repository/Barcode/History.repository.js";

const BarcodeHistoryService = {
  createBarcodeHistory: async (data) => {
    try {
      return await BarcodeHistoryRepository.insert(data);
    } catch (error) {
      throw new Error("Error creating barcode history: " + error.message);
    }
  },

  getAllBarcodeHistories: async () => {
    try {
      return await BarcodeHistoryRepository.findAll();
    } catch (error) {
      throw new Error("Error retrieving barcode histories: " + error.message);
    }
  },

  getBarcodeHistoryByStockId: async (stockId) => {
    try {
      return await BarcodeHistoryRepository.findByStockId(stockId);
    } catch (error) {
      throw new Error("Error retrieving barcode history by Stock ID: " + error.message);
    }
  },

  deleteBarcodeHistoryByStockId: async (stockId) => {
    try {
      return await BarcodeHistoryRepository.deleteByStockId(stockId);
    } catch (error) {
      throw new Error("Error deleting barcode history by Stock ID: " + error.message);
    }
  },
};

export default BarcodeHistoryService;
