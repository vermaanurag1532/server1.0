import ProcurementGoodReceiptService from "../../../Service/Procurement/GoodReceiptNote/GoodReceiptNote.service.js";
import { generateAndDownloadExcel } from '../../../utils/excelUtils.js';

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

  downloadExcel: async (req, res) => {
    try {
      // Fetch GRN data from the service
      const data = await ProcurementGoodReceiptService.getAll();
  
      // Log the data to verify its structure
      console.log('Fetched Data:', data);
  
      // Define columns for the Excel sheet
      const columns = [
        { header: 'Stock ID', key: 'Stock ID', width: 20 },
        { header: 'Style', key: 'Style', width: 20 },
        { header: 'Varient Name', key: 'Varient Name', width: 20 },
        { header: 'Old Varient', key: 'Old Varient', width: 20 },
        { header: 'Customer Varient', key: 'Customer Varient', width: 20 },
        { header: 'Base Varient', key: 'Base Varient', width: 20 },
        { header: 'Vendor Code', key: 'Vendor Code', width: 20 },
        { header: 'Vendor', key: 'Vendor', width: 20 },
        { header: 'Location', key: 'Location', width: 20 },
        { header: 'Department', key: 'Department', width: 20 },
        { header: 'Remark 1', key: 'Remark 1', width: 20 },
        { header: 'Vendor Varient', key: 'Vendor Varient', width: 20 },
        { header: 'Remark 2', key: 'Remark 2', width: 20 },
        { header: 'Created By', key: 'Created By', width: 20 },
        { header: 'Std Buying Rate', key: 'Std Buying Rate', width: 20 },
        { header: 'Stone Max Wt', key: 'Stone Max Wt', width: 20 },
        { header: 'Remark', key: 'Remark', width: 20 },
        { header: 'Stone Min Wt', key: 'Stone Min Wt', width: 20 },
        { header: 'Karat Color', key: 'Karat Color', width: 20 },
        { header: 'Delivery Days', key: 'Delivery Days', width: 20 },
        { header: 'For Web', key: 'For Web', width: 20 },
        { header: 'Row Status', key: 'Row Status', width: 20 },
        { header: 'Verified Status', key: 'Verified Status', width: 20 },
        { header: 'Length', key: 'Length', width: 20 },
        { header: 'Codegen Sr No', key: 'Codegen Sr No', width: 20 },
        { header: 'CATEGORY', key: 'CATEGORY', width: 20 },
        { header: 'Sub-Category', key: 'Sub-Category', width: 20 },
        { header: 'STYLE KARAT', key: 'STYLE KARAT', width: 20 },
        { header: 'Varient', key: 'Varient', width: 20 },
        { header: 'HSN - SAC CODE', key: 'HSN - SAC CODE', width: 20 },
        { header: 'LINE OF BUSINESS', key: 'LINE OF BUSINESS', width: 20 },
        { header: 'BOM', key: 'BOM', width: 20 },
        { header: 'Operation', key: 'Operation', width: 20 },
        { header: 'Image Details', key: 'Image Details', width: 20 },
        { header: 'Formula Details', key: 'Formula Details', width: 20 },
        { header: 'Pieces', key: 'Pieces', width: 20 },
        { header: 'Weight', key: 'Weight', width: 20 },
        { header: 'Net Weight', key: 'Net Weight', width: 20 },
        { header: 'Dia Weight', key: 'Dia Weight', width: 20 },
        { header: 'Dia Pieces', key: 'Dia Pieces', width: 20 },
        { header: 'Location Code', key: 'Location Code', width: 20 },
        { header: 'Item Group', key: 'Item Group', width: 20 },
        { header: 'Metal Color', key: 'Metal Color', width: 20 },
        { header: 'Style Metal Color', key: 'Style Metal Color', width: 20 },
        { header: 'Inward Doc', key: 'Inward Doc', width: 20 },
        { header: 'Last Trans', key: 'Last Trans', width: 20 },
        { header: 'isRawMaterial', key: 'isRawMaterial', width: 20 },
        { header: 'Variant type', key: 'Variant type', width: 20 }
      ];
  
      // Use the imported function to generate and download the Excel file
      await generateAndDownloadExcel(res, 'GRNData', columns, data, 'GRNData.xlsx');
    } catch (err) {
      console.error('Error generating Excel file:', err.stack);
      res.status(500).json({ message: 'File generation error' });
    }
  }
};

export default ProcurementGoodReceiptController;
