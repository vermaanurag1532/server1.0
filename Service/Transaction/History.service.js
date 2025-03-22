import TransactionHistoryRepository from '../../Repository/Transaction/History.repository.js';

const TransactionHistoryService = {
    getAllTransactions: async () => {
        return await TransactionHistoryRepository.getAll();
    },
    getTransactionById: async (transId) => {
        return await TransactionHistoryRepository.getById(transId);
    },
    createTransaction: async (transactionData) => {
        // Get the latest transaction ID and increment it
        const latestTransId = await TransactionHistoryRepository.getLatestTransId();
        const newTransId = `trans-${latestTransId + 1}`;
        
        // Add generated transId to transaction data
        transactionData.transId = newTransId;

        await TransactionHistoryRepository.create(transactionData);
        return newTransId; // Return only transId as the response
    },
    addTransaction: async (transactionData) => {
        // Get the latest transaction ID and increment it
        const latestTransId = await TransactionHistoryRepository.getLatestTransId();
        const newTransId = `trans-${latestTransId + 1}`;
        
        // Add generated transId to transaction data
        transactionData.transId = newTransId;

        await TransactionHistoryRepository.add(transactionData);
        return newTransId; // Return only transId as the response
    },
    updateTransaction: async (transId, transactionData) => {
        await TransactionHistoryRepository.update(transId, transactionData);
        return `Transaction with ID ${transId} updated successfully.`;
    },
    deleteTransaction: async (transId) => {
        await TransactionHistoryRepository.delete(transId);
        return `Transaction with ID ${transId} deleted successfully.`;
    }
};

export default TransactionHistoryService;
