import express from 'express';
import TransferDepartmentController from '../controllers/Transfer/Department.controller.js';

const TransferRouter = express.Router();

TransferRouter.post('/Department', TransferDepartmentController.addTransferRecord);
TransferRouter.get('/Department', TransferDepartmentController.getAllTransferRecords);
TransferRouter.get('/Department/:stockId', TransferDepartmentController.getTransferRecordByStockId);
TransferRouter.put('/Department/:stockId', TransferDepartmentController.updateTransferRecordByStockId);
TransferRouter.delete('/Department/:stockId', TransferDepartmentController.deleteTransferRecordByStockId);

export default TransferRouter;
