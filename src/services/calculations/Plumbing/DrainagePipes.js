export const calculateDrainagePipes = (plumbingData) => {
  if (!Array.isArray(plumbingData) || plumbingData.length === 0) {
    throw new Error("Invalid plumbing input data. Expected an array.");
  }

  return plumbingData.map((pipeData) => {
    let {
      num_wb,
      num_health_faucet,
      num_floor_drain,
      num_service_sink,
      num_kitchen_sink,
      num_shower,
      num_wc,
      num_urinal,
      num_urinal_trap,
    } = pipeData;

    if (
      num_wb === undefined ||
      num_health_faucet === undefined ||
      num_floor_drain === undefined ||
      num_service_sink === undefined ||
      num_kitchen_sink === undefined ||
      num_shower === undefined ||
      num_wc === undefined ||
      num_urinal === undefined ||
      num_urinal_trap === undefined
    ) {
      throw new Error("Missing required input values for plumbing sizing");
    }

    let wb_waste = num_wb * 1.0;
    let health_faucet_waste = num_health_faucet * 2.0;
    let floor_drain_waste = num_floor_drain * 2.0;
    let service_sink_waste = num_service_sink * 3.0;
    let kitchen_sink_waste = num_kitchen_sink * 2.0;
    let shower_waste = num_shower * 2.0;

    let total_fixture_unit_waste =
      wb_waste +
      health_faucet_waste +
      floor_drain_waste +
      service_sink_waste +
      kitchen_sink_waste +
      shower_waste;

    let waste_pipe_size_nbc = 100; // mm (NBC Table 20)
    let waste_pipe_slope_nbc = "1:100"; // Fixed as per NBC Table 22
    let waste_velocity_mps = 0.75; // m/s (NBC Table 22)

    let wc_soil = num_wc * 6.0;
    let urinal_soil = num_urinal * 3.0;
    let urinal_trap_soil = num_urinal_trap * 3.0;

    let total_fixture_unit_soil = wc_soil + urinal_soil + urinal_trap_soil;

    let soil_pipe_size_nbc = 150; // mm (NBC Table 20)
    let soil_pipe_slope_nbc = "1:100"; // Fixed as per NBC Table 22
    let soil_velocity_mps = 0.75; // m/s (NBC Table 22)

    return {
      ...pipeData,
      wb_waste,
      health_faucet_waste,
      floor_drain_waste,
      service_sink_waste,
      kitchen_sink_waste,
      shower_waste,
      total_fixture_unit_waste,
      waste_pipe_size_nbc,
      waste_pipe_slope_nbc,
      waste_velocity_mps,
      wc_soil,
      urinal_soil,
      urinal_trap_soil,
      total_fixture_unit_soil,
      soil_pipe_size_nbc,
      soil_pipe_slope_nbc,
      soil_velocity_mps,
    };
  });
};

