import connection from '../../../db/connection.js';

class LocationRepository {
    addLocation = (data, callback) => {
        const query = `
            INSERT INTO \`Location\` (\`Location Code\`, \`Location Name\`, \`Location Discription\`)
            VALUES (?, ?, ?)
        `;
        const params = [data.locationCode, data.locationName, data.locationDescription];
        connection.query(query, params, callback);
    };

    getAllLocations = (callback) => {
        const query = 'SELECT * FROM `Location`';
        connection.query(query, callback);
    };

    getLocationByCode = (locationCode, callback) => {
        const query = 'SELECT * FROM `Location` WHERE `Location Code` = ?';
        connection.query(query, [locationCode], callback);
    };

    updateLocationByCode = (locationCode, data, callback) => {
        const query = `
            UPDATE \`Location\`
            SET \`Location Name\` = COALESCE(?, \`Location Name\`),
                \`Location Discription\` = COALESCE(?, \`Location Discription\`)
            WHERE \`Location Code\` = ?
        `;
        const params = [data.locationName || null, data.locationDescription || null, locationCode];
        connection.query(query, params, callback);
    };

    deleteLocationByCode = (locationCode, callback) => {
        const query = 'DELETE FROM `Location` WHERE `Location Code` = ?';
        connection.query(query, [locationCode], callback);
    };
}

export default new LocationRepository();
