import express from 'express';
import TransferDepartmentController from '../controllers/Transfer/Department.controller.js';
import TransferLocationController from '../controllers/Transfer/Location.controller.js';

const TransferRouter = express.Router();

TransferRouter.post('/Department', TransferDepartmentController.addTransferRecord);
TransferRouter.get('/Department', TransferDepartmentController.getAllTransferRecords);
TransferRouter.get('/Department/:stockId', TransferDepartmentController.getTransferRecordByStockId);
TransferRouter.put('/Department/:stockId', TransferDepartmentController.updateTransferRecordByStockId);
TransferRouter.delete('/Department/:stockId', TransferDepartmentController.deleteTransferRecordByStockId);

TransferRouter.post('/Location', TransferLocationController.addTransferLocation);
TransferRouter.get('/Location', TransferLocationController.getAllTransferLocations);
TransferRouter.get('/Location/:stockId', TransferLocationController.getTransferLocationByStockId);
TransferRouter.put('/Location/:stockId', TransferLocationController.updateTransferLocation);
TransferRouter.delete('/Location/:stockId', TransferLocationController.deleteTransferLocation);

export default TransferRouter;
