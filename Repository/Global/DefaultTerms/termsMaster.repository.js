import connection from "../../../db/connection.js";

const TermsMasterRepository = {
    getAll: async () => {
        const query = "SELECT * FROM `Terms Master`";
        const [rows] = await connection.promise().query(query);
        return rows;
    },

    getById: async (termsId) => {
        const query = "SELECT * FROM `Terms Master` WHERE `TERMS ID` = ?";
        const [rows] = await connection.promise().query(query, [termsId]);
        return rows.length ? rows[0] : null;
    },

    create: async (data) => {
        const query = `
            INSERT INTO \`Terms Master\` 
            (\`TERMS ID\`, \`TERMS TYPE ID\`, \`TERMS TYPE\`, \`LOCATION ID\`, \`TERMS CODE\`, \`TERMS NAME\`, 
             \`TERMS PERIOD\`, \`GRACE PERIOD\`, \`DUE DAYS\`, \`DISCOUNT PERIOD\`, \`INTEREST RATE\`, \`DISCOUNT RATE\`, \`ROW STATUS\`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.termsId, data.termsTypeId, data.termsType, data.locationId, data.termsCode, data.termsName,
            data.termsPeriod, data.gracePeriod, data.dueDays, data.discountPeriod, data.interestRate, data.discountRate, data.rowStatus
        ];
        const [result] = await connection.promise().query(query, values);
        return result;
    },

    update: async (termsId, data) => {
        const query = `
            UPDATE \`Terms Master\` 
            SET \`TERMS TYPE ID\` = ?, \`TERMS TYPE\` = ?, \`LOCATION ID\` = ?, \`TERMS CODE\` = ?, \`TERMS NAME\` = ?, 
                \`TERMS PERIOD\` = ?, \`GRACE PERIOD\` = ?, \`DUE DAYS\` = ?, \`DISCOUNT PERIOD\` = ?, 
                \`INTEREST RATE\` = ?, \`DISCOUNT RATE\` = ?, \`ROW STATUS\` = ?
            WHERE \`TERMS ID\` = ?
        `;
        const values = [
            data.termsTypeId, data.termsType, data.locationId, data.termsCode, data.termsName,
            data.termsPeriod, data.gracePeriod, data.dueDays, data.discountPeriod,
            data.interestRate, data.discountRate, data.rowStatus, termsId
        ];
        const [result] = await connection.promise().query(query, values);
        return result;
    },

    delete: async (termsId) => {
        const query = "DELETE FROM `Terms Master` WHERE `TERMS ID` = ?";
        const [result] = await connection.promise().query(query, [termsId]);
        return result;
    }
};

export default TermsMasterRepository;
