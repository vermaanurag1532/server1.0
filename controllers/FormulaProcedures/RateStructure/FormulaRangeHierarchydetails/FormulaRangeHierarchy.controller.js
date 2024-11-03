import RangeHierarchyService from '../../../../Service/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/FormulaRangeHierarchy.service.js';

const RangeHierarchyController = {
    // Create a new range hierarchy detail
    createRangeHierarchyDetail: async (req, res) => {
        try {
            const result = await RangeHierarchyService.createRangeHierarchyDetail(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Get all range hierarchy details
    getAllRangeHierarchyDetails: async (req, res) => {
        try {
            const data = await RangeHierarchyService.getAllRangeHierarchyDetails();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    getRangeHierarchyByName: async (req, res) => {
        try {
            const { name } = req.params;
            const data = await RangeHierarchyService.getRangeHierarchyByName(name);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default RangeHierarchyController;
