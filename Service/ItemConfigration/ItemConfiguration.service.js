import ItemConfigurationRepository from "../../Repository/ItemConfiguration/ItemConfiguration.repository.js";

class ItemConfigurationService {
    async getAllItemConfigurations() {
        return await ItemConfigurationRepository.getAll();
    }

    async createItemConfiguration(data) {
        return await ItemConfigurationRepository.create(data);
    }

    async generateItemConfigurationExcel() {
        const data = await ItemConfigurationRepository.getAll();
        return data;
    }
}

export default ItemConfigurationService;
