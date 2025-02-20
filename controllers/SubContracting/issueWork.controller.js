import SubContractingIssueWorkService from '../../Service/SubContracting/issueWork.service.js';

const SubContractingIssueWorkController = {
    getAll: async (req, res) => {
        try {
            const data = await SubContractingIssueWorkService.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching records', error });
        }
    },

    getById: async (req, res) => {
        try {
            const { stockId } = req.params;
            const data = await SubContractingIssueWorkService.getById(stockId);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ success: false, message: 'Record not found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching record', error });
        }
    },

    create: async (req, res) => {
        try {
            const data = req.body;
            const newRecord = await SubContractingIssueWorkService.create(data);
            res.status(201).json({ success: true, message: 'Record created successfully', data: newRecord });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error creating record', error });
        }
    },

    update: async (req, res) => {
        try {
            const { stockId } = req.params;
            const data = req.body;
            const updatedRecord = await SubContractingIssueWorkService.update(stockId, data);
            res.status(200).json({ success: true, message: 'Record updated successfully', data: updatedRecord });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error updating record', error });
        }
    },

    delete: async (req, res) => {
        try {
            const { stockId } = req.params;
            await SubContractingIssueWorkService.delete(stockId);
            res.status(200).json({ success: true, message: 'Record deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error deleting record', error });
        }
    }
};

export default SubContractingIssueWorkController;
