import ItemConfigurationDependentCriteriaRepository from '../../Repository/ItemConfiguration/ItemConfigurationDependentCriteria.repository.js'

const ItemConfigurationDependentCriteriaService = {
    getAllItemConfigurations: async () => {
        try {
            const data = await ItemConfigurationDependentCriteriaRepository.getAll();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    },

    createItemConfiguration: async (itemConfigurationData) => {
        const {
            ConfigID,
            ConfigType,
            ConfigCode,
            ConfigValue,
            ConfigRemark1 = null,
            ConfigRemark2 = null,
            DepdConfigCode = null,
            DepdConfigID = null,
            DepdConfigValue = null,
            Keywords = null,
            RowStatus = null
        } = itemConfigurationData;

        const params = [
            ConfigID,
            ConfigType,
            ConfigCode,
            ConfigValue,
            ConfigRemark1,
            ConfigRemark2,
            DepdConfigCode,
            DepdConfigID,
            DepdConfigValue,
            Keywords,
            RowStatus
        ];

        try {
            const result = await ItemConfigurationDependentCriteriaRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default ItemConfigurationDependentCriteriaService;
