import ItemCodeGenerationRepository from '../../Repository/ItemCodeGeneration/ItemCodeGeneration.repository.js';

const ItemCodeGenerationService = {
    getItemCodeGeneration: async () => {
        try {
            const data = await ItemCodeGenerationRepository.getAll();
            return data;
        } catch (error) {
            throw new Error(`Error retrieving configurations: ${error.message}`);
        }
    },

    createItemCodeGeneration: async (attributeData) => {
        const {
            ItemGroup,
            CodeGenFormat,
            StartWith,
            IncrBy,
            SrNoSeparator,
            MasterVariantInd
        } = attributeData;

        // Map these to the corresponding columns in the database
        const params = [
            ItemGroup,
            CodeGenFormat,
            StartWith,
            IncrBy,
            SrNoSeparator,
            MasterVariantInd
        ];

        try {
            const result = await ItemCodeGenerationRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(`Error creating item code generation: ${error.message}`);
        }
    }
};

export default ItemCodeGenerationService;

