import TermsMasterService from "../../../Service/Global/DefaultTerms/termsMaster.service.js";

const TermsMasterController = {
    getAllTerms: async (req, res) => {
        try {
            const data = await TermsMasterService.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    },

    getTermsById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await TermsMasterService.getById(id);
            if (!data) {
                return res.status(404).json({ message: "Terms not found" });
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    },

    createTerms: async (req, res) => {
        try {
            await TermsMasterService.create(req.body);
            res.status(201).json({ message: "Terms created successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    },

    updateTerms: async (req, res) => {
        try {
            const { id } = req.params;
            const updateResult = await TermsMasterService.update(id, req.body);
            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: "Terms not found" });
            }
            res.status(200).json({ message: "Terms updated successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    },

    deleteTerms: async (req, res) => {
        try {
            const { id } = req.params;
            const deleteResult = await TermsMasterService.delete(id);
            if (deleteResult.affectedRows === 0) {
                return res.status(404).json({ message: "Terms not found" });
            }
            res.status(200).json({ message: "Terms deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }
};

export default TermsMasterController;
