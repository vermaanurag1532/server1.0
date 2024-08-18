import ItemConfigurationItemGroupRepository from '../../Repository/ItemConfiguration/ItemConfigurationItemGroup.repository.js'

const ItemConfigurationItemGroupService = {
    getAllItemConfigurations: async () => {
        try {
            const data = await ItemConfigurationItemGroupRepository.getAll();
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
            const result = await ItemConfigurationItemGroupRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default ItemConfigurationItemGroupService;
