import ItemConfigurationItemNatureRepository from '../../Repository/ItemConfiguration/ItemConfigurationItemNature.repository.js'

const ItemConfigurationItemNatureService = {
    getAllItemConfigurations: async () => {
        try {
            const data = await ItemConfigurationItemNatureRepository.getAll();
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
            const result = await ItemConfigurationItemNatureRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default ItemConfigurationItemNatureService;
