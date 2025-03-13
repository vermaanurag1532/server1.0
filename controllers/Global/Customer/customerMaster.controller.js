import CustomerMasterService from "../../../Service/Global/Customer/customerMaster.service.js";

const CustomerMasterController = {
    getAllCustomers: async (req, res) => {
        try {
            const data = await CustomerMasterService.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    },

    getCustomerById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await CustomerMasterService.getById(id);
            if (!data) {
                return res.status(404).json({ message: "Customer not found" });
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    },

    createCustomer: async (req, res) => {
        try {
            await CustomerMasterService.create(req.body);
            res.status(201).json({ message: "Customer created successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    },

    updateCustomer: async (req, res) => {
        try {
            const { id } = req.params;
            const updateResult = await CustomerMasterService.update(id, req.body);
            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: "Customer not found" });
            }
            res.status(200).json({ message: "Customer updated successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    },

    deleteCustomer: async (req, res) => {
        try {
            const { id } = req.params;
            const deleteResult = await CustomerMasterService.delete(id);
            if (deleteResult.affectedRows === 0) {
                return res.status(404).json({ message: "Customer not found" });
            }
            res.status(200).json({ message: "Customer deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }
};

export default CustomerMasterController;
