import CalcMethodRepository from '../../../Repository/Global/operation/CalcMethod.repository.js';

const CalcMethodService = {
    getAllCalcMethods: async () => {
        return await CalcMethodRepository.getAllCalcMethods();
    },

    getCalcMethodById: async (configId) => {
        return await CalcMethodRepository.getCalcMethodById(configId);
    },

    addCalcMethod: async (calcMethodData) => {
        return await CalcMethodRepository.addCalcMethod(calcMethodData);
    }
};

export default CalcMethodService;
