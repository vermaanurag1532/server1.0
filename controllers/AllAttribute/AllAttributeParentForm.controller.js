import AllAttributeParentFormService from '../../Service/AllAttribute/AllAttributeParentForm.service.js'
import { generateAndDownloadExcel } from '../../utils/excelUtils.js';

const AllAttributeParentFormController = {
    getAllAttributeParentForm: async (req, res) => {
        try {
            const data = await AllAttributeParentFormService.getAllAttributeParentForm();
            res.json(data);
        } catch (err) {
            console.error('Error retrieving data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    postAllAttributeParentForm: async (req, res) => {
        try {
            await AllAttributeParentFormService.createAllAttributeParentForm(req.body);
            res.status(201).send('Data added successfully');
        } catch (err) {
            console.error('Error inserting data:', err.stack);
            res.status(500).send('Database error');
        }
    },

    downloadAllAttributeParentFormExcel: async (req, res) => {
        try {
            const data = await AllAttributeParentFormService.getAllAttributeParentForm();

            const columns = [
                { header: 'AttributeType', key: 'AttributeType', width: 25 },
                { header: 'AttributeCode', key: 'AttributeCode', width: 25 },
                { header: 'AttributeDescription', key: 'AttributeDescription', width: 30 },
                { header: 'DefaultIndicator', key: 'DefaultIndicator', width: 20 },
                { header: 'RowStatus', key: 'RowStatus', width: 20 }
            ];

            await generateAndDownloadExcel(res, 'AllAttributeParentForm', columns, data, 'AllAttributeParentForm.xlsx');
        } catch (err) {
            console.error('Error generating Excel file:', err.stack);
            res.status(500).send('File generation error');
        }
    }
};

export default AllAttributeParentFormController;