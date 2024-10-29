import RateStructureExcelService from '../../../Service/FormulaProcedures/RateStructure/RateStructureExcel.service.js';

const RateStructureExcelController = {
    // Controller method to fetch all details
    async getAllDetails(req, res) {
        try {
            const data = await RateStructureExcelService.getAllDetails();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller method to fetch details by Range Hierarchy Name
    async getDetailsByRangeHierarchyName(req, res) {
        const { name } = req.params;
        try {
            const data = await RateStructureExcelService.getDetailsByRangeHierarchyName(name);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller method to create a new Range Hierarchy Detail
    async createRangeHierarchyDetails(req, res) {
        const { rangeHierarchyName, details } = req.body;
        try {
            const result = await RateStructureExcelService.createRangeHierarchyDetails(rangeHierarchyName, details);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default RateStructureExcelController;
