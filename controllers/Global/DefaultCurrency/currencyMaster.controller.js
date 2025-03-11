import CurrencyMasterService from "../../../Service/Global/DefaultCurrency/currencyMaster.service.js";

class CurrencyMasterController {
    // Get all currencies
    static async getAll(req, res) {
        try {
            const data = await CurrencyMasterService.getAll();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    }

    // Get a currency by ID
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const data = await CurrencyMasterService.getById(id);
            if (!data) {
                return res.status(404).json({ message: "Currency not found" });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    }

    // Create a new currency
    static async create(req, res) {
        try {
            await CurrencyMasterService.create(req.body);
            return res.status(201).json({ message: "Currency created successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    }

    // Update currency
    static async update(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "Currency ID is required" });
            }
            const updateResult = await CurrencyMasterService.update(id, req.body);
            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: "Currency not found" });
            }
            return res.status(200).json({ message: "Currency updated successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    }

    // Delete currency
    static async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "Currency ID is required" });
            }
            const deleteResult = await CurrencyMasterService.delete(id);
            if (deleteResult.affectedRows === 0) {
                return res.status(404).json({ message: "Currency not found" });
            }
            return res.status(200).json({ message: "Currency deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    }
}

export default CurrencyMasterController;
