# units

Units is a Javascript unit conversion and utility library built to support the OneStepGPS tracking platform and API. This library can be used in both the browser and with Node.js.

Currently this library supports the following types: Distance, Speed, Duration, Pressure, Fuel Rate, Acceleration, Temperature

## Installation

Install this package using npm:

```
$ npm install @onestepgps/units
```

## Usage

Units objects can be created in a few different ways.

```
import {Distance} from "@onestepgps/units";

const number_string_arg_distance = new Distance(10, "mi"); //two arguments, value and unit
const string_arg_distance = new Distance("10mi"); //single string argument
const object_arg_distance = new Distance({value: 10, unit: "mi" ); //single object argument
```

All Units objects have the following three properties:

```
my_distance.value // 10
my_distance.unit // 'mi'
my_distance.display // '10 mi'
```

### Add

```
const ten_minutes = new Duration("2m")
const eighty_seconds = new Duration(80, "s")

ten_minutes.add(eighty_seconds).display // 3m20s
```

### Convert units

```
const my_distance = new Speed("10mph")
my_distance.toUnit("km/h").display // 16.09341332355807 km/h
```

## Available Units

Distance

- mi - miles
- km - kilometers
- m - meters

Speed

- mph - miles per hour
- km/h - kilometers per hour
- m/s - meters per second
- cm/s - centimeter per second

Duration

- h - hours
- m - minutes
- s - seconds
- ms - milliseconds

Pressure

- pa - pascal
- kpa - kilopascal
- psi - pound per square inch
- bar - bar

Fuel Rate

- mpg - miles per gallon
- km/l - kilometers per liter

Acceleration

- cm/s/s - centimeters per second squared
- g - gravitational acceleration

Temperature

- f - Fahrenheit
- c - Celsius
