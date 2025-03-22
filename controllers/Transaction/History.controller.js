import TransactionHistoryService from '../../Service/Transaction/History.service.js';

const TransactionHistoryController = {
    getAllTransactions: async (req, res) => {
        try {
            const transactions = await TransactionHistoryService.getAllTransactions();
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching transactions', error });
        }
    },
    getTransactionById: async (req, res) => {
        const { transId } = req.params;
        try {
            const transaction = await TransactionHistoryService.getTransactionById(transId);
            if (!transaction.length) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching transaction', error });
        }
    },
    createTransaction: async (req, res) => {
        const transactionData = req.body;
        try {
            const transId = await TransactionHistoryService.createTransaction(transactionData);
            res.status(201).json({ transId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating transaction', error });
        }
    },
    addTransaction: async (req, res) => {
        const transactionData = req.body;
        try {
            const transId = await TransactionHistoryService.addTransaction(transactionData);
            res.status(201).json({ transId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating transaction', error });
        }
    },
    updateTransaction: async (req, res) => {
        const { transId } = req.params;
        const transactionData = req.body;
        try {
            const message = await TransactionHistoryService.updateTransaction(transId, transactionData);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: 'Error updating transaction', error });
        }
    },
    deleteTransaction: async (req, res) => {
        const { transId } = req.params;
        try {
            const message = await TransactionHistoryService.deleteTransaction(transId);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting transaction', error });
        }
    }
};

export default TransactionHistoryController;
