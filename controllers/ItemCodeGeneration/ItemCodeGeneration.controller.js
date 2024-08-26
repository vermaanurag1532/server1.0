import ItemCodeGenerationService from '../../Service/ItemCodeGeneration/ItemCodeGeneration.service.js';

const ItemCodeGenerationController = {
    getAllAttributeParentForm: async (req, res) => {
        try {
            const data = await ItemCodeGenerationService.getItemCodeGeneration();
            res.json(data);
        } catch (err) {
            console.error('Error retrieving data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    postAllAttributeParentForm: async (req, res) => {
        try {
            await ItemCodeGenerationService.createItemCodeGeneration(req.body);
            res.status(201).send('Data added successfully');
        } catch (err) {
            console.error('Error inserting data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    downloadAllAttributeParentFormExcel: async (req, res) => {
        try {
            const data = await ItemCodeGenerationService.getItemCodeGeneration();

            const columns = [
                { header: 'Item Group', key: 'ItemGroup', width: 25 },
                { header: 'Code Gen Format', key: 'CodeGenFormat', width: 25 },
                { header: 'Start with', key: 'StartWith', width: 20 },
                { header: 'Incr By', key: 'IncrBy', width: 20 },
                { header: 'SrNo Separator', key: 'SrNoSeparator', width: 20 },
                { header: 'Master Variant Ind', key: 'MasterVariantInd', width: 25 }
            ];

            await generateAndDownloadExcel(res, 'ItemCodeGeneration', columns, data, 'ItemCodeGeneration.xlsx');
        } catch (err) {
            console.error('Error generating Excel file:', err.stack);
            res.status(500).send('File generation error');
        }
    }
};

export default ItemCodeGenerationController;
