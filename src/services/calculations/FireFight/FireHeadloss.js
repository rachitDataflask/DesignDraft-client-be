export const calculateFireHeadLoss = ({
    pipeDia,
    pipeMaterial,
    pipeLengthHorizontal,
    pipeLengthVertical,
    fittings,
    frictionalLossCoefficient,
    flowrateLpm,
    staticLossMeter,
    staticGainMeter,
  }) => {
    const equivalentLength =
      pipeLengthHorizontal +
      pipeLengthVertical +
      (fittings?.SE90 || 0) +
      (fittings?.SE45 || 0) +
      (fittings?.WE90 || 0) +
      (fittings?.GV || 0) +
      (fittings?.NRV || 0) +
      (fittings?.BFV || 0) +
      (fittings?.GLV || 0) +
      (fittings?.OTHER || 0);
  
    const pressureLossPerMeterBar =
      (6.05 * Math.pow(flowrateLpm, 1.85) * Math.pow(10, 5)) /
      (Math.pow(frictionalLossCoefficient, 1.85) * Math.pow(pipeDia, 4.87));
  
    const pressureLossTotalBar = pressureLossPerMeterBar * equivalentLength;
    const pressureLossTotalMeter =
      (pressureLossTotalBar * Math.pow(10, 5)) / (1000 * 9.81);
  
    const totalPressureLossBar =
      pressureLossTotalBar + staticLossMeter - staticGainMeter;
  
    return {
      pipeDia,
      pipeMaterial,
      pipeLengthHorizontal,
      pipeLengthVertical,
      fittings,
      equivalentLength,
      frictionalLossCoefficient,
      flowrateLpm,
      pressureLossPerMeterBar: pressureLossPerMeterBar.toFixed(6),
      pressureLossTotalBar: pressureLossTotalBar.toFixed(3),
      pressureLossTotalMeter: pressureLossTotalMeter.toFixed(1),
      staticLossMeter,
      staticGainMeter,
      totalPressureLossBar: totalPressureLossBar.toFixed(3),
    };
  };
    