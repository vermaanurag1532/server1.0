import LocationRepository from "../../../Repository/Global/Location/Location.repository.js";

class LocationService {
  // Add a new location
  async addLocation(locationData) {
    return await LocationRepository.add(locationData);
  }

  // Get all locations
  async getAllLocations() {
    return await LocationRepository.getAll();
  }

  // Get location by code
  async getLocationByCode(locationCode) {
    return await LocationRepository.getByCode(locationCode);
  }

  // Update a location by code
  async updateLocation(locationCode, updateData) {
    return await LocationRepository.updateByCode(locationCode, updateData);
  }

  // Delete a location by code
  async deleteLocation(locationCode) {
    return await LocationRepository.deleteByCode(locationCode);
  }

  // Add a department to the existing departments
  async addDepartment(locationCode, newDepartment) {
    try {
      console.log('Adding department for location:', locationCode); // Log location code
      console.log('New department data:', newDepartment); // Log new department
      
      // 1. Get existing departments
      const existingDepartments = await LocationRepository.getDepartmentsByCode(locationCode);
      console.log('Existing departments:', existingDepartments); // Log existing departments
      
      // 2. Ensure we have an array
      const departments = Array.isArray(existingDepartments) ? existingDepartments : [];
      
      // 3. Validate new department
      if (!newDepartment || typeof newDepartment !== 'object') {
        throw new Error('Invalid department data');
      }

      // 4. Check for duplicate ID
      if (newDepartment.id && departments.some(dept => dept.id === newDepartment.id)) {
        throw new Error('Department with this ID already exists');
      }

      // 5. Add new department to array
      departments.push(newDepartment);
      console.log('Combined departments:', departments); // Log combined departments

      // 6. Update database
      const result = await LocationRepository.updateDepartments(locationCode, departments);
      console.log('Update result:', result); // Log update result

      return departments;
    } catch (error) {
      console.error('Error in addDepartment:', error);
      throw error;
    }
  }
}

export default new LocationService();
