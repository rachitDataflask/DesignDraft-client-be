export const calculateWaterSupplyPipes = (waterSupplyData) => {
  if (!Array.isArray(waterSupplyData) || waterSupplyData.length === 0) {
    throw new Error("Invalid water supply input data. Expected an array.");
  }

  return waterSupplyData.map((supplyData) => {
    let {
      num_wb,
      num_health_faucet,
      num_bib_tap,
      num_service_sink,
      num_kitchen_sink,
      num_water_fountain,
      num_wc,
      num_urinal,
      velocity_domestic,
      velocity_flushing,
    } = supplyData;

    if (
      num_wb === undefined ||
      num_health_faucet === undefined ||
      num_bib_tap === undefined ||
      num_service_sink === undefined ||
      num_kitchen_sink === undefined ||
      num_water_fountain === undefined ||
      num_wc === undefined ||
      num_urinal === undefined ||
      velocity_domestic === undefined ||
      velocity_flushing === undefined
    ) {
      throw new Error("Missing required input values for water supply sizing");
    }

    let wb_domestic = num_wb * 2.0;
    let health_faucet_domestic = num_health_faucet * 1.0;
    let bib_tap_domestic = num_bib_tap * 2.5;
    let service_sink_domestic = num_service_sink * 3.0;
    let kitchen_sink_domestic = num_kitchen_sink * 4.0;
    let water_fountain_domestic = num_water_fountain * 0.5;

    let total_fixture_unit_domestic =
      wb_domestic +
      health_faucet_domestic +
      bib_tap_domestic +
      service_sink_domestic +
      kitchen_sink_domestic +
      water_fountain_domestic;

    let flow_lpm_domestic = 100; // Fixed
    let flow_m3s_domestic = flow_lpm_domestic / 60 / 1000;
    let pipe_size_provided_domestic = flow_lpm_domestic / 2;
    let required_pipe_size_domestic =
      Math.sqrt((flow_m3s_domestic * 4) / (3.14 * velocity_domestic)) * 1000;

    let wc_flushing = num_wc * 5.0;
    let urinal_flushing = num_urinal * 6.0;
    let total_fixture_unit_flushing = wc_flushing + urinal_flushing;

    let flow_lpm_flushing = 150; // Fixed
    let flow_m3s_flushing = flow_lpm_flushing / 60 / 1000;
    let pipe_size_provided_flushing = flow_lpm_flushing / 2;
    let required_pipe_size_flushing =
      Math.sqrt((flow_m3s_flushing * 4) / (3.14 * velocity_flushing)) * 1000;

    return {
      ...supplyData,
      wb_domestic,
      health_faucet_domestic,
      bib_tap_domestic,
      service_sink_domestic,
      kitchen_sink_domestic,
      water_fountain_domestic,
      total_fixture_unit_domestic,
      flow_lpm_domestic,
      flow_m3s_domestic,
      pipe_size_provided_domestic,
      required_pipe_size_domestic,
      wc_flushing,
      urinal_flushing,
      total_fixture_unit_flushing,
      flow_lpm_flushing,
      flow_m3s_flushing,
      pipe_size_provided_flushing,
      required_pipe_size_flushing,
    };
  });
};

