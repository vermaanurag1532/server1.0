import AllAttributeParentFormAttributeTypeRepository from '../../Repository/AllAttribute/AllAttributeParentFormAttributeType.repository.js'

const AllAttributeParentFormAttributeTypeService = {
    getAllAttributeParentFormAttributeType: async () => {
        try {
            const data = await AllAttributeParentFormAttributeTypeRepository.getAll();
            return data;
        } catch (error) {
            throw new Error(`Error retrieving configurations: ${error.message}`);
        }
    },

    createAllAttributeParentFormAttributeType: async (attributeData) => {
        const {
            ConfigValue,
            ConfigCode,
            ConfigId,
        } = attributeData;

        const params = [
            ConfigValue,
            ConfigCode,
            ConfigId,
         ]

        try {
            const result = await AllAttributeParentFormAttributeTypeRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(`Error creating attribute parent form: ${error.message}`);
        }
    }
};

export default AllAttributeParentFormAttributeTypeService;