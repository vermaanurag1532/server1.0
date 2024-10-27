import FormulaRangeMasterService from '../../../../Service/FormulaProcedures/RateStructure/FormulaRangeMaster/FormulaRangeMaster.service.js';

const FormulaRangeMasterController = {
    getRangeMasters: async (req, res) => {
        try {
            const data = await FormulaRangeMasterService.getAllRangeMasters();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createRangeMaster: async (req, res) => {
        try {
            const result = await FormulaRangeMasterService.createRangeMaster(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default FormulaRangeMasterController;
