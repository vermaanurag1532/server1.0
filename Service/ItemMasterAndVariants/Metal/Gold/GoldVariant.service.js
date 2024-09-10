import MetalGoldVariantsRepository from '../../../../Repository/ItemMasterAndVariants/Metal/Gold/GoldVariant.repository.js';

const MetalGoldVariantsService = {
    getVariants: async () => {
        try {
            const data = await MetalGoldVariantsRepository.getAll();
            return data;
        } catch (error) {
            throw new Error(`Error retrieving variants: ${error.message}`);
        }
    },

    createVariant: async (variantData) => {
        const {
            'Metal name': MetalName,
            'Variant type': VariantType,
            'Base metal Variant': BaseMetalVariant,
            'Std. selling rate': StdSellingRate,
            'Std. buying rate': StdBuyingRate,
            'Reorder Qty': ReorderQty,
            'Used in BOM': UsedInBOM,
            'Can Return in Melting': CanReturnInMelting,
            'Row status': RowStatus,
            'Created Date': CreatedDate,
            'Update Date': UpdateDate,
            'Metal Color': MetalColor,
            'Karat': Karat
        } = variantData;

        const params = [
            MetalName,
            VariantType,
            BaseMetalVariant,
            StdSellingRate,
            StdBuyingRate,
            ReorderQty,
            UsedInBOM,
            CanReturnInMelting,
            RowStatus,
            CreatedDate,
            UpdateDate,
            MetalColor,
            Karat
        ];

        try {
            const result = await MetalGoldVariantsRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(`Error creating variant: ${error.message}`);
        }
    }
};

export default MetalGoldVariantsService;
