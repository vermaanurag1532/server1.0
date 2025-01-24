import connection from '../../../db/connection.js';

class DepartmentRepository {
    addDepartment = (data, callback) => {
        const query = `
            INSERT INTO \`Department\` (\`Department Code\`, \`Department Name\`, \`Department Discription\`, \`Location Code\`)
            VALUES (?, ?, ?, ?)
        `;
        const params = [data.departmentCode, data.departmentName, data.departmentDescription, data.locationCode];
        connection.query(query, params, callback);
    };

    getAllDepartments = (callback) => {
        const query = 'SELECT * FROM `Department`';
        connection.query(query, callback);
    };

    getDepartmentByCode = (departmentCode, callback) => {
        const query = 'SELECT * FROM `Department` WHERE `Department Code` = ?';
        connection.query(query, [departmentCode], callback);
    };

    updateDepartmentByCode = (departmentCode, data, callback) => {
        const query = `
            UPDATE \`Department\`
            SET \`Department Name\` = COALESCE(?, \`Department Name\`),
                \`Department Discription\` = COALESCE(?, \`Department Discription\`),
                \`Location Code\` = COALESCE(?, \`Location Code\`)
            WHERE \`Department Code\` = ?
        `;
        const params = [
            data.departmentName || null,
            data.departmentDescription || null,
            data.locationCode || null,
            departmentCode,
        ];
        connection.query(query, params, callback);
    };

    deleteDepartmentByCode = (departmentCode, callback) => {
        const query = 'DELETE FROM `Department` WHERE `Department Code` = ?';
        connection.query(query, [departmentCode], callback);
    };
}

export default new DepartmentRepository();
