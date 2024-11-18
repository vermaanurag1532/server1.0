import CalcMethodService from '../../../Service/Global/operation/CalcMethod.service.js';

const CalcMethodController = {
    // Get all Calc Methods
    getAllCalcMethods: async (req, res) => {
        try {
            const calcMethods = await CalcMethodService.getAllCalcMethods();
            res.status(200).json(calcMethods);
        } catch (error) {
            console.error('Error fetching Calc Methods:', error);
            res.status(500).json({ message: 'Failed to fetch Calc Methods', error: error.message });
        }
    },

    // Get Calc Method by Config ID
    getCalcMethodById: async (req, res) => {
        const { configId } = req.params;
        try {
            const calcMethod = await CalcMethodService.getCalcMethodById(configId);
            if (calcMethod) {
                res.status(200).json(calcMethod);
            } else {
                res.status(404).json({ message: 'Calc Method not found' });
            }
        } catch (error) {
            console.error('Error fetching Calc Method by ID:', error);
            res.status(500).json({ message: 'Failed to fetch Calc Method', error: error.message });
        }
    },

    // Add a new Calc Method
    addCalcMethod: async (req, res) => {
        const calcMethodData = req.body;
        try {
            const calcMethodId = await CalcMethodService.addCalcMethod(calcMethodData);
            res.status(201).json({ message: 'Calc Method added successfully', calcMethodId });
        } catch (error) {
            console.error('Error adding Calc Method:', error);
            res.status(500).json({ message: 'Failed to add Calc Method', error: error.message });
        }
    }
};

export default CalcMethodController;
