import LocationRepository from '../../../Repository/Global/Location/Location.repository.js';

class LocationService {
    addLocation = (data, callback) => {
        if (!data.locationCode || !data.locationName) {
            callback('Location Code and Location Name are required.');
            return;
        }
        LocationRepository.addLocation(data, callback);
    };

    getAllLocations = (callback) => {
        LocationRepository.getAllLocations(callback);
    };

    getLocationByCode = (locationCode, callback) => {
        if (!locationCode) {
            callback('Location Code is required.');
            return;
        }
        LocationRepository.getLocationByCode(locationCode, callback);
    };

    updateLocationByCode = (locationCode, data, callback) => {
        if (!locationCode) {
            callback('Location Code is required.');
            return;
        }
        LocationRepository.updateLocationByCode(locationCode, data, callback);
    };

    deleteLocationByCode = (locationCode, callback) => {
        if (!locationCode) {
            callback('Location Code is required.');
            return;
        }
        LocationRepository.deleteLocationByCode(locationCode, callback);
    };
}

export default new LocationService();
