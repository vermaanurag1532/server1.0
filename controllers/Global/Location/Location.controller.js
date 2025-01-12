import LocationService from "../../../Service/Global/Location/Location.service.js";

class LocationController {
  async getAll(req, res) {
    try {
      const locations = await LocationService.getAllLocations();
      res.status(200).json(locations);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getByCode(req, res) {
    try {
      const { code } = req.params;
      const location = await LocationService.getLocationByCode(code);
      if (!location) {
        return res.status(404).json({ success: false, message: "Location not found" });
      }
      res.status(200).json({ success: true, data: location });
    } catch (error) {
      console.error("Error in getByCode:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const data = req.body;
      const createdId = await LocationService.createLocation(data);
      res.status(201).json({ success: true, id: createdId });
    } catch (error) {
      console.error("Error in create:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new LocationController();
