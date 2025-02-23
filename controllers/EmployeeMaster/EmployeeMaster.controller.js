import EmployeeMasterService from '../../Service/EmployeeMaster/EmployeeMaster.service.js';

const EmployeeMasterController = {
    getAllEmployees: async (req, res) => {
        try {
            const employees = await EmployeeMasterService.getAllEmployees();
            res.json(employees);
        } catch (err) {
            res.status(500).json({ error: 'Database error', details: err.message });
        }
    },

    getEmployeeByCode: async (req, res) => {
        try {
            const employee = await EmployeeMasterService.getEmployeeByCode(req.params.code);
            res.json(employee);
        } catch (err) {
            res.status(500).json({ error: 'Database error', details: err.message });
        }
    },

    createEmployee: async (req, res) => {
        try {
            const employeeData = [
                req.body.employeeCode,
                req.body.employeeName,
                req.body.employeeType,
                req.body.defaultLocation || '',
                req.body.defaultDepartment || '',
                JSON.stringify(req.body.location || {}),  // Ensure JSON format
                req.body.canChangeGlobalSetting ? 1 : 0,
                req.body.loginName || '',
                req.body.pfAccountNo || '',
                req.body.esicNo || '',
                req.body.rowStatus || '',
                req.body.remark || '',
                req.body.grade || '',
                req.body.weighterName || '',
                req.body.password || '',
                req.body.passwordExpired ? 1 : 0,
                req.body.isLocked ? 1 : 0,
                req.body.noOfFailedAttempts || 0,
                req.body.passwordExpiresOn || null,
                req.body.allowAccessFromMainURL ? 1 : 0,
                req.body.emergencyContactName || '',
                req.body.emergencyContact || '',
                req.body.salaryInstr || '',
                req.body.accountName || '',
                req.body.lastLoginDate || null
            ];
    
            await EmployeeMasterService.createEmployee(employeeData);
            res.status(201).json({ message: 'Employee added successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Database error', details: err.message });
        }
    },
    

    updateEmployee: async (req, res) => {
        try {
            await EmployeeMasterService.updateEmployee(req.params.code, Object.values(req.body));
            res.json({ message: 'Employee updated successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Database error', details: err.message });
        }
    },

    deleteEmployee: async (req, res) => {
        try {
            await EmployeeMasterService.deleteEmployee(req.params.code);
            res.json({ message: 'Employee deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Database error', details: err.message });
        }
    },

    authenticateEmployee: async (req, res) => {
        try {
            const { loginName, password } = req.body;
            if (!loginName || !password) {
                return res.status(400).json({ error: 'Login name and password are required' });
            }

            const employee = await EmployeeMasterService.authenticateEmployee(loginName, password);
            res.json(employee);
        } catch (err) {
            res.status(401).json({ error: 'Authentication failed', details: err.message });
        }
    }
    
};

export default EmployeeMasterController;
