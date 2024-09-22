import ItemService from '../../../../Service/ItemMasterAndVariants/Stone/Diamond/DiamondItem.service.js';
import { generateAndDownloadExcel } from '../../../../utils/excelUtils.js';

const DiamondItemController = {
    getAllItems: async (req, res) => {
        try {
            const data = await ItemService.getItems();
            res.json(data);
        } catch (err) {
            console.error('Error retrieving data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    postItem: async (req, res) => {
        try {
            await ItemService.createItem(req.body);
            res.status(201).send('Item added successfully');
        } catch (err) {
            console.error('Error inserting data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    downloadItemsExcel: async (req, res) => {
        try {
            const data = await ItemService.getItems();

            const columns = [
                { header: 'Stone Code', key: 'Stone code', width: 20 },
                { header: 'Description', key: 'Description', width: 30 },
                { header: 'Row Status', key: 'Row status', width: 15 },
                { header: 'Created Date', key: 'Created Date', width: 15 },
                { header: 'Update Date', key: 'Update Date', width: 15 },
                { header: 'Attribute Type', key: 'Attribute Type', width: 15 },
                { header: 'Attribute Value', key: 'Attribute Value', width: 15 }
            ];

            await generateAndDownloadExcel(res, 'Items', columns, data, 'Items.xlsx');
        } catch (err) {
            console.error('Error generating Excel file:', err.stack);
            res.status(500).send('File generation error');
        }
    }
};

export default DiamondItemController;
