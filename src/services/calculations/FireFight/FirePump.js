export const calculateFirePump = (data) => {
    return data.map((station) => {
      let {
        station_area,
        total_pd_area,
        station_height,
        flowrate_lpm,
        pipe_material,
        friction_loss_coefficient,
        pipe_dia,
        residual_head,
        total_pressure_loss,
        efficiency,
      } = station;
  
      let flowrate_m3s = flowrate_lpm / 1000 / 60;
      let total_head = residual_head + total_pressure_loss;
      let efficiency_decimal = parseFloat(efficiency) / 100;
      let pump_capacity_watts =
        total_head * flowrate_m3s * 1000 * 9.81 * efficiency_decimal;
      let pump_capacity_hp = pump_capacity_watts / 1000 / 0.745;
      let pump_capacity_kw = pump_capacity_hp * 0.745;
  
      return {
        station_area,
        total_pd_area,
        station_height,
        flowrate_lpm,
        flowrate_m3s,
        pipe_material,
        friction_loss_coefficient,
        pipe_dia,
        residual_head,
        total_pressure_loss,
        total_head,
        efficiency,
        pump_capacity_watts,
        pump_capacity_hp,
        pump_capacity_kw,
      };
    });
  };  