// TransferDepartment.controller.js
import TransferDepartmentService from '../../Service/Transfer/Department.service.js';

const TransferDepartmentController = {
    addTransferRecord: (req, res) => {
        TransferDepartmentService.addTransferRecord(req.body, (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            res.status(201).json({ success: true, message: 'Transfer record added successfully.', data: result });
        });
    },

    getAllTransferRecords: (req, res) => {
        TransferDepartmentService.getAllTransferRecords((err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error retrieving records.' });
            }
            res.status(200).json(result);
        });
    },

    getTransferRecordByStockId: (req, res) => {
        const stockId = req.params.stockId;
        TransferDepartmentService.getTransferRecordByStockId(stockId, (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            res.status(200).json(result);
        });
    },

    updateTransferRecordByStockId: (req, res) => {
        const stockId = req.params.stockId;
        TransferDepartmentService.updateTransferRecordByStockId(stockId, req.body, (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            res.status(200).json({ success: true, message: 'Transfer record updated successfully.', data: result });
        });
    },

    deleteTransferRecordByStockId: (req, res) => {
        const stockId = req.params.stockId;
        TransferDepartmentService.deleteTransferRecordByStockId(stockId, (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            res.status(200).json({ success: true, message: 'Transfer record deleted successfully.', data: result });
        });
    },
};

export default TransferDepartmentController;
