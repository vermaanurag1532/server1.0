import GstRegistrationService from "../../../Service/Global/GstRegistration/gstRegistration.service.js";

const GstRegistrationController = {
    getAll: async (req, res) => {
        try {
            const data = await GstRegistrationService.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error fetching records", error });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await GstRegistrationService.getById(id);
            if (!data) {
                return res.status(404).json({ message: "Record not found" });
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error fetching record", error });
        }
    },

    create: async (req, res) => {
        try {
            const newData = req.body;
            await GstRegistrationService.create(newData);
            res.status(201).json({ message: "Record created successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error creating record", error });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const result = await GstRegistrationService.update(id, updatedData);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Record not found" });
            }
            res.status(200).json({ message: "Record updated successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error updating record", error });
        }
    },

    remove: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await GstRegistrationService.delete(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Record not found" });
            }
            res.status(200).json({ message: "Record deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting record", error });
        }
    }
};

export default GstRegistrationController;
