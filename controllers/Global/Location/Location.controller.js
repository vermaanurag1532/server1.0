import LocationService from '../../../Service/Global/Location/Location.service.js';

const LocationController = {
    addLocation: (req, res) => {
        LocationService.addLocation(req.body, (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            res.status(201).json({ success: true, message: 'Location added successfully.', data: result });
        });
    },

    getAllLocations: (req, res) => {
        LocationService.getAllLocations((err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error retrieving locations.' });
            }
            res.status(200).json(result);
        });
    },

    getLocationByCode: (req, res) => {
        const locationCode = req.params.locationCode;
        LocationService.getLocationByCode(locationCode, (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            res.status(200).json(result);
        });
    },

    updateLocationByCode: (req, res) => {
        const locationCode = req.params.locationCode;
        LocationService.updateLocationByCode(locationCode, req.body, (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            res.status(200).json({ success: true, message: 'Location updated successfully.', data: result });
        });
    },

    deleteLocationByCode: (req, res) => {
        const locationCode = req.params.locationCode;
        LocationService.deleteLocationByCode(locationCode, (err, result) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            res.status(200).json({ success: true, message: 'Location deleted successfully.', data: result });
        });
    },
};

export default LocationController;
