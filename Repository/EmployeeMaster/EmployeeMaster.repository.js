import connection from '../../db/connection.js';

const EmployeeMasterRepository = {
    getAllEmployees: async () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `Employee Master`', (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getEmployeeByCode: async (employeeCode) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `Employee Master` WHERE `Employee Code` = ?', 
            [employeeCode], 
            (err, results) => {
                if (err) reject(err);
                else resolve(results[0] || null);
            });
        });
    },

    createEmployee: async (employeeData) => {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO \`Employee Master\` 
                (\`Employee Code\`, \`Employee Name\`, \`Employee Type\`, \`Default Location\`, \`Default Department\`, 
                \`Location\`, \`Can Change Global Setting\`, \`Login Name\`, \`PF Account No\`, \`ESIC No\`, 
                \`Row Status\`, \`Remark\`, \`Grade\`, \`Weighter Name\`, \`Password\`, \`Password Expired\`, 
                \`Is Locked\`, \`No of Failed Attempts\`, \`Password Expires on\`, \`Allow Access From Main URL\`, 
                \`Emergency Contact Name\`, \`Emergency Contact\`, \`Salary Instr\`, \`Account Name\`, \`Last Login Date\`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            connection.query(sql, employeeData, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    updateEmployee: async (employeeCode, updatedData) => {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE \`Employee Master\` SET
                \`Employee Name\` = ?, \`Employee Type\` = ?, \`Default Location\` = ?, \`Default Department\` = ?,
                \`Location\` = ?, \`Can Change Global Setting\` = ?, \`Login Name\` = ?, \`PF Account No\` = ?, 
                \`ESIC No\` = ?, \`Row Status\` = ?, \`Remark\` = ?, \`Grade\` = ?, \`Weighter Name\` = ?, 
                \`Password\` = ?, \`Password Expired\` = ?, \`Is Locked\` = ?, \`No of Failed Attempts\` = ?, 
                \`Password Expires on\` = ?, \`Allow Access From Main URL\` = ?, \`Emergency Contact Name\` = ?, 
                \`Emergency Contact\` = ?, \`Salary Instr\` = ?, \`Account Name\` = ?, \`Last Login Date\` = ?
                WHERE \`Employee Code\` = ?
            `;

            connection.query(sql, [...updatedData, employeeCode], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    deleteEmployee: async (employeeCode) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM `Employee Master` WHERE `Employee Code` = ?', 
            [employeeCode], 
            (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getEmployeeByLoginAndPassword: async (loginName, password) => {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM `Employee Master` WHERE `Login Name` = ? AND `Password` = ?',
                [loginName, password],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0] || null);
                }
            );
        });
    }
};

export default EmployeeMasterRepository;
