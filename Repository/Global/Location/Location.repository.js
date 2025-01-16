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
      INSERT INTO \`Location\` (\`Location Code\`, \`Location Name\`, \`Location Discription\`, \`Departments\`)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      data.locationCode,
      data.locationName,
      data.locationDescription,
      JSON.stringify(data.departments) // Convert departments array to JSON string
    ];
  
    try {
      const [result] = await connection.promise().query(query, values);
      return result.insertId; // Return the inserted ID
    } catch (error) {
      console.error("Error executing query:", error.message);
      throw error; // Throw the error for the caller to handle
    }
  }  
}

export default new LocationRepository();
