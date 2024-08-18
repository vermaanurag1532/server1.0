import ItemConfigurationItemTypeRepository from "../../Repository/ItemConfiguration/ItemConfigurationItemType.repository.js";

const ItemConfigurationItemTypeService = {
    getAllItemConfigurations: async () => {
        try {
            const data = await ItemConfigurationItemTypeRepository.getAll();
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
            const result = await ItemConfigurationItemTypeRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default ItemConfigurationItemTypeService;
