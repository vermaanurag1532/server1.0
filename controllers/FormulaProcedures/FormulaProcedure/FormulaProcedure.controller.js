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
    }
};

export default FormulaProcedureMasterDetailsController;
