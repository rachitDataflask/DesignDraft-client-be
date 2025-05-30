export const calculateWaterDemand= (waterDemandData) => {
  if (!Array.isArray(waterDemandData) || waterDemandData.length === 0) {
    throw new Error("Invalid water demand input data. Expected an array.");
  }

  return waterDemandData.map((demandData) => {
    let {
      num_staff,
      num_passenger,
      pd_area,
      station_area_cleaning,
      gardening_area,
    } = demandData;

    if (
      num_staff === undefined ||
      num_passenger === undefined ||
      pd_area === undefined ||
      station_area_cleaning === undefined ||
      gardening_area === undefined
    ) {
      throw new Error(
        "Missing required input values for water demand calculation"
      );
    }

    let pd_occupancy = pd_area / 10;

    const water_req_staff = 45;
    const water_req_passenger = 15;
    const water_req_pd_staff = 45;
    const water_req_cleaning = 1;
    const water_req_gardening = 6;

    let staff_raw_water = num_staff * (water_req_staff * 0.35);
    let passenger_raw_water = num_passenger * (water_req_passenger * 0.65);
    let pd_occupancy_raw_water = pd_occupancy * (water_req_pd_staff * 0.35);
    let cleaning_raw_water = station_area_cleaning * water_req_cleaning;
    let gardening_raw_water = gardening_area * water_req_gardening;

    let total_raw_water =
      staff_raw_water +
      passenger_raw_water +
      pd_occupancy_raw_water +
      cleaning_raw_water +
      gardening_raw_water;

    let ug_tank_1day_raw = total_raw_water;
    let ug_tank_halfday_raw = total_raw_water / 2;

    let staff_treated_water = num_staff * (water_req_staff * 0.65);
    let passenger_treated_water = num_passenger * (water_req_passenger * 0.35);
    let pd_occupancy_treated_water = pd_occupancy * (water_req_pd_staff * 0.65);

    let total_treated_water =
      staff_treated_water +
      passenger_treated_water +
      pd_occupancy_treated_water;

    let ug_tank_1day_treated = total_treated_water;
    let ug_tank_halfday_treated = total_treated_water / 2;

    return {
      ...demandData,
      pd_occupancy,
      staff_raw_water,
      passenger_raw_water,
      pd_occupancy_raw_water,
      cleaning_raw_water,
      gardening_raw_water,
      total_raw_water,
      ug_tank_1day_raw,
      ug_tank_halfday_raw,
      staff_treated_water,
      passenger_treated_water,
      pd_occupancy_treated_water,
      total_treated_water,
      ug_tank_1day_treated,
      ug_tank_halfday_treated,
    };
  });
};

