import connection from "../../../db/connection.js";

class LocationRepository {
  async getAll() {
    const query = "SELECT * FROM `Location`";
    const [rows] = await connection.promise().query(query);
    return rows;
  }

  async getByCode(locationCode) {
    const query = "SELECT * FROM `Location` WHERE `Location Code` = ?";
    const [rows] = await connection.promise().query(query, [locationCode]);
    return rows[0];
  }

  async create(data) {
    const query = `
      INSERT INTO \`Location\` (\`Location Code\`, \`Location Name\`, \`Location Discription\`)
      VALUES (?, ?, ?)
    `;
    const values = [data.locationCode, data.locationName, data.locationDescription];
    const [result] = await connection.promise().query(query, values);
    return result.insertId;
  }
}

export default new LocationRepository();
