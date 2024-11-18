// Service/Master/CalcMethodValue/CalcMethodValueService.js
import CalcMethodValueRepository from '../../../Repository/Global/operation/CalcMethodValue.repository.js';

const CalcMethodValueService = {
    getAllCalcMethodValues: async () => {
        try {
            return await CalcMethodValueRepository.getAllCalcMethodValues();
        } catch (error) {
            throw new Error(`Error fetching Calc Method Values: ${error.message}`);
        }
    },

    addCalcMethodValue: async (data) => {
        try {
            if (!data.configId || !data.configValue) {
                throw new Error('Both Config Id and Config Value are required.');
            }
            return await CalcMethodValueRepository.addCalcMethodValue(data);
        } catch (error) {
            throw new Error(`Error adding Calc Method Value: ${error.message}`);
        }
    },
};

export default CalcMethodValueService;
