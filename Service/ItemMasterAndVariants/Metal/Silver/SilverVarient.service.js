import SilverVariantRepository from '../../../../Repository/ItemMasterAndVariants/Metal/Silver/SilverVarient.repository.js';

const SilverVariantService = {
    getVariants: async () => {
        try {
            const data = await SilverVariantRepository.getAll();
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
            'Attribute Type': AttributeType,
            'Attribute Value': AttributeValue
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
            AttributeType,
            AttributeValue
        ];
    
        try {
            const result = await SilverVariantRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(`Error creating variant: ${error.message}`);
        }
    }
};

export default SilverVariantService;
