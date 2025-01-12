import LocationRepository from "../../../Repository/Global/Location/Location.repository.js";

class LocationService {
  async getAllLocations() {
    return await LocationRepository.getAll();
  }

  async getLocationByCode(locationCode) {
    return await LocationRepository.getByCode(locationCode);
  }

  async createLocation(data) {
    if (!data.locationCode || !data.locationName) {
      throw new Error("Mandatory fields are missing!");
    }
    return await LocationRepository.create(data);
  }
}

export default new LocationService();
