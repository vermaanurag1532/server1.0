import FormulaProcedureMasterDetailsService from '../../../Service/FormulaProcedures/FormulaProcedure/FormulaProcedure.service.js';

const FormulaProcedureMasterDetailsController = {

    // Create a new formula procedure master detail
    createFormulaProcedureMasterDetail: async (req, res) => {
        try {
            const result = await FormulaProcedureMasterDetailsService.createFormulaProcedureMasterDetail(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all formula procedure master details
    getAllFormulaProcedureMasterDetails: async (req, res) => {
        try {
            const data = await FormulaProcedureMasterDetailsService.getAllFormulaProcedureMasterDetails();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getDetailByName: async (req, res) => {
        const { formulaProcedureName } = req.params;
        try {
            const result = await FormulaProcedureMasterDetailsService.getByName(formulaProcedureName);
            if (!result) {
                return res.status(404).json({ message: "Formula Procedure not found" });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: "An error occurred", error });
        }
    },

    getTableDetails: async (req, res) => {
        try {
            const data = await FormulaProcedureMasterDetailsService.getTableDetails();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default FormulaProcedureMasterDetailsController;
