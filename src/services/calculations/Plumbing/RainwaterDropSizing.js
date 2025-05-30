export const calculateRainwaterDropSizing = ({
  roof_area_m2,
  num_pipes,
  intensity_rainfall_mm_h,
  coefficient_discharge_c,
}) => {
  if (
    !roof_area_m2 ||
    !num_pipes ||
    !intensity_rainfall_mm_h ||
    !coefficient_discharge_c
  ) {
    throw new Error("Missing required input values");
  }

  // Catchment area per pipe
  const catchment_area_per_pipe_m2 = roof_area_m2 / num_pipes;

  // Discharge flow (m³/hr)
  const discharge_flow_m3_hr =
    (10 *
      num_pipes *
      catchment_area_per_pipe_m2 *
      intensity_rainfall_mm_h *
      coefficient_discharge_c) /
    10000;

  // Pipe diameter (mm)
  const pipe_diameter_mm = Math.pow(
    (catchment_area_per_pipe_m2 * intensity_rainfall_mm_h) / 0.084,
    2 / 5
  );

  return {
    catchment_area_per_pipe_m2,
    discharge_flow_m3_hr,
    pipe_diameter_mm: parseFloat(pipe_diameter_mm.toFixed(2)),
  };
};

