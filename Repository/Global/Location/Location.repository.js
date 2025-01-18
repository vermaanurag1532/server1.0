import connection from "../../../db/connection.js";

class LocationRepository {
  // Add a new location
  async add(locationData) {
    const query = `
      INSERT INTO \`Location\` (\`Location Code\`, \`Location Name\`, \`Location Discription\`, \`Departments\`)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      locationData.locationCode,
      locationData.locationName,
      locationData.locationDescription,
      JSON.stringify(locationData.departments || []),
    ];
    const [result] = await connection.promise().query(query, values);
    return result.insertId;
  }

  // Get all locations
  async getAll() {
    const query = "SELECT * FROM \`Location\`";
    const [rows] = await connection.promise().query(query);
    return rows;
  }

  // Get location by code
  async getByCode(locationCode) {
    const query = "SELECT * FROM \`Location\` WHERE \`Location Code\` = ?";
    const [rows] = await connection.promise().query(query, [locationCode]);
    return rows[0];
  }

  // Update a location by code
  async updateByCode(locationCode, updateData) {
    const query = `
      UPDATE \`Location\`
      SET ${Object.keys(updateData)
        .map((key) => `\`${key}\` = ?`)
        .join(", ")}
      WHERE \`Location Code\` = ?
    `;
    const values = [...Object.values(updateData), locationCode];
    const [result] = await connection.promise().query(query, values);
    return result.affectedRows > 0;
  }

  // Delete location by code
  async deleteByCode(locationCode) {
    const query = "DELETE FROM \`Location\` WHERE \`Location Code\` = ?";
    const [result] = await connection.promise().query(query, [locationCode]);
    return result.affectedRows > 0;
  }

  async getDepartmentsByCode(locationCode) {
    const query = "SELECT `Departments` FROM `Location` WHERE `Location Code` = ?";
    const [rows] = await connection.promise().query(query, [locationCode]);
    
    console.log('Raw database response:', rows[0]); // Log raw response
    
    if (!rows[0]) {
      console.log('No rows found for location code:', locationCode);
      return [];
    }

    try {
      const departmentsData = rows[0].Departments;
      console.log('Raw departments data:', departmentsData); // Log raw departments data
      
      if (!departmentsData) {
        console.log('No departments data found');
        return [];
      }

      // Handle different data types
      let departmentsStr;
      if (departmentsData instanceof Buffer) {
        departmentsStr = departmentsData.toString('utf8');
      } else if (typeof departmentsData === 'string') {
        departmentsStr = departmentsData;
      } else if (typeof departmentsData === 'object') {
        departmentsStr = JSON.stringify(departmentsData);
      }

      console.log('Departments string before parsing:', departmentsStr); // Log string before parsing
      
      const parsed = JSON.parse(departmentsStr || '[]');
      console.log('Parsed departments:', parsed); // Log parsed result
      
      return parsed;
    } catch (error) {
      console.error('Error parsing departments:', error);
      return [];
    }
  }

  async updateDepartments(locationCode, departments) {
    try {
      console.log('Updating departments for location:', locationCode); // Log location code
      console.log('New departments data:', departments); // Log new departments
      
      // Ensure we're working with a valid array
      const departmentsArray = Array.isArray(departments) ? departments : [departments];
      
      // Convert to JSON string
      const departmentsJson = JSON.stringify(departmentsArray);
      console.log('JSON to be stored:', departmentsJson); // Log JSON string

      const query = "UPDATE `Location` SET `Departments` = ? WHERE `Location Code` = ?";
      const [result] = await connection.promise().query(query, [departmentsJson, locationCode]);
      
      console.log('Update result:', result); // Log update result
      
      if (result.affectedRows === 0) {
        throw new Error('Location not found');
      }

      return true;
    } catch (error) {
      console.error('Error updating departments:', error);
      throw error;
    }
  }
}

export default new LocationRepository();
