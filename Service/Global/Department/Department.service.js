import DepartmentRepository from '../../../Repository/Global/Department/Department.repository.js';

class DepartmentService {
    addDepartment = (data, callback) => {
        if (!data.departmentCode || !data.departmentName || !data.locationName) {
            callback('Department Code, Department Name, and Location Code are required.');
            return;
        }
        DepartmentRepository.addDepartment(data, callback);
    };

    getAllDepartments = (callback) => {
        DepartmentRepository.getAllDepartments(callback);
    };

    getDepartmentByCode = (departmentCode, callback) => {
        if (!departmentCode) {
            callback('Department Code is required.');
            return;
        }
        DepartmentRepository.getDepartmentByCode(departmentCode, callback);
    };

    updateDepartmentByCode = (departmentCode, data, callback) => {
        if (!departmentCode) {
            callback('Department Code is required.');
            return;
        }
        DepartmentRepository.updateDepartmentByCode(departmentCode, data, callback);
    };

    deleteDepartmentByCode = (departmentCode, callback) => {
        if (!departmentCode) {
            callback('Department Code is required.');
            return;
        }
        DepartmentRepository.deleteDepartmentByCode(departmentCode, callback);
    };
}

export default new DepartmentService();
