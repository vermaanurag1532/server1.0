import TypeService from '../../../Service/Global/operation/Type.service.js';

const TypeController = {
    // Get all Types
    getAllTypes: async (req, res) => {
        try {
            const types = await TypeService.getAllTypes();
            res.status(200).json(types);
        } catch (error) {
            console.error('Error fetching all types:', error);
            res.status(500).json({ message: 'Failed to fetch types', error: error.message });
        }
    },

    // Get Type by ID
    getTypeById: async (req, res) => {
        const { configId } = req.params;
        try {
            const type = await TypeService.getTypeById(configId);
            if (type) {
                res.status(200).json(type);
            } else {
                res.status(404).json({ message: 'Type not found' });
            }
        } catch (error) {
            console.error('Error fetching type by ID:', error);
            res.status(500).json({ message: 'Failed to fetch type', error: error.message });
        }
    },

    // Add a new Type
    addType: async (req, res) => {
        const typeData = req.body;
        try {
            const typeId = await TypeService.addType(typeData);
            res.status(201).json({ message: 'Type added successfully', typeId });
        } catch (error) {
            console.error('Error adding type:', error);
            res.status(500).json({ message: 'Failed to add type', error: error.message });
        }
    }
};

export default TypeController;
