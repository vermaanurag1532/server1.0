import AllAttributeParentFormRepository from '../../Repository/AllAttribute/AllAttributeParentForm.repository.js'

const AllAttributeParentFormService = {
    getAllAttributeParentForm: async () => {
        try {
            const data = await AllAttributeParentFormRepository.getAll();
            return data;
        } catch (error) {
            throw new Error(`Error retrieving configurations: ${error.message}`);
        }
    },

    createAllAttributeParentForm: async (attributeData) => {
        const {
            AttributeType,
            AttributeCode,
            AttributeDescription,
            DefaultIndicator,
            RowStatus
        } = attributeData;

        const params = [
            AttributeType,
            AttributeCode,
            AttributeDescription,
            DefaultIndicator,
            RowStatus
         ]

        try {
            const result = await AllAttributeParentFormRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(`Error creating attribute parent form: ${error.message}`);
        }
    }
};

export default AllAttributeParentFormService;