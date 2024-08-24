import ItemConfigurationRepository from "../../Repository/ItemConfiguration/ItemConfiguration.repository.js";

const ItemConfigurationService = {
    getAllItemConfigurations: async () => {
        try {
            const data = await ItemConfigurationRepository.getAll();
            return data;
        } catch (error) {
            throw new Error(`Error retrieving configurations: ${error.message}`);
        }
    },

    createItemConfiguration: async (itemConfigurationData) => {
        const {
            ItemType,
            ItemGroup,
            ItemNature,
            StockUOM,
            DependentCriteria = null,
            BOMIndicator,
            LotManagementIndicator,
            OtherLossIndicator = null,
            CustomStockReqdInd,
            WastagePercentage = null,
            InwardRateToleranceUp = null,
            InwardRateToleranceDown = null,
            OperationReqdInd,
            RowCreationInd,
            MetalToleranceDown = null,
            AlloyToleranceDown = null,
            MetalToleranceUp = null,
            AlloyToleranceUp = null
        } = itemConfigurationData;

        const params = [
            ItemType,
            ItemGroup,
            ItemNature,
            StockUOM,
            DependentCriteria,
            BOMIndicator,
            LotManagementIndicator,
            OtherLossIndicator,
            CustomStockReqdInd,
            WastagePercentage,
            InwardRateToleranceUp,
            InwardRateToleranceDown,
            OperationReqdInd,
            RowCreationInd,
            MetalToleranceDown,
            AlloyToleranceDown,
            MetalToleranceUp,
            AlloyToleranceUp
        ];

        try {
            const result = await ItemConfigurationRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(`Error creating configuration: ${error.message}`);
        }
    },

    updateItemConfiguration: async (id, itemConfigurationData) => {
        const {
            ItemType,
            ItemGroup,
            ItemNature,
            StockUOM,
            DependentCriteria = null,
            BOMIndicator,
            LotManagementIndicator,
            OtherLossIndicator = null,
            CustomStockReqdInd,
            WastagePercentage = null,
            InwardRateToleranceUp = null,
            InwardRateToleranceDown = null,
            OperationReqdInd,
            RowCreationInd,
            MetalToleranceDown = null,
            AlloyToleranceDown = null,
            MetalToleranceUp = null,
            AlloyToleranceUp = null
        } = itemConfigurationData;

        const params = [
            ItemType,
            ItemGroup,
            ItemNature,
            StockUOM,
            DependentCriteria,
            BOMIndicator,
            LotManagementIndicator,
            OtherLossIndicator,
            CustomStockReqdInd,
            WastagePercentage,
            InwardRateToleranceUp,
            InwardRateToleranceDown,
            OperationReqdInd,
            RowCreationInd,
            MetalToleranceDown,
            AlloyToleranceDown,
            MetalToleranceUp,
            AlloyToleranceUp
        ];

        try {
            const result = await ItemConfigurationRepository.update(id, params);
            return result;
        } catch (error) {
            throw new Error(`Error updating configuration: ${error.message}`);
        }
    },

    deleteItemConfiguration: async (id) => {
        try {
            const result = await ItemConfigurationRepository.delete(id);
            return result;
        } catch (error) {
            throw new Error(`Error deleting configuration: ${error.message}`);
        }
    }
};

export default ItemConfigurationService;
