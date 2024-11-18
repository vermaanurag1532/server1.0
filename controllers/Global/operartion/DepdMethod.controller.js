// Controllers/Master/DepdMethod/DepdMethodController.js
import DepdMethodService from '../../../Service/Global/operation/DepdMethod.service.js';

const DepdMethodController = {
    getAllDepdMethods: async (req, res) => {
        try {
            const depdMethods = await DepdMethodService.getAllDepdMethods();
            res.status(200).json(depdMethods);
        } catch (error) {
            console.error('Error fetching Depd Methods:', error.message);
            res.status(500).json({ message: 'Failed to fetch Depd Methods', error: error.message });
        }
    },

    addDepdMethod: async (req, res) => {
        try {
            const { configId, configCode, configValue } = req.body;
            const result = await DepdMethodService.addDepdMethod({ configId, configCode, configValue });
            res.status(201).json({ message: 'Depd Method added successfully', result });
        } catch (error) {
            console.error('Error adding Depd Method:', error.message);
            res.status(500).json({ message: 'Failed to add Depd Method', error: error.message });
        }
    },
};

export default DepdMethodController;
