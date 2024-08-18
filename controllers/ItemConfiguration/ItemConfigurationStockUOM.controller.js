import ItemConfigurationStockUOMService from '../../Service/ItemConfigration/ItemConfigurationStockUOM.service.js';
import { generateAndDownloadExcel } from '../../utils/excelUtils.js';

const ItemConfigurationStockUOMControllers = {
    getItemConfigurationItemType: async (req, res) => {
        try {
            const results = await ItemConfigurationStockUOMService.getAllItemConfigurations();
            res.json(results);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    postItemConfigurationItemType: async (req, res) => {
        try {
            const result = await ItemConfigurationStockUOMService.createItemConfiguration(req.body);
            res.status(201).json({ message: 'Data added successfully', result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    downloadItemConfigurationItemTypeExcel: async (req, res) => {
        try {
            const results = await ItemConfigurationStockUOMService.getAllItemConfigurations();

            const columns = [
                { header: 'ConfigID', key: 'ConfigID', width: 15 },
                { header: 'ConfigType', key: 'ConfigType', width: 25 },
                { header: 'ConfigCode', key: 'ConfigCode', width: 25 },
                { header: 'ConfigValue', key: 'ConfigValue', width: 25 },
                { header: 'ConfigRemark1', key: 'ConfigRemark1', width: 25 },
                { header: 'ConfigRemark2', key: 'ConfigRemark2', width: 25 },
                { header: 'DepdConfigCode', key: 'DepdConfigCode', width: 25 },
                { header: 'DepdConfigID', key: 'DepdConfigID', width: 25 },
                { header: 'DepdConfigValue', key: 'DepdConfigValue', width: 25 },
                { header: 'Keywords', key: 'Keywords', width: 25 },
                { header: 'RowStatus', key: 'RowStatus', width: 15 }
            ];

            await generateAndDownloadExcel(res, 'ItemConfigurationStockUOM', columns, results, 'ItemConfigurationStockUOM.xlsx');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default ItemConfigurationStockUOMControllers;
