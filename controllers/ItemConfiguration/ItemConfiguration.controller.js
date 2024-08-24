import ItemConfigurationService from '../../Service/ItemConfigration/ItemConfiguration.service.js';
import { generateAndDownloadExcel } from '../../utils/excelUtils.js';

const ItemConfigurationController = {
    getItemConfiguration: async (req, res) => {
        try {
            const data = await ItemConfigurationService.getAllItemConfigurations();
            res.json(data);
        } catch (err) {
            console.error('Error retrieving data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    postItemConfiguration: async (req, res) => {
        try {
            await ItemConfigurationService.createItemConfiguration(req.body);
            res.status(201).send('Data added successfully');
        } catch (err) {
            console.error('Error inserting data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    updateItemConfiguration: async (req, res) => {
        try {
            const { id } = req.params;
            await ItemConfigurationService.updateItemConfiguration(id, req.body);
            res.send('Data updated successfully');
        } catch (err) {
            console.error('Error updating data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    deleteItemConfiguration: async (req, res) => {
        try {
            const { id } = req.params;
            await ItemConfigurationService.deleteItemConfiguration(id);
            res.send('Data deleted successfully');
        } catch (err) {
            console.error('Error deleting data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    downloadItemConfigurationExcel: async (req, res) => {
        try {
            const data = await ItemConfigurationService.getAllItemConfigurations();

            const columns = [
                { header: 'ItemType', key: 'ItemType', width: 20 },
                { header: 'ItemGroup', key: 'ItemGroup', width: 20 },
                { header: 'ItemNature', key: 'ItemNature', width: 20 },
                { header: 'StockUOM', key: 'StockUOM', width: 15 },
                { header: 'DependentCriteria', key: 'DependentCriteria', width: 30 },
                { header: 'BOMIndicator', key: 'BOMIndicator', width: 15 },
                { header: 'LotManagementIndicator', key: 'LotManagementIndicator', width: 25 },
                { header: 'OtherLossIndicator', key: 'OtherLossIndicator', width: 25 },
                { header: 'CustomStockReqdInd', key: 'CustomStockReqdInd', width: 25 },
                { header: 'WastagePercentage', key: 'WastagePercentage', width: 20 },
                { header: 'InwardRateToleranceUp', key: 'InwardRateToleranceUp', width: 25 },
                { header: 'InwardRateToleranceDown', key: 'InwardRateToleranceDown', width: 25 },
                { header: 'OperationReqdInd', key: 'OperationReqdInd', width: 20 },
                { header: 'RowCreationInd', key: 'RowCreationInd', width: 20 },
                { header: 'MetalToleranceDown', key: 'MetalToleranceDown', width: 25 },
                { header: 'AlloyToleranceDown', key: 'AlloyToleranceDown', width: 25 },
                { header: 'MetalToleranceUp', key: 'MetalToleranceUp', width: 25 },
                { header: 'AlloyToleranceUp', key: 'AlloyToleranceUp', width: 25 }
            ];

            await generateAndDownloadExcel(res, 'ItemConfiguration', columns, data, 'ItemConfiguration.xlsx');
        } catch (err) {
            console.error('Error generating Excel file:', err.stack);
            res.status(500).send('File generation error');
        }
    }
};

export default ItemConfigurationController;
