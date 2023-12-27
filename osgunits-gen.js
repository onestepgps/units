// GENERATED BY types-fast-mk.go DO NOT EDIT!  USE `go generate`

const {CustomSpeedFunctions} = require('./osgunits-custom.js');

const speed_unit_conv_table = {
	'cm/s': {
		'cm/s' : 1, // cm/s -> cm/s
		'm/s' : 0.01, // cm/s -> m/s
		'km/h' : 0.036, // cm/s -> km/h
		'mph' : 0.0223694, // cm/s -> mph
	},
	'm/s': {
		'cm/s' : 100, // m/s -> cm/s
		'm/s' : 1, // m/s -> m/s
		'km/h' : 3.5999999999999996, // m/s -> km/h
		'mph' : 2.23694, // m/s -> mph
	},
	'km/h': {
		'cm/s' : 27.77777777777778, // km/h -> cm/s
		'm/s' : 0.2777777777777778, // km/h -> m/s
		'km/h' : 1, // km/h -> km/h
		'mph' : 0.6213722222222222, // km/h -> mph
	},
	'mph': {
		'cm/s' : 44.703925898772425, // mph -> cm/s
		'm/s' : 0.4470392589877243, // mph -> m/s
		'km/h' : 1.6093413323558072, // mph -> km/h
		'mph' : 0.9999999999999999, // mph -> mph
	},
};

class Speed {
	constructor(v, u) {
		this.set(v, u);
	}

	// set will set value and unit to provided parameters
	// format can be set({'value': 10, 'unit': '<unit>', 'display': '10 <unit>'}), set('10 <unit>'), set(10, '<unit>'), and set(10)
	set(v, u) {
		const parsedArgs = this.parseArguments(v, u);
		// handles empty values, if parsedArgs is {}, set to this to {}
		if (
			Object.keys(parsedArgs).length === 0 &&
			parsedArgs.constructor === Object
		) {
			delete this.value;
			delete this.unit;
			delete this.display;
			return this;
		}

		// handles set(20), value without unit. Uses current unit if it exists, otherwise error is thrown
		if (typeof parsedArgs.u === 'undefined') {
			if (typeof this.unit !== 'undefined') {
				parsedArgs.u = this.unit;
			} else {
				throw Error('Speed has no set unit or unit argument');
			}
		}

		this.value =
			typeof parsedArgs.v === 'number' && !Number.isNaN(parsedArgs.v)
				? parsedArgs.v
				: null;
		this.unit =
			typeof parsedArgs.u === 'string' && parsedArgs.u in speed_unit_conv_table
				? parsedArgs.u
				: null;
		this.updateDisplay();

		if (!this.isValid() && !this.isEmpty()) {
			throw Error('Invalid value or unit provided');
		}
		return this
	}

	// add will return a new Speed with the results of the addition between the given Speed argument and this. The original Speed will be unmodified
	// the provided Speed argument will be converted to this.unit so that Speed of different units can be added
	// can receive four possible formats that are supported by the set function
	add(v, u) {
		const add_speed =
			typeof v === 'number' && typeof u === 'undefined'
				? new Speed(v, this.unit)
				: new Speed(v, u).toUnit(this.unit);
		if (this.isValid() && add_speed.isValid()) {
			return new Speed(this.value + add_speed.value, this.unit);
		} else {
			throw Error('Both speeds must be valid to use add()');
		}
	}

	// Cmp returns -1 for less than, 1 for greater than, 0 for equal.
	cmp(v, u) {
		const cmp_speed =
			typeof v === 'number' && typeof u === 'undefined'
				? new Speed(v, this.unit)
				: new Speed(v, u).toUnit(this.unit);
		if (this.isValid() && cmp_speed.isValid()) {
			if (this.value < cmp_speed.value) {
				return -1;
			}
			if (this.value > cmp_speed.value) {
				return 1;
			}
			return 0;
		} else {
			throw Error('Both speeds must be valid to use cmp()');
		}
	}

	// isValid returns true if the value is a Number, the value is finite, and the unit is valid
	isValid() {
		return (
			typeof this.value === 'number' &&
			Number.isFinite(this.value) &&
			this.unit in speed_unit_conv_table &&
			typeof this.display === 'string' &&
			this.display !== ''
		);
	}

	// isEmpty returns true if value, unit, and display are null
	isEmpty() {
		return this.value == null && this.unit == null && this.display == null;
	}

	// isValidUnit checks if unit is a unit present in the conversion table
	isValidUnit(unit) {
		return unit in speed_unit_conv_table
	}

	// getConversionMultiplier returns conversion multiplier for given units
	// used as a way to access conversion table without making table itself public
	getConversionMultiplier(fromUnit, toUnit) {
		return speed_unit_conv_table[fromUnit][toUnit];
	}

	// round() returns a Speed object with the value rounded to the given number of decimal places 
	round(decimal_places) {
		return new Speed(this.displayRounded(decimal_places))
	}

}
Object.assign(Speed.prototype, CustomSpeedFunctions);
module.exports.Speed = Speed;

const {CustomDistanceFunctions} = require('./osgunits-custom.js');

const distance_unit_conv_table = {
	'm': {
		'm' : 1, // m -> m
		'km' : 0.001, // m -> km
		'mi' : 0.000621371, // m -> mi
		'cm' : 100, // m -> cm
		'mm' : 1000, // m -> mm
		'in' : 39.37007874, // m -> in
		'ft' : 3.28084, // m -> ft
	},
	'km': {
		'm' : 1000, // km -> m
		'km' : 1, // km -> km
		'mi' : 0.621371, // km -> mi
		'cm' : 100000, // km -> cm
		'mm' : 1e+06, // km -> mm
		'in' : 39370.07874, // km -> in
		'ft' : 3280.84, // km -> ft
	},
	'mi': {
		'm' : 1609.3444978925634, // mi -> m
		'km' : 1.6093444978925635, // mi -> km
		'mi' : 1, // mi -> mi
		'cm' : 160934.44978925632, // mi -> cm
		'mm' : 1.6093444978925635e+06, // mi -> mm
		'in' : 63360.01960181598, // mi -> in
		'ft' : 5280.0018024658375, // mi -> ft
	},
	'cm': {
		'm' : 0.01, // cm -> m
		'km' : 1e-05, // cm -> km
		'mi' : 6.21371e-06, // cm -> mi
		'cm' : 1, // cm -> cm
		'mm' : 10, // cm -> mm
		'in' : 0.3937007874, // cm -> in
		'ft' : 0.0328084, // cm -> ft
	},
	'mm': {
		'm' : 0.001, // mm -> m
		'km' : 1e-06, // mm -> km
		'mi' : 6.21371e-07, // mm -> mi
		'cm' : 0.1, // mm -> cm
		'mm' : 1, // mm -> mm
		'in' : 0.039370078739999995, // mm -> in
		'ft' : 0.00328084, // mm -> ft
	},
	'in': {
		'm' : 0.0254000000001016, // in -> m
		'km' : 2.54000000001016e-05, // in -> km
		'mi' : 1.578282340006313e-05, // in -> mi
		'cm' : 2.5400000000101604, // in -> cm
		'mm' : 25.400000000101603, // in -> mm
		'in' : 1, // in -> in
		'ft' : 0.08333333600033334, // in -> ft
	},
	'ft': {
		'm' : 0.3047999902464003, // ft -> m
		'km' : 0.0003047999902464003, // ft -> km
		'mi' : 0.000189393874739396, // ft -> mi
		'cm' : 30.47999902464003, // ft -> cm
		'mm' : 304.7999902464003, // ft -> mm
		'in' : 11.999999615952012, // ft -> in
		'ft' : 1, // ft -> ft
	},
};

class Distance {
	constructor(v, u) {
		this.set(v, u);
	}

	// set will set value and unit to provided parameters
	// format can be set({'value': 10, 'unit': '<unit>', 'display': '10 <unit>'}), set('10 <unit>'), set(10, '<unit>'), and set(10)
	set(v, u) {
		const parsedArgs = this.parseArguments(v, u);
		// handles empty values, if parsedArgs is {}, set to this to {}
		if (
			Object.keys(parsedArgs).length === 0 &&
			parsedArgs.constructor === Object
		) {
			delete this.value;
			delete this.unit;
			delete this.display;
			return this;
		}

		// handles set(20), value without unit. Uses current unit if it exists, otherwise error is thrown
		if (typeof parsedArgs.u === 'undefined') {
			if (typeof this.unit !== 'undefined') {
				parsedArgs.u = this.unit;
			} else {
				throw Error('Distance has no set unit or unit argument');
			}
		}

		this.value =
			typeof parsedArgs.v === 'number' && !Number.isNaN(parsedArgs.v)
				? parsedArgs.v
				: null;
		this.unit =
			typeof parsedArgs.u === 'string' && parsedArgs.u in distance_unit_conv_table
				? parsedArgs.u
				: null;
		this.updateDisplay();

		if (!this.isValid() && !this.isEmpty()) {
			throw Error('Invalid value or unit provided');
		}
		return this
	}

	// add will return a new Distance with the results of the addition between the given Distance argument and this. The original Distance will be unmodified
	// the provided Distance argument will be converted to this.unit so that Distance of different units can be added
	// can receive four possible formats that are supported by the set function
	add(v, u) {
		const add_distance =
			typeof v === 'number' && typeof u === 'undefined'
				? new Distance(v, this.unit)
				: new Distance(v, u).toUnit(this.unit);
		if (this.isValid() && add_distance.isValid()) {
			return new Distance(this.value + add_distance.value, this.unit);
		} else {
			throw Error('Both distances must be valid to use add()');
		}
	}

	// Cmp returns -1 for less than, 1 for greater than, 0 for equal.
	cmp(v, u) {
		const cmp_distance =
			typeof v === 'number' && typeof u === 'undefined'
				? new Distance(v, this.unit)
				: new Distance(v, u).toUnit(this.unit);
		if (this.isValid() && cmp_distance.isValid()) {
			if (this.value < cmp_distance.value) {
				return -1;
			}
			if (this.value > cmp_distance.value) {
				return 1;
			}
			return 0;
		} else {
			throw Error('Both distances must be valid to use cmp()');
		}
	}

	// isValid returns true if the value is a Number, the value is finite, and the unit is valid
	isValid() {
		return (
			typeof this.value === 'number' &&
			Number.isFinite(this.value) &&
			this.unit in distance_unit_conv_table &&
			typeof this.display === 'string' &&
			this.display !== ''
		);
	}

	// isEmpty returns true if value, unit, and display are null
	isEmpty() {
		return this.value == null && this.unit == null && this.display == null;
	}

	// isValidUnit checks if unit is a unit present in the conversion table
	isValidUnit(unit) {
		return unit in distance_unit_conv_table
	}

	// getConversionMultiplier returns conversion multiplier for given units
	// used as a way to access conversion table without making table itself public
	getConversionMultiplier(fromUnit, toUnit) {
		return distance_unit_conv_table[fromUnit][toUnit];
	}

	// round() returns a Distance object with the value rounded to the given number of decimal places 
	round(decimal_places) {
		return new Distance(this.displayRounded(decimal_places))
	}

}
Object.assign(Distance.prototype, CustomDistanceFunctions);
module.exports.Distance = Distance;

const {CustomDurationFunctions} = require('./osgunits-custom.js');

const duration_unit_conv_table = {
	's': {
		's' : 1, // s -> s
		'ms' : 1000, // s -> ms
		'm' : 0.016666666666666666, // s -> m
		'h' : 0.0002777777777777778, // s -> h
	},
	'ms': {
		's' : 0.001, // ms -> s
		'ms' : 1, // ms -> ms
		'm' : 1.6666666666666667e-05, // ms -> m
		'h' : 2.7777777777777776e-07, // ms -> h
	},
	'm': {
		's' : 60, // m -> s
		'ms' : 60000, // m -> ms
		'm' : 1, // m -> m
		'h' : 0.016666666666666666, // m -> h
	},
	'h': {
		's' : 3600, // h -> s
		'ms' : 3.6e+06, // h -> ms
		'm' : 60, // h -> m
		'h' : 1, // h -> h
	},
};

class Duration {
	constructor(v, u) {
		this.set(v, u);
	}

	// set will set value and unit to provided parameters
	// format can be set({'value': 10, 'unit': '<unit>', 'display': '10 <unit>'}), set('10 <unit>'), set(10, '<unit>'), and set(10)
	set(v, u) {
		const parsedArgs = this.parseArguments(v, u);
		// handles empty values, if parsedArgs is {}, set to this to {}
		if (
			Object.keys(parsedArgs).length === 0 &&
			parsedArgs.constructor === Object
		) {
			delete this.value;
			delete this.unit;
			delete this.display;
			return this;
		}

		// handles set(20), value without unit. Uses current unit if it exists, otherwise error is thrown
		if (typeof parsedArgs.u === 'undefined') {
			if (typeof this.unit !== 'undefined') {
				parsedArgs.u = this.unit;
			} else {
				throw Error('Duration has no set unit or unit argument');
			}
		}

		this.value =
			typeof parsedArgs.v === 'number' && !Number.isNaN(parsedArgs.v)
				? parsedArgs.v
				: null;
		this.unit =
			typeof parsedArgs.u === 'string' && parsedArgs.u in duration_unit_conv_table
				? parsedArgs.u
				: null;
		this.updateDisplay();

		if (!this.isValid() && !this.isEmpty()) {
			throw Error('Invalid value or unit provided');
		}
		return this
	}

	// add will return a new Duration with the results of the addition between the given Duration argument and this. The original Duration will be unmodified
	// the provided Duration argument will be converted to this.unit so that Duration of different units can be added
	// can receive four possible formats that are supported by the set function
	add(v, u) {
		const add_duration =
			typeof v === 'number' && typeof u === 'undefined'
				? new Duration(v, this.unit)
				: new Duration(v, u).toUnit(this.unit);
		if (this.isValid() && add_duration.isValid()) {
			return new Duration(this.value + add_duration.value, this.unit);
		} else {
			throw Error('Both durations must be valid to use add()');
		}
	}

	// Cmp returns -1 for less than, 1 for greater than, 0 for equal.
	cmp(v, u) {
		const cmp_duration =
			typeof v === 'number' && typeof u === 'undefined'
				? new Duration(v, this.unit)
				: new Duration(v, u).toUnit(this.unit);
		if (this.isValid() && cmp_duration.isValid()) {
			if (this.value < cmp_duration.value) {
				return -1;
			}
			if (this.value > cmp_duration.value) {
				return 1;
			}
			return 0;
		} else {
			throw Error('Both durations must be valid to use cmp()');
		}
	}

	// isValid returns true if the value is a Number, the value is finite, and the unit is valid
	isValid() {
		return (
			typeof this.value === 'number' &&
			Number.isFinite(this.value) &&
			this.unit in duration_unit_conv_table &&
			typeof this.display === 'string' &&
			this.display !== ''
		);
	}

	// isEmpty returns true if value, unit, and display are null
	isEmpty() {
		return this.value == null && this.unit == null && this.display == null;
	}

	// isValidUnit checks if unit is a unit present in the conversion table
	isValidUnit(unit) {
		return unit in duration_unit_conv_table
	}

	// getConversionMultiplier returns conversion multiplier for given units
	// used as a way to access conversion table without making table itself public
	getConversionMultiplier(fromUnit, toUnit) {
		return duration_unit_conv_table[fromUnit][toUnit];
	}

	// round() returns a Duration object with the value rounded to the given number of decimal places 
	round(decimal_places) {
		return new Duration(this.displayRounded(decimal_places))
	}

}
Object.assign(Duration.prototype, CustomDurationFunctions);
module.exports.Duration = Duration;

const {CustomPressureFunctions} = require('./osgunits-custom.js');

const pressure_unit_conv_table = {
	'pa': {
		'pa' : 1, // pa -> pa
		'kpa' : 0.001, // pa -> kpa
		'psi' : 0.000145038, // pa -> psi
		'bar' : 1e-05, // pa -> bar
	},
	'kpa': {
		'pa' : 1000, // kpa -> pa
		'kpa' : 1, // kpa -> kpa
		'psi' : 0.145038, // kpa -> psi
		'bar' : 0.01, // kpa -> bar
	},
	'psi': {
		'pa' : 6894.744825494008, // psi -> pa
		'kpa' : 6.8947448254940085, // psi -> kpa
		'psi' : 1, // psi -> psi
		'bar' : 0.06894744825494009, // psi -> bar
	},
	'bar': {
		'pa' : 99999.99999999999, // bar -> pa
		'kpa' : 99.99999999999999, // bar -> kpa
		'psi' : 14.503799999999998, // bar -> psi
		'bar' : 0.9999999999999999, // bar -> bar
	},
};

class Pressure {
	constructor(v, u) {
		this.set(v, u);
	}

	// set will set value and unit to provided parameters
	// format can be set({'value': 10, 'unit': '<unit>', 'display': '10 <unit>'}), set('10 <unit>'), set(10, '<unit>'), and set(10)
	set(v, u) {
		const parsedArgs = this.parseArguments(v, u);
		// handles empty values, if parsedArgs is {}, set to this to {}
		if (
			Object.keys(parsedArgs).length === 0 &&
			parsedArgs.constructor === Object
		) {
			delete this.value;
			delete this.unit;
			delete this.display;
			return this;
		}

		// handles set(20), value without unit. Uses current unit if it exists, otherwise error is thrown
		if (typeof parsedArgs.u === 'undefined') {
			if (typeof this.unit !== 'undefined') {
				parsedArgs.u = this.unit;
			} else {
				throw Error('Pressure has no set unit or unit argument');
			}
		}

		this.value =
			typeof parsedArgs.v === 'number' && !Number.isNaN(parsedArgs.v)
				? parsedArgs.v
				: null;
		this.unit =
			typeof parsedArgs.u === 'string' && parsedArgs.u in pressure_unit_conv_table
				? parsedArgs.u
				: null;
		this.updateDisplay();

		if (!this.isValid() && !this.isEmpty()) {
			throw Error('Invalid value or unit provided');
		}
		return this
	}

	// add will return a new Pressure with the results of the addition between the given Pressure argument and this. The original Pressure will be unmodified
	// the provided Pressure argument will be converted to this.unit so that Pressure of different units can be added
	// can receive four possible formats that are supported by the set function
	add(v, u) {
		const add_pressure =
			typeof v === 'number' && typeof u === 'undefined'
				? new Pressure(v, this.unit)
				: new Pressure(v, u).toUnit(this.unit);
		if (this.isValid() && add_pressure.isValid()) {
			return new Pressure(this.value + add_pressure.value, this.unit);
		} else {
			throw Error('Both pressures must be valid to use add()');
		}
	}

	// Cmp returns -1 for less than, 1 for greater than, 0 for equal.
	cmp(v, u) {
		const cmp_pressure =
			typeof v === 'number' && typeof u === 'undefined'
				? new Pressure(v, this.unit)
				: new Pressure(v, u).toUnit(this.unit);
		if (this.isValid() && cmp_pressure.isValid()) {
			if (this.value < cmp_pressure.value) {
				return -1;
			}
			if (this.value > cmp_pressure.value) {
				return 1;
			}
			return 0;
		} else {
			throw Error('Both pressures must be valid to use cmp()');
		}
	}

	// isValid returns true if the value is a Number, the value is finite, and the unit is valid
	isValid() {
		return (
			typeof this.value === 'number' &&
			Number.isFinite(this.value) &&
			this.unit in pressure_unit_conv_table &&
			typeof this.display === 'string' &&
			this.display !== ''
		);
	}

	// isEmpty returns true if value, unit, and display are null
	isEmpty() {
		return this.value == null && this.unit == null && this.display == null;
	}

	// isValidUnit checks if unit is a unit present in the conversion table
	isValidUnit(unit) {
		return unit in pressure_unit_conv_table
	}

	// getConversionMultiplier returns conversion multiplier for given units
	// used as a way to access conversion table without making table itself public
	getConversionMultiplier(fromUnit, toUnit) {
		return pressure_unit_conv_table[fromUnit][toUnit];
	}

	// round() returns a Pressure object with the value rounded to the given number of decimal places 
	round(decimal_places) {
		return new Pressure(this.displayRounded(decimal_places))
	}

}
Object.assign(Pressure.prototype, CustomPressureFunctions);
module.exports.Pressure = Pressure;

const {CustomFuelRateFunctions} = require('./osgunits-custom.js');

const fuelrate_unit_conv_table = {
	'mpg': {
		'mpg' : 1, // mpg -> mpg
		'km/l' : 0.425144, // mpg -> km/l
	},
	'km/l': {
		'mpg' : 2.3521442146660894, // km/l -> mpg
		'km/l' : 1, // km/l -> km/l
	},
};

class FuelRate {
	constructor(v, u) {
		this.set(v, u);
	}

	// set will set value and unit to provided parameters
	// format can be set({'value': 10, 'unit': '<unit>', 'display': '10 <unit>'}), set('10 <unit>'), set(10, '<unit>'), and set(10)
	set(v, u) {
		const parsedArgs = this.parseArguments(v, u);
		// handles empty values, if parsedArgs is {}, set to this to {}
		if (
			Object.keys(parsedArgs).length === 0 &&
			parsedArgs.constructor === Object
		) {
			delete this.value;
			delete this.unit;
			delete this.display;
			return this;
		}

		// handles set(20), value without unit. Uses current unit if it exists, otherwise error is thrown
		if (typeof parsedArgs.u === 'undefined') {
			if (typeof this.unit !== 'undefined') {
				parsedArgs.u = this.unit;
			} else {
				throw Error('FuelRate has no set unit or unit argument');
			}
		}

		this.value =
			typeof parsedArgs.v === 'number' && !Number.isNaN(parsedArgs.v)
				? parsedArgs.v
				: null;
		this.unit =
			typeof parsedArgs.u === 'string' && parsedArgs.u in fuelrate_unit_conv_table
				? parsedArgs.u
				: null;
		this.updateDisplay();

		if (!this.isValid() && !this.isEmpty()) {
			throw Error('Invalid value or unit provided');
		}
		return this
	}

	// add will return a new FuelRate with the results of the addition between the given FuelRate argument and this. The original FuelRate will be unmodified
	// the provided FuelRate argument will be converted to this.unit so that FuelRate of different units can be added
	// can receive four possible formats that are supported by the set function
	add(v, u) {
		const add_fuelrate =
			typeof v === 'number' && typeof u === 'undefined'
				? new FuelRate(v, this.unit)
				: new FuelRate(v, u).toUnit(this.unit);
		if (this.isValid() && add_fuelrate.isValid()) {
			return new FuelRate(this.value + add_fuelrate.value, this.unit);
		} else {
			throw Error('Both fuelrates must be valid to use add()');
		}
	}

	// Cmp returns -1 for less than, 1 for greater than, 0 for equal.
	cmp(v, u) {
		const cmp_fuelrate =
			typeof v === 'number' && typeof u === 'undefined'
				? new FuelRate(v, this.unit)
				: new FuelRate(v, u).toUnit(this.unit);
		if (this.isValid() && cmp_fuelrate.isValid()) {
			if (this.value < cmp_fuelrate.value) {
				return -1;
			}
			if (this.value > cmp_fuelrate.value) {
				return 1;
			}
			return 0;
		} else {
			throw Error('Both fuelrates must be valid to use cmp()');
		}
	}

	// isValid returns true if the value is a Number, the value is finite, and the unit is valid
	isValid() {
		return (
			typeof this.value === 'number' &&
			Number.isFinite(this.value) &&
			this.unit in fuelrate_unit_conv_table &&
			typeof this.display === 'string' &&
			this.display !== ''
		);
	}

	// isEmpty returns true if value, unit, and display are null
	isEmpty() {
		return this.value == null && this.unit == null && this.display == null;
	}

	// isValidUnit checks if unit is a unit present in the conversion table
	isValidUnit(unit) {
		return unit in fuelrate_unit_conv_table
	}

	// getConversionMultiplier returns conversion multiplier for given units
	// used as a way to access conversion table without making table itself public
	getConversionMultiplier(fromUnit, toUnit) {
		return fuelrate_unit_conv_table[fromUnit][toUnit];
	}

	// round() returns a FuelRate object with the value rounded to the given number of decimal places 
	round(decimal_places) {
		return new FuelRate(this.displayRounded(decimal_places))
	}

}
Object.assign(FuelRate.prototype, CustomFuelRateFunctions);
module.exports.FuelRate = FuelRate;

const {CustomFlowRateFunctions} = require('./osgunits-custom.js');

const flowrate_unit_conv_table = {
	'ml/h': {
		'ml/h' : 1, // ml/h -> ml/h
	},
};

class FlowRate {
	constructor(v, u) {
		this.set(v, u);
	}

	// set will set value and unit to provided parameters
	// format can be set({'value': 10, 'unit': '<unit>', 'display': '10 <unit>'}), set('10 <unit>'), set(10, '<unit>'), and set(10)
	set(v, u) {
		const parsedArgs = this.parseArguments(v, u);
		// handles empty values, if parsedArgs is {}, set to this to {}
		if (
			Object.keys(parsedArgs).length === 0 &&
			parsedArgs.constructor === Object
		) {
			delete this.value;
			delete this.unit;
			delete this.display;
			return this;
		}

		// handles set(20), value without unit. Uses current unit if it exists, otherwise error is thrown
		if (typeof parsedArgs.u === 'undefined') {
			if (typeof this.unit !== 'undefined') {
				parsedArgs.u = this.unit;
			} else {
				throw Error('FlowRate has no set unit or unit argument');
			}
		}

		this.value =
			typeof parsedArgs.v === 'number' && !Number.isNaN(parsedArgs.v)
				? parsedArgs.v
				: null;
		this.unit =
			typeof parsedArgs.u === 'string' && parsedArgs.u in flowrate_unit_conv_table
				? parsedArgs.u
				: null;
		this.updateDisplay();

		if (!this.isValid() && !this.isEmpty()) {
			throw Error('Invalid value or unit provided');
		}
		return this
	}

	// add will return a new FlowRate with the results of the addition between the given FlowRate argument and this. The original FlowRate will be unmodified
	// the provided FlowRate argument will be converted to this.unit so that FlowRate of different units can be added
	// can receive four possible formats that are supported by the set function
	add(v, u) {
		const add_flowrate =
			typeof v === 'number' && typeof u === 'undefined'
				? new FlowRate(v, this.unit)
				: new FlowRate(v, u).toUnit(this.unit);
		if (this.isValid() && add_flowrate.isValid()) {
			return new FlowRate(this.value + add_flowrate.value, this.unit);
		} else {
			throw Error('Both flowrates must be valid to use add()');
		}
	}

	// Cmp returns -1 for less than, 1 for greater than, 0 for equal.
	cmp(v, u) {
		const cmp_flowrate =
			typeof v === 'number' && typeof u === 'undefined'
				? new FlowRate(v, this.unit)
				: new FlowRate(v, u).toUnit(this.unit);
		if (this.isValid() && cmp_flowrate.isValid()) {
			if (this.value < cmp_flowrate.value) {
				return -1;
			}
			if (this.value > cmp_flowrate.value) {
				return 1;
			}
			return 0;
		} else {
			throw Error('Both flowrates must be valid to use cmp()');
		}
	}

	// isValid returns true if the value is a Number, the value is finite, and the unit is valid
	isValid() {
		return (
			typeof this.value === 'number' &&
			Number.isFinite(this.value) &&
			this.unit in flowrate_unit_conv_table &&
			typeof this.display === 'string' &&
			this.display !== ''
		);
	}

	// isEmpty returns true if value, unit, and display are null
	isEmpty() {
		return this.value == null && this.unit == null && this.display == null;
	}

	// isValidUnit checks if unit is a unit present in the conversion table
	isValidUnit(unit) {
		return unit in flowrate_unit_conv_table
	}

	// getConversionMultiplier returns conversion multiplier for given units
	// used as a way to access conversion table without making table itself public
	getConversionMultiplier(fromUnit, toUnit) {
		return flowrate_unit_conv_table[fromUnit][toUnit];
	}

	// round() returns a FlowRate object with the value rounded to the given number of decimal places 
	round(decimal_places) {
		return new FlowRate(this.displayRounded(decimal_places))
	}

}
Object.assign(FlowRate.prototype, CustomFlowRateFunctions);
module.exports.FlowRate = FlowRate;

const {CustomAccelerationFunctions} = require('./osgunits-custom.js');

const acceleration_unit_conv_table = {
	'cm/s/s': {
		'cm/s/s' : 1, // cm/s/s -> cm/s/s
		'g' : 0.00101971621, // cm/s/s -> g
	},
	'g': {
		'cm/s/s' : 980.6650028638851, // g -> cm/s/s
		'g' : 1, // g -> g
	},
};

class Acceleration {
	constructor(v, u) {
		this.set(v, u);
	}

	// set will set value and unit to provided parameters
	// format can be set({'value': 10, 'unit': '<unit>', 'display': '10 <unit>'}), set('10 <unit>'), set(10, '<unit>'), and set(10)
	set(v, u) {
		const parsedArgs = this.parseArguments(v, u);
		// handles empty values, if parsedArgs is {}, set to this to {}
		if (
			Object.keys(parsedArgs).length === 0 &&
			parsedArgs.constructor === Object
		) {
			delete this.value;
			delete this.unit;
			delete this.display;
			return this;
		}

		// handles set(20), value without unit. Uses current unit if it exists, otherwise error is thrown
		if (typeof parsedArgs.u === 'undefined') {
			if (typeof this.unit !== 'undefined') {
				parsedArgs.u = this.unit;
			} else {
				throw Error('Acceleration has no set unit or unit argument');
			}
		}

		this.value =
			typeof parsedArgs.v === 'number' && !Number.isNaN(parsedArgs.v)
				? parsedArgs.v
				: null;
		this.unit =
			typeof parsedArgs.u === 'string' && parsedArgs.u in acceleration_unit_conv_table
				? parsedArgs.u
				: null;
		this.updateDisplay();

		if (!this.isValid() && !this.isEmpty()) {
			throw Error('Invalid value or unit provided');
		}
		return this
	}

	// add will return a new Acceleration with the results of the addition between the given Acceleration argument and this. The original Acceleration will be unmodified
	// the provided Acceleration argument will be converted to this.unit so that Acceleration of different units can be added
	// can receive four possible formats that are supported by the set function
	add(v, u) {
		const add_acceleration =
			typeof v === 'number' && typeof u === 'undefined'
				? new Acceleration(v, this.unit)
				: new Acceleration(v, u).toUnit(this.unit);
		if (this.isValid() && add_acceleration.isValid()) {
			return new Acceleration(this.value + add_acceleration.value, this.unit);
		} else {
			throw Error('Both accelerations must be valid to use add()');
		}
	}

	// Cmp returns -1 for less than, 1 for greater than, 0 for equal.
	cmp(v, u) {
		const cmp_acceleration =
			typeof v === 'number' && typeof u === 'undefined'
				? new Acceleration(v, this.unit)
				: new Acceleration(v, u).toUnit(this.unit);
		if (this.isValid() && cmp_acceleration.isValid()) {
			if (this.value < cmp_acceleration.value) {
				return -1;
			}
			if (this.value > cmp_acceleration.value) {
				return 1;
			}
			return 0;
		} else {
			throw Error('Both accelerations must be valid to use cmp()');
		}
	}

	// isValid returns true if the value is a Number, the value is finite, and the unit is valid
	isValid() {
		return (
			typeof this.value === 'number' &&
			Number.isFinite(this.value) &&
			this.unit in acceleration_unit_conv_table &&
			typeof this.display === 'string' &&
			this.display !== ''
		);
	}

	// isEmpty returns true if value, unit, and display are null
	isEmpty() {
		return this.value == null && this.unit == null && this.display == null;
	}

	// isValidUnit checks if unit is a unit present in the conversion table
	isValidUnit(unit) {
		return unit in acceleration_unit_conv_table
	}

	// getConversionMultiplier returns conversion multiplier for given units
	// used as a way to access conversion table without making table itself public
	getConversionMultiplier(fromUnit, toUnit) {
		return acceleration_unit_conv_table[fromUnit][toUnit];
	}

	// round() returns a Acceleration object with the value rounded to the given number of decimal places 
	round(decimal_places) {
		return new Acceleration(this.displayRounded(decimal_places))
	}

}
Object.assign(Acceleration.prototype, CustomAccelerationFunctions);
module.exports.Acceleration = Acceleration;

const {CustomTemperatureFunctions} = require('./osgunits-custom.js');

const temperature_unit_conv_table = {
	'c': '',
	'f': '',
};

class Temperature {
	constructor(v, u) {
		this.set(v, u);
	}

	// set will set value and unit to provided parameters
	// format can be set({'value': 10, 'unit': '<unit>', 'display': '10 <unit>'}), set('10 <unit>'), set(10, '<unit>'), and set(10)
	set(v, u) {
		const parsedArgs = this.parseArguments(v, u);
		// handles empty values, if parsedArgs is {}, set to this to {}
		if (
			Object.keys(parsedArgs).length === 0 &&
			parsedArgs.constructor === Object
		) {
			delete this.value;
			delete this.unit;
			delete this.display;
			return this;
		}

		// handles set(20), value without unit. Uses current unit if it exists, otherwise error is thrown
		if (typeof parsedArgs.u === 'undefined') {
			if (typeof this.unit !== 'undefined') {
				parsedArgs.u = this.unit;
			} else {
				throw Error('Temperature has no set unit or unit argument');
			}
		}

		this.value =
			typeof parsedArgs.v === 'number' && !Number.isNaN(parsedArgs.v)
				? parsedArgs.v
				: null;
		this.unit =
			typeof parsedArgs.u === 'string' && parsedArgs.u in temperature_unit_conv_table
				? parsedArgs.u
				: null;
		this.updateDisplay();

		if (!this.isValid() && !this.isEmpty()) {
			throw Error('Invalid value or unit provided');
		}
		return this
	}

	// add will return a new Temperature with the results of the addition between the given Temperature argument and this. The original Temperature will be unmodified
	// the provided Temperature argument will be converted to this.unit so that Temperature of different units can be added
	// can receive four possible formats that are supported by the set function
	add(v, u) {
		const add_temperature =
			typeof v === 'number' && typeof u === 'undefined'
				? new Temperature(v, this.unit)
				: new Temperature(v, u).toUnit(this.unit);
		if (this.isValid() && add_temperature.isValid()) {
			return new Temperature(this.value + add_temperature.value, this.unit);
		} else {
			throw Error('Both temperatures must be valid to use add()');
		}
	}

	// Cmp returns -1 for less than, 1 for greater than, 0 for equal.
	cmp(v, u) {
		const cmp_temperature =
			typeof v === 'number' && typeof u === 'undefined'
				? new Temperature(v, this.unit)
				: new Temperature(v, u).toUnit(this.unit);
		if (this.isValid() && cmp_temperature.isValid()) {
			if (this.value < cmp_temperature.value) {
				return -1;
			}
			if (this.value > cmp_temperature.value) {
				return 1;
			}
			return 0;
		} else {
			throw Error('Both temperatures must be valid to use cmp()');
		}
	}

	// isValid returns true if the value is a Number, the value is finite, and the unit is valid
	isValid() {
		return (
			typeof this.value === 'number' &&
			Number.isFinite(this.value) &&
			this.unit in temperature_unit_conv_table &&
			typeof this.display === 'string' &&
			this.display !== ''
		);
	}

	// isEmpty returns true if value, unit, and display are null
	isEmpty() {
		return this.value == null && this.unit == null && this.display == null;
	}

	// isValidUnit checks if unit is a unit present in the conversion table
	isValidUnit(unit) {
		return unit in temperature_unit_conv_table
	}

	// getConversionMultiplier returns conversion multiplier for given units
	// used as a way to access conversion table without making table itself public
	getConversionMultiplier(fromUnit, toUnit) {
		return temperature_unit_conv_table[fromUnit][toUnit];
	}

	// round() returns a Temperature object with the value rounded to the given number of decimal places 
	round(decimal_places) {
		return new Temperature(this.displayRounded(decimal_places))
	}

}
Object.assign(Temperature.prototype, CustomTemperatureFunctions);
module.exports.Temperature = Temperature;

const {CustomVolumeFunctions} = require('./osgunits-custom.js');

const volume_unit_conv_table = {
	'ml': {
		'ml' : 1, // ml -> ml
		'l' : 0.001, // ml -> l
		'g' : 0.000264172, // ml -> g
		'floz' : 0.033814, // ml -> floz
	},
	'l': {
		'ml' : 1000, // l -> ml
		'l' : 1, // l -> l
		'g' : 0.264172, // l -> g
		'floz' : 33.814, // l -> floz
	},
	'g': {
		'ml' : 3785.412534257983, // g -> ml
		'l' : 3.785412534257983, // g -> l
		'g' : 1, // g -> g
		'floz' : 127.99993943339943, // g -> floz
	},
	'floz': {
		'ml' : 29.57354941740108, // floz -> ml
		'l' : 0.02957354941740108, // floz -> l
		'g' : 0.007812503696693679, // floz -> g
		'floz' : 1, // floz -> floz
	},
};

class Volume {
	constructor(v, u) {
		this.set(v, u);
	}

	// set will set value and unit to provided parameters
	// format can be set({'value': 10, 'unit': '<unit>', 'display': '10 <unit>'}), set('10 <unit>'), set(10, '<unit>'), and set(10)
	set(v, u) {
		const parsedArgs = this.parseArguments(v, u);
		// handles empty values, if parsedArgs is {}, set to this to {}
		if (
			Object.keys(parsedArgs).length === 0 &&
			parsedArgs.constructor === Object
		) {
			delete this.value;
			delete this.unit;
			delete this.display;
			return this;
		}

		// handles set(20), value without unit. Uses current unit if it exists, otherwise error is thrown
		if (typeof parsedArgs.u === 'undefined') {
			if (typeof this.unit !== 'undefined') {
				parsedArgs.u = this.unit;
			} else {
				throw Error('Volume has no set unit or unit argument');
			}
		}

		this.value =
			typeof parsedArgs.v === 'number' && !Number.isNaN(parsedArgs.v)
				? parsedArgs.v
				: null;
		this.unit =
			typeof parsedArgs.u === 'string' && parsedArgs.u in volume_unit_conv_table
				? parsedArgs.u
				: null;
		this.updateDisplay();

		if (!this.isValid() && !this.isEmpty()) {
			throw Error('Invalid value or unit provided');
		}
		return this
	}

	// add will return a new Volume with the results of the addition between the given Volume argument and this. The original Volume will be unmodified
	// the provided Volume argument will be converted to this.unit so that Volume of different units can be added
	// can receive four possible formats that are supported by the set function
	add(v, u) {
		const add_volume =
			typeof v === 'number' && typeof u === 'undefined'
				? new Volume(v, this.unit)
				: new Volume(v, u).toUnit(this.unit);
		if (this.isValid() && add_volume.isValid()) {
			return new Volume(this.value + add_volume.value, this.unit);
		} else {
			throw Error('Both volumes must be valid to use add()');
		}
	}

	// Cmp returns -1 for less than, 1 for greater than, 0 for equal.
	cmp(v, u) {
		const cmp_volume =
			typeof v === 'number' && typeof u === 'undefined'
				? new Volume(v, this.unit)
				: new Volume(v, u).toUnit(this.unit);
		if (this.isValid() && cmp_volume.isValid()) {
			if (this.value < cmp_volume.value) {
				return -1;
			}
			if (this.value > cmp_volume.value) {
				return 1;
			}
			return 0;
		} else {
			throw Error('Both volumes must be valid to use cmp()');
		}
	}

	// isValid returns true if the value is a Number, the value is finite, and the unit is valid
	isValid() {
		return (
			typeof this.value === 'number' &&
			Number.isFinite(this.value) &&
			this.unit in volume_unit_conv_table &&
			typeof this.display === 'string' &&
			this.display !== ''
		);
	}

	// isEmpty returns true if value, unit, and display are null
	isEmpty() {
		return this.value == null && this.unit == null && this.display == null;
	}

	// isValidUnit checks if unit is a unit present in the conversion table
	isValidUnit(unit) {
		return unit in volume_unit_conv_table
	}

	// getConversionMultiplier returns conversion multiplier for given units
	// used as a way to access conversion table without making table itself public
	getConversionMultiplier(fromUnit, toUnit) {
		return volume_unit_conv_table[fromUnit][toUnit];
	}

	// round() returns a Volume object with the value rounded to the given number of decimal places 
	round(decimal_places) {
		return new Volume(this.displayRounded(decimal_places))
	}

}
Object.assign(Volume.prototype, CustomVolumeFunctions);
module.exports.Volume = Volume;

