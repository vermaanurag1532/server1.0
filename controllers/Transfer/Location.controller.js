import TransferLocationService from '../../Service/Transfer/Location.service.js';

const TransferLocationController = {
    addTransferLocation: async (req, res) => {
        const transferLocationData = req.body;
        const result = await TransferLocationService.addTransferLocation(transferLocationData);
        res.status(result.success ? 200 : 500).json(result);
    },

    getAllTransferLocations: async (req, res) => {
        const result = await TransferLocationService.getAllTransferLocations();
        res.status(result.success ? 200 : 500).json(result);
    },

    getTransferLocationByStockId: async (req, res) => {
        const stockId = req.params.stockId;
        const result = await TransferLocationService.getTransferLocationByStockId(stockId);
        res.status(result.success ? 200 : 404).json(result);
    },

    updateTransferLocation: async (req, res) => {
        const stockId = req.params.stockId;
        const updatedData = req.body;
        const result = await TransferLocationService.updateTransferLocation(stockId, updatedData);
        res.status(result.success ? 200 : 500).json(result);
    },

    deleteTransferLocation: async (req, res) => {
        const stockId = req.params.stockId;
        const result = await TransferLocationService.deleteTransferLocation(stockId);
        res.status(result.success ? 200 : 500).json(result);
    }
};

export default TransferLocationController;
