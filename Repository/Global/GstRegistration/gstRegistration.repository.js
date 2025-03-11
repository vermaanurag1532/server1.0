import connection from "../../../db/connection.js";

const GstRegistrationRepository = {
    getAll: async () => {
        const query = "SELECT * FROM `Gst Registraton Type`";
        const [rows] = await connection.promise().query(query);
        return rows;
    },

    getById: async (configId) => {
        const query = "SELECT * FROM `Gst Registraton Type` WHERE `CONFIG ID` = ?";
        const [rows] = await connection.promise().query(query, [configId]);
        return rows.length ? rows[0] : null;
    },

    create: async (data) => {
        const query = `
            INSERT INTO \`Gst Registraton Type\` 
            (\`CONFIG ID\`, \`CONFIG TYPE\`, \`CONFIG CODE\`, \`CONFIG VALUE\`, \`CONFIG REMARK 1\`, \`CONFIG REMARK 2\`, 
             \`DEPD CONFIG CODE\`, \`DEPD CONFIG ID\`, \`DEPD CONFIG VALUE\`, \`KEYWORDS\`, \`ROW STATUS\`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.configId, data.configType, data.configCode, data.configValue, data.configRemark1, data.configRemark2,
            data.depdConfigCode, data.depdConfigId, data.depdConfigValue, data.keywords, data.rowStatus
        ];
        const [result] = await connection.promise().query(query, values);
        return result;
    },

    update: async (configId, data) => {
        const query = `
            UPDATE \`Gst Registraton Type\` 
            SET \`CONFIG TYPE\` = ?, \`CONFIG CODE\` = ?, \`CONFIG VALUE\` = ?, 
                \`CONFIG REMARK 1\` = ?, \`CONFIG REMARK 2\` = ?, \`DEPD CONFIG CODE\` = ?, 
                \`DEPD CONFIG ID\` = ?, \`DEPD CONFIG VALUE\` = ?, \`KEYWORDS\` = ?, \`ROW STATUS\` = ?
            WHERE \`CONFIG ID\` = ?
        `;
        const values = [
            data.configType, data.configCode, data.configValue, data.configRemark1, data.configRemark2,
            data.depdConfigCode, data.depdConfigId, data.depdConfigValue, data.keywords, data.rowStatus, configId
        ];
        const [result] = await connection.promise().query(query, values);
        return result;
    },

    delete: async (configId) => {
        const query = "DELETE FROM `Gst Registraton Type` WHERE `CONFIG ID` = ?";
        const [result] = await connection.promise().query(query, [configId]);
        return result;
    }
};

export default GstRegistrationRepository;
