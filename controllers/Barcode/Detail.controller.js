// BarcodeDetail.controller.js
import BarcodeDetailService from '../../Service/Barcode/Detail.service.js';

const BarcodeDetailController = {
  // Get all Barcode Details
  getAllBarcodeDetails: async (req, res) => {
    try {
      const barcodeDetails = await BarcodeDetailService.getAllBarcodeDetails();
      res.status(200).json(barcodeDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get Barcode Detail by Stock ID
  getBarcodeDetailByStockId: async (req, res) => {
    try {
      const stockId = req.params.stockId;
      const barcodeDetail = await BarcodeDetailService.getBarcodeDetailByStockId(stockId);
      if (!barcodeDetail) {
        res.status(404).json({ message: 'Barcode Detail not found' });
      } else {
        res.status(200).json(barcodeDetail);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new Barcode Detail
  createBarcodeDetail: async (req, res) => {
    try {
      const newBarcodeDetail = await BarcodeDetailService.createBarcodeDetail(req.body);
      res.status(201).json(newBarcodeDetail);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete Barcode Detail by Stock ID
  deleteBarcodeDetailByStockId: async (req, res) => {
    try {
      const stockId = req.params.stockId;
      const result = await BarcodeDetailService.deleteBarcodeDetailByStockId(stockId);
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Barcode Detail not found' });
      } else {
        res.status(200).json({ message: 'Barcode Detail deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default BarcodeDetailController;
