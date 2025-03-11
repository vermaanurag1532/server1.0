import SilverVariantService from '../../../../Service/ItemMasterAndVariants/Metal/Silver/SilverVarient.service.js';
import { generateAndDownloadExcel } from '../../../../utils/excelUtils.js';

const SilverVariantController = {
    getAllVariants: async (req, res) => {
        try {
            const data = await SilverVariantService.getVariants();
            res.json(data);
        } catch (err) {
            console.error('Error retrieving data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    postVariant: async (req, res) => {
        try {
            await SilverVariantService.createVariant(req.body);
            res.status(201).send('Variant added successfully');
        } catch (err) {
            console.error('Error inserting data:', err.stack);
            res.status(500).send(err.stack);
        }
    },

    downloadVariantsExcel: async (req, res) => {
        try {
            const data = await SilverVariantService.getVariants();

            const columns = [
                { header: 'Metal Name', key: 'Metal name', width: 20 },
                { header: 'Metal Variant Name', key: 'Metal Variant Name', width: 20 },
                { header: 'Variant Type', key: 'Variant type', width: 20 },
                { header: 'Base Metal Variant', key: 'Base metal Variant', width: 20 },
                { header: 'Std. Selling Rate', key: 'Std. selling rate', width: 20 },
                { header: 'Std. Buying Rate', key: 'Std. buying rate', width: 20 },
                { header: 'Reorder Qty', key: 'Reorder Qty', width: 15 },
                { header: 'Used in BOM', key: 'Used in BOM', width: 15 },
                { header: 'Can Return in Melting', key: 'Can Return in Melting', width: 20 },
                { header: 'Row Status', key: 'Row status', width: 15 },
                { header: 'Created Date', key: 'Created Date', width: 15 },
                { header: 'Update Date', key: 'Update Date', width: 15 },
                { header: 'Metal Color', key: 'Attribute Type', width: 15 },
                { header: 'Karat', key: 'Attribute Value', width: 15 }
            ];

            // Use the utility function to generate and send the Excel file
            await generateAndDownloadExcel(res, 'SilverVariants', columns, data, 'SilverVariants.xlsx');
        } catch (err) {
            console.error('Error generating Excel file:', err.stack);
            res.status(500).send('File generation error');
        }
    }
};

export default SilverVariantController;
