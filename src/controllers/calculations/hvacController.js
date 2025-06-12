import { calculateHeatLoad } from "../../services/calculations/HVAC/HeatLoad.js";
import { calculateVentilation } from "../../services/calculations/HVAC/Ventilation.js";

export const calculateHeatLoadHandler = (req, res) => {
  try {
    const inputData = req.body;

    if (!inputData || typeof inputData !== "object") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input data" });
    }

    const result = calculateHeatLoad(inputData);
    console.log("user input---------------------", inputData);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing heat load data",
      error: error.message,
    });
  }
};

export const calculateVentilationHandler = (req, res) => {
  try {
    const rooms = req.body.rooms;
    if (!rooms || !Array.isArray(rooms)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input data" });
    }

    const results = calculateVentilation(rooms);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing data",
      error: error.message,
    });
  }
};
