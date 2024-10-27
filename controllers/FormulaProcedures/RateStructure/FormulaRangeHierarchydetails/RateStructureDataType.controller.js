import DataTypeService from '../../../../Service/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/RateStructureDataType.service.js';

const DataTypeController = {
    getDataTypes: async (req, res) => {
        try {
            const data = await DataTypeService.getAllDataTypes();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createDataType: async (req, res) => {
        try {
            // Pass req.body directly to the service
            const result = await DataTypeService.createDataType(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default DataTypeController;
