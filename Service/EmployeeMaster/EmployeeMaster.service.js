import EmployeeMasterRepository from '../../Repository/EmployeeMaster/EmployeeMaster.repository.js';

const EmployeeMasterService = {
    getAllEmployees: async () => {
        return await EmployeeMasterRepository.getAllEmployees();
    },

    getEmployeeByCode: async (employeeCode) => {
        return await EmployeeMasterRepository.getEmployeeByCode(employeeCode);
    },

    createEmployee: async (employeeData) => {
        return await EmployeeMasterRepository.createEmployee(employeeData);
    },

    updateEmployee: async (employeeCode, employeeData) => {
        return await EmployeeMasterRepository.updateEmployee(employeeCode, employeeData);
    },

    deleteEmployee: async (employeeCode) => {
        return await EmployeeMasterRepository.deleteEmployee(employeeCode);
    }
};

export default EmployeeMasterService;
