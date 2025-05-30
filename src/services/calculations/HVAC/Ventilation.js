const calculateFlowrate = (area, height, acph) => {
    let volume = area * height;
    let flowrate_m3h = volume * acph;
    let flowrate_m3s = flowrate_m3h / 3600;
    return { volume, flowrate_m3s, flowrate_m3h };
  };
  
export const calculateVentilation = (rooms) => {
    return rooms.map((room) => {
      let { volume, flowrate_m3s, flowrate_m3h } = calculateFlowrate(
        room.area,
        room.height,
        room.acph
      );
      let fans = Math.ceil(flowrate_m3h / room.fan_capacity);
      return {
        ...room,
        volume,
        flowrate_m3s,
        flowrate_m3h,
        fans,
        flowrate_per_fan: room.fan_capacity,
        selected_fan_diameter: room.fan_diameter,
      };
    });
  };
  
  