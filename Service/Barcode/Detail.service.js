// BarcodeDetail.service.js
import BarcodeDetailRepository from '../../Repository/Barcode/Detail.reposiory.js';

const BarcodeDetailService = {
  // Fetch all Barcode Details
  getAllBarcodeDetails: async () => {
    try {
      return await BarcodeDetailRepository.getAll();
    } catch (error) {
      throw new Error(`Failed to fetch Barcode Details: ${error.message}`);
    }
  },

  // Fetch a Barcode Detail by Stock ID
  getBarcodeDetailByStockId: async (stockId) => {
    try {
      return await BarcodeDetailRepository.getByStockId(stockId);
    } catch (error) {
      throw new Error(`Failed to fetch Barcode Detail: ${error.message}`);
    }
  },

  // Add a new Barcode Detail
  createBarcodeDetail: async (barcodeDetail) => {
    try {
      return await BarcodeDetailRepository.create(barcodeDetail);
    } catch (error) {
      throw new Error(`Failed to create Barcode Detail: ${error.message}`);
    }
  },

  // Delete a Barcode Detail by Stock ID
  deleteBarcodeDetailByStockId: async (stockId) => {
    try {
      return await BarcodeDetailRepository.deleteByStockId(stockId);
    } catch (error) {
      throw new Error(`Failed to delete Barcode Detail: ${error.message}`);
    }
  },
};

export default BarcodeDetailService;
