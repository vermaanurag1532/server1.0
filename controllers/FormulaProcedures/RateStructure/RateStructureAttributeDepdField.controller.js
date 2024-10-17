import DepdFieldService from '../../../Service/FormulaProcedures/RateStructure/RateStructureAttributeDepdField.service.js';

const AttributeDepdFieldController = {
    getDepdField: async (req, res) => {
        try {
            const data = await DepdFieldService.getAllDepdField();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createDepdField: async (req, res) => {
        try {
            // Pass req.body directly to the service
            const result = await DepdFieldService.createDepdField(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default AttributeDepdFieldController;
