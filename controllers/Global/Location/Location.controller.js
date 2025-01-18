import LocationService from "../../../Service/Global/Location/Location.service.js";

class LocationController {
  async addLocation(req, res) {
    try {
      const locationId = await LocationService.addLocation(req.body);
      return res.status(201).json({ success: true, locationId });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAllLocations(req, res) {
    try {
      const locations = await LocationService.getAllLocations();
      return res.status(200).json(locations);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getLocationByCode(req, res) {
    try {
      const location = await LocationService.getLocationByCode(req.params.code);
      if (!location) {
        return res.status(404).json({ success: false, message: "Location not found" });
      }
      return res.status(200).json(location);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateLocation(req, res) {
    try {
      const updated = await LocationService.updateLocation(req.params.code, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: "Location not found" });
      }
      return res.status(200).json({ success: true, message: "Location updated successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteLocation(req, res) {
    try {
      const deleted = await LocationService.deleteLocation(req.params.code);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Location not found" });
      }
      return res.status(200).json({ success: true, message: "Location deleted successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async addDepartment(req, res) {
    try {
      const locationCode = req.params.code;
      const newDepartment = req.body; 

      if (typeof newDepartment !== "object" || Array.isArray(newDepartment)) {
        return res.status(400).json({
          success: false,
          message: "Invalid department data. Expected an object.",
        });
      }

      const updatedDepartments = await LocationService.addDepartment(locationCode, newDepartment);

      return res.status(200).json({
        success: true,
        message: "Department added successfully",
        departments: updatedDepartments,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new LocationController();
