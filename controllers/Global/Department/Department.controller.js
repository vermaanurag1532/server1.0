import DepartmentService from '../../../Service/Global/Department/Department.service.js';

const DepartmentController = {
    addDepartment: (req, res) => {
        DepartmentService.addDepartment(req.body, (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            res.status(201).json({ success: true, message: 'Department added successfully.', data: result });
        });
    },

    getAllDepartments: (req, res) => {
        DepartmentService.getAllDepartments((err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error retrieving departments.' });
            }
            res.status(200).json(result);
        });
    },

    getDepartmentByCode: (req, res) => {
        const departmentCode = req.params.departmentCode;
        DepartmentService.getDepartmentByCode(departmentCode, (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            res.status(200).json(result);
        });
    },

    updateDepartmentByCode: (req, res) => {
        const departmentCode = req.params.departmentCode;
        DepartmentService.updateDepartmentByCode(departmentCode, req.body, (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            res.status(200).json({ success: true, message: 'Department updated successfully.', data: result });
        });
    },

    deleteDepartmentByCode: (req, res) => {
        const departmentCode = req.params.departmentCode;
        DepartmentService.deleteDepartmentByCode(departmentCode, (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            res.status(200).json({ success: true, message: 'Department deleted successfully.', data: result });
        });
    },
};

export default DepartmentController;
