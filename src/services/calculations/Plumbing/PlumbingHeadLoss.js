export const calculatePlumbingHeadloss = ({
  number_of_staff,
  number_of_passenger,
  pd_occupancy,
  station_area_for_cleaning,
  gardening_area,
}) => {
  const raw_staff = number_of_staff * (45 * 0.35);
  const raw_passenger = number_of_passenger * (15 * 0.65);
  const raw_pd_occupancy = pd_occupancy * (45 * 0.35);
  const raw_station_cleaning = station_area_for_cleaning * 1;
  const raw_gardening = gardening_area * 6;
  const raw_total_water_requirement =
    raw_staff +
    raw_passenger +
    raw_pd_occupancy +
    raw_station_cleaning +
    raw_gardening;
  const raw_ug_tank_1_day = raw_total_water_requirement;
  const raw_ug_tank_half_day = raw_total_water_requirement / 2;

  const treated_staff = number_of_staff * (45 * 0.65);
  const treated_passenger = number_of_passenger * (15 * 0.35);
  const treated_pd_occupancy = pd_occupancy * (45 * 0.65);
  const treated_total_water_requirement =
    treated_staff + treated_passenger + treated_pd_occupancy;
  const treated_ug_tank_1_day = treated_total_water_requirement;
  const treated_ug_tank_half_day = treated_total_water_requirement / 2;

  return {
    raw_water_requirement: {
      number_of_staff: raw_staff,
      number_of_passenger: raw_passenger,
      pd_occupancy: raw_pd_occupancy,
      station_area_for_cleaning: raw_station_cleaning,
      gardening_area: raw_gardening,
      total_water_requirement: raw_total_water_requirement,
      ug_water_tank_1_day: raw_ug_tank_1_day,
      ug_water_tank_half_day: raw_ug_tank_half_day,
    },
    treated_water_requirement: {
      number_of_staff: treated_staff,
      number_of_passenger: treated_passenger,
      pd_occupancy: treated_pd_occupancy,
      total_water_requirement: treated_total_water_requirement,
      ug_water_tank_1_day: treated_ug_tank_1_day,
      ug_water_tank_half_day: treated_ug_tank_half_day,
    },
  };
};
