export const calculatePlumbingPump = ({
  totalWater,
  fillingTime,
  stationHeight,
  pipeMaterial,
  frictionalLossCoefficient,
  pipeDia,
  residualHead,
  totalPressureLoss,
  efficiency,
}) => {
  const flowrateLpm = totalWater / fillingTime;
  const flowrateM3s = flowrateLpm / 1000 / 60;
  const efficiencyDecimal = efficiency / 100;
  const totalHead = residualHead + totalPressureLoss;
  const pumpCapacityWatts =
    totalHead * flowrateM3s * 1000 * 9.81 * efficiencyDecimal;
  const pumpCapacityHP = pumpCapacityWatts / 1000 / 0.745;
  const pumpCapacityKW = pumpCapacityHP * 0.745;

  return {
    totalWaterToBePumped: totalWater,
    fillingTime,
    stationHeight,
    flowrateLpm,
    flowrateM3s,
    pipeMaterial,
    frictionalLossCoefficient,
    pipeDia,
    residualHead,
    totalPressureLoss,
    totalHead,
    efficiency: `${efficiency}%`,
    pumpCapacityWatts: pumpCapacityWatts.toFixed(2),
    pumpCapacityHP: pumpCapacityHP.toFixed(2),
    pumpCapacityKW: pumpCapacityKW.toFixed(2),
  };
};

