import RateTypeService from '../../../../Service/FormulaProcedures/RateStructure/FormulaRangeMaster/RateStructureRateType.service.js';

const RateTypeController = {
    getRateTypes: async (req, res) => {
        try {
            const data = await RateTypeService.getAllRateTypes();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createRateType: async (req, res) => {
        try {
            // Pass req.body directly to the service
            const result = await RateTypeService.createRateType(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default RateTypeController;
