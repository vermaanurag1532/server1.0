// Controllers/Master/CalcMethodValue/CalcMethodValueController.js
import CalcMethodValueService from '../../../Service/Global/operation/CalcMethodValue.service.js';

const CalcMethodValueController = {
    getAllCalcMethodValues: async (req, res) => {
        try {
            const calcMethodValues = await CalcMethodValueService.getAllCalcMethodValues();
            res.status(200).json(calcMethodValues);
        } catch (error) {
            console.error('Error fetching Calc Method Values:', error.message);
            res.status(500).json({ message: 'Failed to fetch Calc Method Values', error: error.message });
        }
    },

    addCalcMethodValue: async (req, res) => {
        try {
            const { configId, configValue } = req.body;
            const result = await CalcMethodValueService.addCalcMethodValue({ configId, configValue });
            res.status(201).json({ message: 'Calc Method Value added successfully', result });
        } catch (error) {
            console.error('Error adding Calc Method Value:', error.message);
            res.status(500).json({ message: 'Failed to add Calc Method Value', error: error.message });
        }
    },
};

export default CalcMethodValueController;
