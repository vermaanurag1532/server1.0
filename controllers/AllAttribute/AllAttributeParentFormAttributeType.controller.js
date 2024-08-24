import AllAttributeParentFormAttributeTypeService from '../../Service/AllAttribute/AllAttributeParentFormAttributeType.service.js'
import { generateAndDownloadExcel } from '../../utils/excelUtils.js';

const AllAttributeParentFormAttributeTypeController = {
    getAllAttributeParentFormAttributeType: async (req, res) => {
        try {
            const data = await AllAttributeParentFormAttributeTypeService.getAllAttributeParentFormAttributeType();
            res.json(data);
        } catch (err) {
            console.error('Error retrieving data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    postAllAttributeParentFormAttributeType: async (req, res) => {
        try {
            await AllAttributeParentFormAttributeTypeService.createAllAttributeParentFormAttributeType(req.body);
            res.status(201).send('Data added successfully');
        } catch (err) {
            console.error('Error inserting data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    downloadAllAttributeParentFormAttributeTypeExcel: async (req, res) => {
        try {
            const data = await AllAttributeParentFormAttributeTypeService.getAllAttributeParentFormAttributeType();

            const columns = [
                { header: 'ConfigValue', key: 'ConfigValue', width: 25 },
                { header: 'ConfigCode', key: 'ConfigCode', width: 25 },
                { header: 'ConfigId', key: 'ConfigId', width: 30 }
            ];

            await generateAndDownloadExcel(res, 'AllAttributeParentFormAttributeType', columns, data, 'AllAttributeParentFormAttributeType.xlsx');
        } catch (err) {
            console.error('Error generating Excel file:', err.stack);
            res.status(500).send('File generation error');
        }
    }
};

export default AllAttributeParentFormAttributeTypeController;