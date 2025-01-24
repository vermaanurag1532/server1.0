import TransferLocationRepository from '../../Repository/Transfer/Location.repository.js';

const TransferLocationService = {
    addTransferLocation: async (transferLocationData) => {
        try {
            const result = await TransferLocationRepository.addTransferLocation(transferLocationData);
            return { success: true, message: 'Transfer location added successfully', data: result };
        } catch (error) {
            return { success: false, message: 'Error adding transfer location', error: error.message };
        }
    },

    getAllTransferLocations: async () => {
        try {
            const results = await TransferLocationRepository.getAllTransferLocations();
            return { success: true, data: results };
        } catch (error) {
            return { success: false, message: 'Error fetching transfer locations', error: error.message };
        }
    },

    getTransferLocationByStockId: async (stockId) => {
        try {
            const result = await TransferLocationRepository.getTransferLocationByStockId(stockId);
            if (result.length > 0) {
                return { success: true, data: result[0] };
            } else {
                return { success: false, message: 'Transfer location not found' };
            }
        } catch (error) {
            return { success: false, message: 'Error fetching transfer location', error: error.message };
        }
    },

    updateTransferLocation: async (stockId, updatedData) => {
        try {
            const result = await TransferLocationRepository.updateTransferLocation(stockId, updatedData);
            return { success: true, message: 'Transfer location updated successfully', data: result };
        } catch (error) {
            return { success: false, message: 'Error updating transfer location', error: error.message };
        }
    },

    deleteTransferLocation: async (stockId) => {
        try {
            const result = await TransferLocationRepository.deleteTransferLocation(stockId);
            return { success: true, message: 'Transfer location deleted successfully', data: result };
        } catch (error) {
            return { success: false, message: 'Error deleting transfer location', error: error.message };
        }
    }
};

export default TransferLocationService;
