const { WaterMeasurement } = require('@prisma/client');

module.exports.getWaterMeasurement = (measurement) => {

  switch (measurement) {
    case "cups":
      return WaterMeasurement.CUPS;
    case "ounces":
      return WaterMeasurement.OUNCES;
    default:
      return WaterMeasurement.CUPS;
  }
}
