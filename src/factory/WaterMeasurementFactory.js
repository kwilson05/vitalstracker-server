const { WaterMeasurement } = require('@prisma/client');

module.exports.getWaterMeasurement = (measurementString) => {

  switch (measurementString) {
    case "cups":
      return WaterMeasurement.CUPS;
    case "ounces":
      return WaterMeasurement.OUNCES;
    default:
      return WaterMeasurement.CUPS;
  }
}

module.exports.getWaterMeasurementString = (measurement) => {
  switch (measurement) {
    case WaterMeasurement.CUPS:
      return WaterMeasurement.CUPS.toString();
    case WaterMeasurement.OUNCES:
      return WaterMeasurement.OUNCES.toString();
    default:
      return WaterMeasurement.CUPS.toString();
  }
}
