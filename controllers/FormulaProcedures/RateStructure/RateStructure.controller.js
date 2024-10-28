import RateStructureService from '../../../Service/FormulaProcedures/RateStructure/RateStructure.service.js';

const RateStructureController = {
    createFormulaRange: async (req, res) => {
        try {
            const result = await RateStructureService.createFormulaRange(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default RateStructureController;
