/******COMMON FUNCTIONS **********/
// Most types classes use each of these functions, but none are used in all classes (otherwise they would be in osgunits-gen.js)

// parseArguments is a private helper function for all osgunits which parses user input arguments
const parseArguments = function (v, u) {
  // handle single object parameter, e.g. set({'value': 10, 'unit': 'mph', 'display ': '10 mph'})
  if (typeof v === "object" && typeof u === "undefined") {
    // if v is '{}' return '{}'
    if (Object.keys(v).length === 0 && v.constructor === Object) {
      return {};
    } else if (
      (Object.keys(v).length === 2 || Object.keys(v).length === 3) &&
      "value" in v &&
      "unit" in v
    ) {
      return { v: v.value, u: v.unit };
    } else {
      throw Error(
        "Invalid object format. Expecting {'value': 10, 'unit': 'mph', 'display ': '10 mph'} or {'value': 10, 'unit': 'mph'}"
      );
    }
    // handle number with no unit, 'e.g. set(10)'
  } else if (typeof v === "number" && typeof u === "undefined") {
    return { v: v };
    // handle single string parameter, e.g. set('10<unit>')
  } else if (typeof v === "string" && typeof u === "undefined") {
    const match_ret = v.trim().match(/^([0-9-+.]+)\s*([a-zA-Z0-9^/]+)\s*$/);
    if (match_ret !== null && match_ret.length > 2) {
      return { v: parseFloat(match_ret[1]), u: match_ret[2] };
    } else {
      throw Error(
        "Invalid string format provided. Expecting '10mph' or '10 mph'"
      );
    }
    // handle number, string case, e.g. set(10, '<unit>')
  } else if (typeof v === "number" && typeof u === "string") {
    return { v: v, u: u.trim() };
  } else {
    throw Error("Invalid value or unit provided");
  }
};

// toUnit returns a new object with value converted to given unit\n
const toUnit = function (unit) {
  if (!this.isValidUnit(this.unit) || !this.isValidUnit(unit)) {
    throw Error("Present or provided unit is invalid");
  } else {
    return new this.constructor(
      this.value * this.getConversionMultiplier(this.unit, unit),
      unit
    );
  }
};

// updateDisplay will set 'display' string in format '<value> <unit>'"
const updateDisplay = function () {
  this.display = `${this.value} ${this.unit}`;
};

// roundDisplay returns the display string with the number value rounded to given decimal places
// isEmpty returns true if value, unit, and display are null
// if dec_places arg is invalid, displayRounded will default to 0 decimal places
const displayRounded = function (dec_places) {
  const num = Number(
    Math.round(this.value + "e" + dec_places) + "e-" + dec_places
  ).toFixed(dec_places);
  return `${num} ${this.unit}`;
};

/******Custom Speed functions**********/
module.exports.CustomSpeedFunctions = {
  parseArguments: parseArguments,
  toUnit: toUnit,
  updateDisplay: updateDisplay,
  displayRounded: displayRounded
};

/******Custom Distance functions**********/
module.exports.CustomDistanceFunctions = {
  parseArguments: parseArguments,
  toUnit: toUnit,
  updateDisplay: updateDisplay,
  displayRounded: displayRounded
};

/******Custom Duration functions**********/

// parseDurationArguments is a helper function for duration units that parses given arguments
const parseDurationArguments = function (v, u) {
  // handle single object parameter, e.g. set({'value': 10, 'unit': 'm', 'display ': '10m'})
  if (typeof v === "object" && typeof u === "undefined") {
    // if v is '{}' return '{}'
    if (Object.keys(v).length === 0 && v.constructor === Object) {
      return {};
    } else if (
      (Object.keys(v).length === 2 || Object.keys(v).length === 3) &&
      "value" in v &&
      "unit" in v
    ) {
      return { v: v.value, u: v.unit };
    } else {
      throw Error(
        "Invalid Duration object format. Expecting {'value': 10, 'unit': 'm', 'display ': '10m'}"
      );
    }
    // handle number with no unit, 'e.g. set(10)'
  } else if (typeof v === "number" && typeof u === "undefined") {
    return { v: v };
    // handle single string parameter for duration, e.g. '10h2m3.4s' or '2.4m'
    // unit of resulting duration will be set to largest unit given (e.g. '10h2m3.4s' will have an hour unit, '2.4m' will have a minute unit)
  } else if (typeof v === "string" && typeof u === "undefined") {
    const match_ret_hms = v
      .trim()
      .match(/^([0-9-+.]+h)?\s*([0-9-+.]+m)?\s*([0-9-+.]+s)?\s*$/);
    if (match_ret_hms !== null && match_ret_hms.length >= 4) {
      let duration_value = 0;
      let duration_unit;
      if (match_ret_hms[1] != null) {
        duration_unit = "h";
        duration_value += parseFloat(match_ret_hms[1].split("h")[0]);
        if (match_ret_hms[2] != null) {
          duration_value += parseFloat(match_ret_hms[2].split("m")[0] / 60);
        }
        if (match_ret_hms[3] != null) {
          duration_value += parseFloat(match_ret_hms[3].split("s")[0] / 3600);
        }
      } else if (match_ret_hms[2] != null) {
        duration_unit = "m";
        duration_value += parseFloat(match_ret_hms[2].split("m")[0]);
        if (match_ret_hms[3] != null) {
          duration_value += parseFloat(match_ret_hms[3].split("s")[0] / 60);
        }
      } else if (match_ret_hms[3] != null) {
        duration_unit = "s";
        duration_value += parseFloat(match_ret_hms[3].split("s")[0]);
      }
      return { v: duration_value, u: duration_unit };
    }
    //check case of ms
    const match_ret_ms = v.trim().match(/^([0-9-+.]+ms)\s*$/);
    if (match_ret_ms != null && match_ret_ms.length >= 2) {
      const duration_unit = "ms";
      const duration_value = parseFloat(match_ret_ms[1].split("ms")[0]);
      return { v: duration_value, u: duration_unit };
    }
    throw Error(
      "Invalid string format provided. Expecting '10h3m2.5s' or '10m'"
    );
    // handle number, string case, e.g. set(10, '<unit>')
  } else if (typeof v === "number" && typeof u === "string") {
    return { v: v, u: u.trim() };
  } else {
    throw Error("Invalid value or unit provided");
  }
};

// updateDurationDisplay will display value/unit in readable duration format, e.g. 5h 3m 23s
const updateDurationDisplay = function () {
  const sign = this.value < 0 ? "-" : "";
  const abs_value = Math.abs(this.value);
  if (this.unit === "h") {
    this.display = `${sign}${Math.floor(abs_value)}h ${Math.floor(
      (abs_value % 1) * 60
    )}m ${Math.round((((abs_value % 1) * 60) % 1) * 60)}s`;
  } else if (this.unit === "m") {
    this.display = `${sign}${Math.floor(abs_value)}m ${Math.round(
      (abs_value % 1) * 60
    )}s`;
  } else if (this.unit === "s") {
    this.display = `${sign}${Math.round(abs_value)}s`;
  } else if (this.unit === "ms") {
    this.display = `${sign}${Math.round(abs_value)}ms`;
  } else {
    throw Error("Invalid unit");
  }
};

// duration does not have a displayRounded function
module.exports.CustomDurationFunctions = {
  toUnit: toUnit,
  updateDisplay: updateDurationDisplay,
  parseArguments: parseDurationArguments
};

/******Custom Pressure functions**********/
module.exports.CustomPressureFunctions = {
  parseArguments: parseArguments,
  toUnit: toUnit,
  updateDisplay: updateDisplay,
  displayRounded: displayRounded
};

/******Custom FuelRate functions**********/
module.exports.CustomFuelRateFunctions = {
  parseArguments: parseArguments,
  toUnit: toUnit,
  updateDisplay: updateDisplay,
  displayRounded: displayRounded
};

/******Custom Acceleration functions**********/
module.exports.CustomAccelerationFunctions = {
  parseArguments: parseArguments,
  toUnit: toUnit,
  updateDisplay: updateDisplay,
  displayRounded: displayRounded
};

/******Custom Temperature functions**********/
const toUnitTemperature = function (unit) {
  // invalid current or argument unit throws error
  if (!this.isValidUnit(this.unit) || !this.isValidUnit(unit)) {
    throw Error("Present or provided unit is invalid");
  }

  // no conversion needed
  if (this.unit === unit) {
    return this;
  }

  // c -> f
  // °F = (°C × 9/5) + 32
  if (this.unit === "c") {
    return new this.constructor(this.value * (9 / 5) + 32, "f");
  }

  // f -> c
  // °C = (°F − 32) x 5/9
  return new this.constructor((this.value - 32) * (5 / 9), "c");
};

// updateTemperatureDisplay will set 'display' string in format '10°F'
const updateTemperatureDisplay = function () {
  this.display = `${this.value}°${this.unit.toUpperCase()}`;
};

// parseTemperatureArguments handles parsing of unique format of temperature strings (uppercase unit and ° symbol)
const parseTemperatureArguments = function (v, u) {
  if (typeof v === "string" && typeof u === "undefined") {
    return parseArguments(v.replace("°", "").toLowerCase(), u);
  }
  return parseArguments(v, u);
};

// displayRoundedTemperature returns string rounded to given decimal places, in temperature format '10°F'
const displayRoundedTemperature = function (dec_places) {
  const num = Number(
    Math.round(this.value + "e" + dec_places) + "e-" + dec_places
  ).toFixed(dec_places);
  return `${num}°${this.unit.toUpperCase()}`;
};

module.exports.CustomTemperatureFunctions = {
  toUnit: toUnitTemperature,
  updateDisplay: updateTemperatureDisplay,
  displayRounded: displayRoundedTemperature,
  parseArguments: parseTemperatureArguments
};

/******Custom FlowRate functions**********/
module.exports.CustomFlowRateFunctions = {
  toUnit: toUnit,
  updateDisplay: updateDisplay,
  displayRounded: displayRounded,
  parseArguments: parseArguments,
};

/******Custom Volume functions**********/
module.exports.CustomVolumeFunctions= {
  toUnit: toUnit,
  updateDisplay: updateDisplay,
  displayRounded: displayRounded,
  parseArguments: parseArguments,
};

/******Custom EVConsumption functions**********/
module.exports.CustomEVConsumptionFunctions= {
  toUnit: toUnit,
  updateDisplay: updateDisplay,
  displayRounded: displayRounded,
  parseArguments: parseArguments,
};