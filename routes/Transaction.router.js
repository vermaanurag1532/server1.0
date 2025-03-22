import express from 'express';
import TransactionHistoryController from '../controllers/Transaction/History.controller.js';

const TransactionRouter = express.Router();

TransactionRouter.get('/History', TransactionHistoryController.getAllTransactions);
TransactionRouter.get('/History/:transId', TransactionHistoryController.getTransactionById);
TransactionRouter.post('/History', TransactionHistoryController.createTransaction);
TransactionRouter.post('/History/GRN', TransactionHistoryController.addTransaction);
TransactionRouter.put('/History/:transId', TransactionHistoryController.updateTransaction);
TransactionRouter.delete('/History/:transId', TransactionHistoryController.deleteTransaction);

export default TransactionRouter;
